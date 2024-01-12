import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
})
export class ProjectCreateComponent {
  constructor(private router: Router) {}

  redirectToProjectList() {
    this.router.navigate(['/project']);
  }
}
