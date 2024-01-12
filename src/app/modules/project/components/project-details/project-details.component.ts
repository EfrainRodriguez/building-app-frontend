import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProjectService } from '../../project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {
  id: string | null = null;
  @Input() project: Project | undefined;
  coverImage: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getProject(this.id);
      }
    });
    this.coverImage =
      this.project?.images[0] ||
      'https://www.freeiconspng.com/uploads/photo-album-icon-png-14.png';
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
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.id as string).subscribe(() => {
      this.redirectToProjectList();
    });
  }
}
