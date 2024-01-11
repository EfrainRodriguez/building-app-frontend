import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  options = [
    { value: 8, label: '8' },
    { value: 16, label: '16' },
    { value: 32, label: '32' },
  ];

  @Input() limit = 8;
  @Input() page = 0;
  @Input() count = 0;

  @Output() limitEvent = new EventEmitter<string>();
  @Output() pageEvent = new EventEmitter<string>();

  changeLimit(event: any) {
    this.limitEvent.emit(event?.target.value);
  }

  changePage(action: string) {
    this.pageEvent.emit(action);
  }

}
