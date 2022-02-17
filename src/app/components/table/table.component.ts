import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.interface';
import { TableConfiguration } from 'src/app/models/table-configuration.interface';

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

  constructor() { }

  ngOnInit(): void {
    this.totalPages = this.items ? Math.ceil(this.items.length / 5) : 0;
    this.oldItems = this.items ? [...this.items] : [];
    this.itemsDivided = this.items ? [...this.items.slice(0, 5)] : [];
  }

  pageChange(page: number) {
    this.page = page;
    
    const start: number = page * 5;
    const end: number = start + 5;

    this.itemsDivided = this.items ? [...this.items.slice(start, end)] : [];
  }

  sortBy(configuration: TableConfiguration, noChangeOrder: boolean = false) {

    // Get order
    if(noChangeOrder) {
      // no do nothing
    } else if(this.configurationSorted && this.configurationSorted.id === configuration.id) {
      this.asc = !this.asc;
    } else {
      this.configurationSorted = configuration;
      this.asc = true;
    }

    // Sort items by id
    this.items?.sort((itemA: Item, itemB: Item) => {

      let a: any;
      let b: any;

      if(configuration.type === 'text') {
        a = itemA[configuration.id].toLowerCase();
        b = itemB[configuration.id].toLowerCase();
      } else if(configuration.type === 'number') {
        a = +itemA[configuration.id];
        b = +itemB[configuration.id];
      }

      if(this.asc) {
        return a > b ? 1 : -1;
      } else {
        return a < b ? 1 : -1;
      }

    });

    // Divide items
    if(typeof this.page === 'number') {
      this.pageChange(this.page);
    }

  }

  onSearch(target: any) {
    
    this.items = this.oldItems?.filter((oldItem: Item) => {

      return this.configuration?.some((c: TableConfiguration) => {

        return Object.keys(oldItem).some((key: string) => {

          // Only search by title, description, price and
          if(c.id === key && c.type !== 'img') {
            
            const oldValue: string = oldItem[key].toLowerCase();
            const value: string = target.value.toLowerCase();

            return oldValue.includes(value);
          } else {
            return false;
          }
        })
      })
    });

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
