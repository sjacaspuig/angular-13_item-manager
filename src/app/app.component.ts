import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './models/item.interface';
import { TableConfiguration } from './models/table-configuration.interface';
import { ItemsService } from './services/items/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  items$: Observable<Item[]> | undefined;
  configuration: TableConfiguration[] = [
    {id: 'title', title: 'Title', type: 'text'},
    {id: 'description', title: 'Description', type: 'text'},
    {id: 'price', title: 'Price', type: 'number', textToAdd: '€'},
    {id: 'email', title: 'Contact',type: 'text'},
    {id: 'image', title: 'Photo', type: 'img'},
  ]

  constructor(
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.items$ = this.itemsService.getItems();
  }

}
