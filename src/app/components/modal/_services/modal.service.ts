import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { Item } from 'src/app/shared/models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private favoritesService: FavoritesService
  ) { }

  onSearch(target: any, items$: Observable<Item[]> | undefined): Observable<Item[]> | undefined {

    items$ = this.favoritesService.favorites$.pipe(
      map((items: Item[]) => {

        items = items.filter(item => {

          // Search only by title
          const itemValue: string = item.title.toLowerCase();
          const value: string = target.value.toLowerCase();
  
          return itemValue.includes(value);
        });

        return items;
      })
    );

    return items$
  }
}