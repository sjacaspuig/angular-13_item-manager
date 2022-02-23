import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item } from 'src/app/shared/models/item.interface';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  // Outputs
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  items$: Observable<Item[]> | undefined;

  constructor(
    private favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.items$ = this.favoritesService.favorites$;
  }

  removeFavorite(item: Item) {
    if(item) {
      this.favoritesService.setFavorite(item);
    }
  }

  onSearch(target: any) {

    this.items$ = this.favoritesService.favorites$.pipe(
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
  }

}
