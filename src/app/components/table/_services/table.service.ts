import { Injectable } from '@angular/core';
import { Item } from 'src/app/shared/models/item.interface';
import { TableConfiguration } from 'src/app/shared/models/table-configuration.interface';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  pageChange(
        page: number,
        items: Item[] | undefined
    ): Item[] | undefined {
    
    const start: number = page * 5;
    const end: number = start + 5;

    return items ? [...items.slice(start, end)] : [];
  }

  sortBy(
        items: Item[] | undefined,
        configuration: TableConfiguration,
        configurationSorted: TableConfiguration | undefined,
        asc: boolean,
        noChangeOrder: boolean = false
    ): Item[] | undefined {

    // Get order
    if(noChangeOrder) {
        // no do nothing
    } else if(configurationSorted && configurationSorted.id === configuration.id) {
        asc = !asc;
    } else {
        configurationSorted = configuration;
        asc = true;
    }

    // Sort items by id
    items?.sort((itemA: Item, itemB: Item) => {

        let a: any;
        let b: any;

        if(configuration.type === 'text') {
            a = itemA[configuration.id].toLowerCase();
            b = itemB[configuration.id].toLowerCase();
        } else if(configuration.type === 'number') {
            a = +itemA[configuration.id];
            b = +itemB[configuration.id];
        }

        if(asc) {
            return a > b ? 1 : -1;
        } else {
            return a < b ? 1 : -1;
        }

    });

    return items;
  }

  onSearch(
        items: Item[] | undefined,
        target: any,
        configuration: TableConfiguration[] | undefined,
        oldItems: Item[] | undefined
    ): Item[] | undefined {
    
    items = oldItems?.filter((oldItem: Item) => {

      return configuration?.some((c: TableConfiguration) => {

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

    return items;

  }
}