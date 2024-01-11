import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css'],
})
export class ProjectItemComponent implements OnInit {
  @Input() project: Project | undefined;
  coverImage: string | undefined;

  constructor(private router: Router, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.coverImage =
      this.project?.images[0] ||
      'https://www.freeiconspng.com/uploads/photo-album-icon-png-14.png';
  }

  redirectToProjectDetails() {
    this.router.navigate(['/project', this.project?._id]);
  }

  deleteProject() {
    if (this.project?._id) {
      this.projectService.deleteProject(this.project._id).subscribe(() => {
        this.router.navigate(['/project', this.project?._id]);
      });
    }
  }
}
