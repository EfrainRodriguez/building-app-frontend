import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Product } from '../../models/product.model';
import { ProductHttpService } from '../../services/product-http.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  id: string | null = null;
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    rating: new FormControl('1', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productHttpService: ProductHttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    if (this.id) {
      this.getProduct(this.id);
    }
  }

  redirectToProductDetails() {
    this.router.navigate(['/product', this.id]);
  }

  getProduct(id: string) {
    this.productHttpService.getProduct(id).subscribe((response) => {
      const product = response as Product;
      this.productForm = new FormGroup({
        name: new FormControl(product?.name, [Validators.required]),
        description: new FormControl(product?.description),
        price: new FormControl(product?.price, [Validators.required]),
        stock: new FormControl(product?.stock, [Validators.required]),
        category: new FormControl(product?.category, [Validators.required]),
        rating: new FormControl(product?.rating, [Validators.required]),
        image: new FormControl(product?.image, [Validators.required]),
      });
    });
  }
}
