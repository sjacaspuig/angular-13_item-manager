import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableConfiguration } from 'src/app/shared/models/table-configuration.interface';

@Component({
  selector: 'table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {

    // Inputs
    @Input() configuration: TableConfiguration[] | undefined;

    // Outputs
    @Output() onSortBy: EventEmitter<TableConfiguration> = new EventEmitter<TableConfiguration>();

  constructor() { }

  ngOnInit(): void {
  }

  sortBy(configuration: TableConfiguration) {

    // Only sort texts and numbers
    if(configuration.type !== 'img') {
      this.onSortBy.emit(configuration);
    }
  }

}
