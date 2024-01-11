import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  urlBase = `http://localhost:3000/api/project`;

  constructor(private http: HttpClient) {}

  getProjects(query: string = '') {
    return this.http.get(`${this.urlBase}?${query}`);
  }

  getProject(id: string) {
    return this.http.get(`${this.urlBase}/${id}`);
  }

  createProject(project: any) {
    return this.http.post(this.urlBase, project);
  }

  updateProject(id: string, project: any) {
    return this.http.put(`${this.urlBase}/${id}`, project);
  }

  deleteProject(id: string) {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
