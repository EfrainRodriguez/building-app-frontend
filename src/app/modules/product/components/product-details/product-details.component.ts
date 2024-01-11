import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Product } from '../../models/product.model';
import { ProductHttpService } from '../../services/product-http.service';
import { AppState } from 'src/app/state/app.state';
import { showToast } from 'src/app/state/actions/toast.action';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: string | null = null;
  @Input() product: Product | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productHttpService: ProductHttpService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getProduct(this.id);
      }
    });
  }

  redirectToProductEdit() {
    this.router.navigate(['/product-edit', this.id]);
  }

  getProduct(id: string) {
    this.productHttpService.getProduct(id).subscribe((product) => {
      this.product = product as Product;
    });
  }

  deleteProduct() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productHttpService.deleteProduct(this.id!).subscribe(() => {
        this.router.navigate(['/product']);
        this.store.dispatch(
          showToast('Product deleted successfully!', 'success')
        );
      });
    }
  }
}
