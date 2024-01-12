import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationComponent } from './pagination/pagination.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [PaginationComponent, SpinnerComponent],
  imports: [CommonModule],
  exports: [PaginationComponent, SpinnerComponent],
})
export class ComponentsModule {}
