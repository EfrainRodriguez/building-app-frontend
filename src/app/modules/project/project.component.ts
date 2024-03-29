import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProjectService } from './project.service';
import { Project } from './models/project.model';
import { AppState } from 'src/app/state/app.state';
import { getUserType } from 'src/app/state/selectors/user.selector';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  isLoading = false;
  page = 0;
  limit = 4;
  order = -1;
  orderBy = 'createdAt';
  count = 0;

  userType$ = this.store.select(getUserType);

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  redirectToProjectCreate() {
    this.router.navigate(['/project-create']);
  }

  getProjects() {
    this.isLoading = true;
    this.projectService
      .getProjects(
        new URLSearchParams({
          page: this.page.toString(),
          limit: this.limit.toString(),
          order: this.order.toString(),
          orderBy: this.orderBy,
        }).toString()
      )
      .subscribe((response: any) => {
        this.projects = response.data;
        this.count = response.count;
        this.limit = response.limit;
        this.page = response.page;
        this.isLoading = false;
      });
  }

  changeLimit(limit: string | number) {
    this.limit = Number(limit);
    this.page = 0;
    this.getProjects();
  }

  changePage(action: string) {
    if (action === 'next') {
      this.page++;
    } else {
      this.page--;
    }
    this.getProjects();
  }
}
