import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent {
  @Input() productId: string | number | null = null;

  constructor(private router: Router) {}

  redirectToProductList() {
    if (this.productId) {
      this.router.navigate(['/product', this.productId]);
    } else {
      this.router.navigate(['/product']);
    }
  }
}
