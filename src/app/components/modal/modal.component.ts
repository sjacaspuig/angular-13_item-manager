import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item } from 'src/app/shared/models/item.interface';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { ModalService } from './_services/modal.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  // Outputs
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  // Variable
  items$: Observable<Item[]> | undefined;

  constructor(
    private favoritesService: FavoritesService,
    private modalService: ModalService
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
    this.items$ = this.modalService.onSearch(target, this.items$);
  }
}
