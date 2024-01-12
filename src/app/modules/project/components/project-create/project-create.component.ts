import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProjectService } from '../../project.service';
import { showToast } from 'src/app/state/actions/toast.action';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
})
export class ProjectCreateComponent {
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  redirectToProjectList() {
    this.router.navigate(['/project']);
  }

  onSubmit(data: any) {
    this.projectService.createProject(data).subscribe(
      () => {
        this.redirectToProjectList();
        this.store.dispatch(
          showToast('Project created successfully!', 'success')
        );
      },
      (error) => {
        this.store.dispatch(showToast(error.error.message, 'error'));
      }
    );
  }
}
