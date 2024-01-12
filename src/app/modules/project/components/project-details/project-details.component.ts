import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProjectService } from '../../project.service';
import { Project } from '../../models/project.model';
import { AppState } from 'src/app/state/app.state';
import { getUserType } from 'src/app/state/selectors/user.selector';
import { showToast } from 'src/app/state/actions/toast.action';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  id: string | null = null;
  @Input() project: Project | undefined;
  coverImage: string | undefined;
  userType$ = this.store.select(getUserType);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getProject(this.id);
      }
    });
  }

  redirectToProjectEdit() {
    this.router.navigate(['/project-edit', this.id]);
  }

  redirectToProjectList() {
    this.router.navigate(['/project']);
  }

  getProject(id: string) {
    this.projectService.getProject(id).subscribe((project) => {
      this.project = project as Project;
      this.coverImage =
        this.project?.images[0] ||
        'https://www.freeiconspng.com/uploads/photo-album-icon-png-14.png';
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.id as string).subscribe(() => {
      this.redirectToProjectList();
      this.store.dispatch(
        showToast('Project deleted successfully!', 'success')
      );
    });
  }
}
