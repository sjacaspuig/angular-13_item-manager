import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Item } from 'src/app/models/item.interface';
import { TableConfiguration } from 'src/app/models/table-configuration.interface';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit {

  // Inputs
  @Input() item: Item | undefined;
  @Input() configuration: TableConfiguration[] | undefined;

  showModal: boolean = false;
  isFavorite$: Observable<boolean> | undefined;

  constructor(
    private favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.isFavorite$ = this.favoritesService.favorites$.pipe(
      map((items: Item[]) => items.some(item => item.email === this.item?.email))
    );
  }

  switchFavorite() {
    if(this.item) {
      this.favoritesService.setFavorite(this.item);
    }
  }

}
