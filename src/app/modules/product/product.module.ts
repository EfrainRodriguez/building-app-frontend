import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductItemComponent } from './components/product-item/product-item.component';
// import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule],
  declarations: [
    ProductItemComponent,
    FiltersComponent,
    ProductFormComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductComponent,
    ProductDetailsComponent,
    BackButtonComponent,
    SpinnerComponent
  ],
  exports: [
    ProductItemComponent,
    FiltersComponent,
    ProductFormComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductComponent,
    ProductDetailsComponent,
    BackButtonComponent
  ]
})
export class ProductModule {}
