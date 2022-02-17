import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { SearcherModule } from '../searcher/searcher.module';



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    SearcherModule
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule { }
