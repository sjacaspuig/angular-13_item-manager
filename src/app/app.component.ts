import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TABLE_CONFIGURATION } from './shared/constants/table-configuration';
import { Item } from './shared/models/item.interface';
import { TableConfiguration } from './shared/models/table-configuration.interface';
import { ItemsService } from './services/items/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  items$: Observable<Item[]> | undefined;
  configuration: TableConfiguration[] = TABLE_CONFIGURATION;

  constructor(
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.items$ = this.itemsService.getItems();
  }

}
