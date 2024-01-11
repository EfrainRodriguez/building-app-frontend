import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from './modules/project/project.component';
import { ProjectDetailsComponent } from './modules/project/components/project-details/project-details.component';
import { ProjectCreateComponent } from './modules/project/components/project-create/project-create.component';
import { ProjectUpdateComponent } from './modules/project/components/project-update/project-update.component';

const routes: Routes = [
  { path: '', redirectTo: '/project', pathMatch: 'full' },
  { path: 'project', component: ProjectComponent },
  { path: 'project/:id', component: ProjectDetailsComponent },
    { path: 'project-create', component: ProjectCreateComponent },
    { path: 'project-edit/:id', component: ProjectUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
