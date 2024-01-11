import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectComponent } from './project.component';
// import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { ProjectUpdateComponent } from './components/project-update/project-update.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectItemComponent,
    ProjectDetailsComponent,
    ProjectCreateComponent,
    ProjectUpdateComponent,
    // PaginationComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    ProjectComponent,
    // PaginationComponent
  ]
})
export class ProjectModule { }
