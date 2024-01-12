import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProjectService } from '../../project.service';
import { Project } from '../../models/project.model';
import { AppState } from 'src/app/state/app.state';
import { showToast } from 'src/app/state/actions/toast.action';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css'],
})
export class ProjectUpdateComponent implements OnInit {
  id: string | null = null;
  project: Project | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    if (this.id) {
      this.getProject(this.id);
    }
  }

  redirectToProjectDetails() {
    this.router.navigate(['/project', this.project?._id]);
  }

  getProject(id: string) {
    this.projectService.getProject(id).subscribe((project) => {
      this.project = project as Project;
    });
  }

  onSubmit(data: any) {
    if (this.id) {
      this.projectService.updateProject(this.id, data).subscribe(
        () => {
          this.store.dispatch(
            showToast('Project updated successfully!', 'success')
          );
          this.redirectToProjectDetails();
        },
        (error) => {
          this.store.dispatch(showToast(error.error.message, 'error'));
        }
      );
    }
  }
}
