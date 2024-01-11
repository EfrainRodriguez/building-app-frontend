import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  urlBase = `${environment.api}/products`;

  constructor(private http: HttpClient) {}

  getProducts(query: string = '') {
    return this.http.get(`${this.urlBase}?${query}`);
  }

  getProduct(id: string) {
    return this.http.get(`${this.urlBase}/${id}`);
  }

  createProduct(product: any) {
    return this.http.post(this.urlBase, product);
  }

  updateProduct(id: string, product: any) {
    return this.http.put(`${this.urlBase}/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  uploadImage(image: any) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'angular_preset');
    return this.http.post(
      `https://api.cloudinary.com/v1_1/monkeywit/upload`,
      formData
    );
  }
}
