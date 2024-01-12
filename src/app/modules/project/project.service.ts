import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  urlBase = `${environment.api}/project`;

  constructor(private http: HttpClient) {}

  getProjects(query: string = '') {
    return this.http.get(`${this.urlBase}?${query}`);
  }

  getProject(id: string) {
    return this.http.get(`${this.urlBase}/${id}`);
  }

  createProject(project: any) {
    return this.http.post(this.urlBase, project);
  }

  updateProject(id: string, project: any) {
    return this.http.put(`${this.urlBase}/${id}`, project);
  }

  deleteProject(id: string) {
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  uploadImages(images: File[]) {
    const uploadPromises = images.map((image) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'angular_preset');
      return this.http.post(
        `https://api.cloudinary.com/v1_1/monkeywit/upload`,
        formData
      ).toPromise();
    });
    return Promise.all(uploadPromises);
  }
}
