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

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnChanges, OnInit {
  hasError = false;
  isLoading = false;
  @Input() isEditing = false;
  @Input() projectData: any;
  @Output() onProjectSubmit: EventEmitter<any> = new EventEmitter<any>();

  itemForm: FormArray = new FormArray([] as FormGroup[]);

  projectForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      images: [''],
      items: new FormArray([this.itemForm]),
    });
  }

  ngOnChanges(): void {
    if (this.isEditing && this.projectData) {
      this.projectForm.patchValue({
        name: this.projectData.name,
        startDate: moment(this.projectData.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.projectData.endDate).format('YYYY-MM-DD'),
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
      images: [],
      items: this.projectForm.getRawValue().items[0],
    };

    this.onProjectSubmit.emit(data);
  }
}
