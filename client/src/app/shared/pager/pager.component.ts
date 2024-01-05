import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent {
  @Input() totalCount = 0;
  @Input() pageSize = 3;

  @Output() newPageNumber = new EventEmitter<number>();

  onPagerChanged(event: any) {
    this.newPageNumber.emit(event.page);
  }
  @Input() classCss = '';
}
