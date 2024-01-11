import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product | undefined;

  constructor(private router: Router) { }

  redirectToProductDetails() {
    this.router.navigate(['/product', this.product?._id]);
  }
}
