import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  text = '';

  @Output() searchEvent = new EventEmitter<string>();

  onChange(event: any) {
    this.text = event?.target.value;
  }

  search(event: any) {
    event.preventDefault();
    this.searchEvent.emit(this.text);
  }

  clear(event: any) {
    event.preventDefault();
    this.text = '';
    this.searchEvent.emit(this.text);
  }

}
