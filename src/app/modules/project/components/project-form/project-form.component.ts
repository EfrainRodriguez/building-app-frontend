import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  Form,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  hasError = false;
  isLoading = false;
  @Input() isEditing = false;

  itemForm: FormArray = new FormArray([this.createItem]);

  projectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    images: new FormControl([]),
    items: this.itemForm,
  });

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  isValid() {
    return (
      this.projectForm.value.name &&
      this.projectForm.value.startDate &&
      this.projectForm.value.endDate
    );
  }

  get createItem(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      unitValue: new FormControl('', [Validators.required]),
    });
  }

  get itemsFormArray(): FormGroup[] {
    return this.itemForm.controls as FormGroup[];
  }

  addItem(item?: any): void {
    this.itemForm.push(this.createItem);

    // Si estás editando un proyecto existente, carga los valores de los items
    // if (item) {
    //   const index = this.itemsFormArray.length - 1;
    //   this.itemsFormArray.at(index).patchValue(item);
    // }
  }

  removeItem(index: number): void {
    this.itemForm.removeAt(index);
  }

  onSubmit() {
    if (!this.isValid()) {
      this.hasError = true;
    }
    this.hasError = false;
    this.isLoading = true;

    const projectData = { ...this.projectForm.value };

    if (this.isEditing) {
    } else {
      this.projectService.createProject(projectData).subscribe(() => {
        this.isLoading = false;
        this.projectForm.reset();
        this.router.navigate(['/project']);
      });
    }
  }
}
