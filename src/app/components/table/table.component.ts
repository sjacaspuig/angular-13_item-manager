import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item.interface';
import { TableConfiguration } from 'src/app/shared/models/table-configuration.interface';
import { TableService } from './_services/table.service';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  // Inputs
  @Input() items: Item[] | undefined;
  @Input() configuration: TableConfiguration[] | undefined;

  // Public variables
  page: number | undefined = 0;
  totalPages: number | undefined;
  itemsDivided: Item[] | undefined;
  oldItems: Item[] | undefined;
  asc: boolean = true;
  configurationSorted: TableConfiguration | undefined;
  showModal: boolean = false;

  constructor(
    private tableService: TableService
  ) { }

  ngOnInit(): void {
    this.totalPages = this.items ? Math.ceil(this.items.length / 5) : 0;
    this.oldItems = this.items ? [...this.items] : [];
    this.itemsDivided = this.items ? [...this.items.slice(0, 5)] : [];
  }

  pageChange(page: number) {
    this.page = page;
    this.itemsDivided = this.tableService.pageChange(page, this.items);
  }

  sortBy(configuration: TableConfiguration, noChangeOrder: boolean = false) {

    this.items = this.tableService.sortBy(
      this.items,
      configuration,
      this.configurationSorted,
      this.asc,
      noChangeOrder
    );

    // Divide items
    if(typeof this.page === 'number') {
      this.pageChange(this.page);
    }

  }

  onSearch(target: any) {
    
    this.items = this.tableService.onSearch(
      this.items,
      target,
      this.configuration,
      this.oldItems
    )

    this.totalPages = this.items ? Math.ceil(this.items.length / 5) : 0;

    if(this.configurationSorted) {
      this.sortBy(this.configurationSorted, true);
    } else if(typeof this.page === 'number') {
      this.pageChange(this.page);
    } else {
      this.itemsDivided = this.items ? [...this.items.slice(0, 5)] : [];
    }
  }

  switchFavoriteModal() {
    this.showModal = !this.showModal;
  }
}
