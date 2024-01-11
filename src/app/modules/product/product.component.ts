import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductHttpService } from './services/product-http.service';
import { Product, PaginatedProductResponse } from './models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  page = 0;
  limit = 8;
  sort = -1;
  orderBy = 'createdAt';
  count = 0;
  searchByname = '';

  constructor(
    private router: Router,
    private productHttpService: ProductHttpService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  redirectToProductCreate() {
    this.router.navigate(['/product-create']);
  }

  getProducts() {
    this.isLoading = true;
    this.productHttpService
      .getProducts(
        new URLSearchParams({
          page: this.page.toString(),
          limit: this.limit.toString(),
          sort: this.sort.toString(),
          orderBy: this.orderBy,
          name: this.searchByname,
        }).toString()
      )
      .subscribe((response) => {
        const formatedResponse = response as PaginatedProductResponse;
        this.products = formatedResponse.data;
        this.count = formatedResponse.count;
        this.limit = formatedResponse.limit;
        this.page = formatedResponse.page;
        this.isLoading = false;
      });
  }

  changeLimit(limit: string | number) {
    this.limit = Number(limit);
    this.page = 0;
    this.getProducts();
  }

  changePage(action: string) {
    if (action === 'next') {
      this.page++;
    } else {
      this.page--;
    }
    this.getProducts();
  }

  search(search: string) {
    this.searchByname = search;
    this.getProducts();
  }
}
