import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
})
export class ProjectCreateComponent {
  constructor(private projectService: ProjectService, private router: Router) {}

  redirectToProjectList() {
    this.router.navigate(['/project']);
  }

  onSubmit(data: any) {
    this.projectService.createProject(data).subscribe(
      () => {
        this.redirectToProjectList();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
