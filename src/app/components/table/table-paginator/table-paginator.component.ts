import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss']
})
export class TablePaginatorComponent implements OnInit {

  // Inputs
  @Input() currentPage: number | undefined;
  @Input() totalPages: number | undefined;

  // Outputs
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  changeTo(page: number) {
    if (this.totalPages !== undefined && page >= 0 && page < this.totalPages ) {
      this.pageChange.emit(page);
    }
  }

}
