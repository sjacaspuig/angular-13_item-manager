import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Item } from 'src/app/shared/models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites: Item[] = [];
  public favorites$: ReplaySubject<Item[]> = new ReplaySubject<Item[]>(1);

  constructor() { }

  setFavorite(item: Item) {
    const index = this.favorites.map(f => f.email).indexOf(item.email, 0);

    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(item);
    }

    this.favorites$.next(this.favorites);
  }
}
