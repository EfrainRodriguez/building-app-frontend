import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import moment from 'moment';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { getUserType } from 'src/app/state/selectors/user.selector';
import { ProjectService } from '../../project.service';
import { showToast } from 'src/app/state/actions/toast.action';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnChanges, OnInit {
  hasError = false;
  isLoading = false;
  isUploading = false;
  @Input() isEditing = false;
  @Input() projectData: any;
  @Output() onProjectSubmit: EventEmitter<any> = new EventEmitter<any>();
  userType$ = this.store.select(getUserType);
  images: any[] = [];

  itemForm: FormArray = new FormArray([] as FormGroup[]);

  projectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      images: [[]],
      items: new FormArray([this.itemForm]),
    });
  }

  ngOnChanges(): void {
    if (this.isEditing && this.projectData) {
      console.log(this.projectData.images);
      this.projectForm.patchValue({
        name: this.projectData.name,
        startDate: moment(this.projectData.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.projectData.endDate).format('YYYY-MM-DD'),
        images: this.projectData.images,
      });

      this.projectData.items.forEach((item: any) => {
        this.addItem(item);
      });
    }
  }

  isValid() {
    return (
      this.projectForm.value.name &&
      this.projectForm.value.startDate &&
      this.projectForm.value.endDate
    );
  }

  createItem(item: any): FormGroup {
    return new FormGroup({
      name: new FormControl(item ? item.name : '', [Validators.required]),
      unitValue: new FormControl(item ? item.unitValue : '', [
        Validators.required,
      ]),
      proposedValue: new FormControl(item ? item.proposedValue : ''),
    });
  }

  get itemsFormArray(): FormGroup[] {
    return this.itemForm.controls as FormGroup[];
  }

  addItem(item?: any): void {
    this.itemForm.push(this.createItem(item));
  }

  removeItem(index: number): void {
    this.itemForm.removeAt(index);
  }

  onSubmit() {
    if (!this.isValid()) {
      this.hasError = true;
      return;
    }
    this.hasError = false;
    this.isLoading = true;

    const data = {
      ...this.projectForm.value,
      items: this.projectForm.getRawValue().items[0],
    };

    this.onProjectSubmit.emit(data);
  }

  onSelectImages(event: any) {
    this.images = [...this.images, ...event.target.files];
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  getImagePath(image: File) {
    return URL.createObjectURL(image);
  }

  uploadImages() {
    this.isUploading = true;
    this.projectService
      .uploadImages(this.images)
      .then((response) => {
        this.projectForm.patchValue({
          images: response.map((image: any) => image.secure_url),
        });
        this.isUploading = false;
      })
      .catch(() => {
        this.store.dispatch(
          showToast('Error uploading images, please try again.', 'error')
        );
        this.isUploading = false;
      });
  }
}
