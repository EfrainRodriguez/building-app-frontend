import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  options = [
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 12, label: '12' },
  ];

  @Input() limit = 4;
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
