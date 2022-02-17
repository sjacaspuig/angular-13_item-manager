import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableDataComponent } from './table-data/table-data.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TablePaginatorComponent } from './table-paginator/table-paginator.component';
import { ModalModule } from '../modal/modal.module';
import { SearcherModule } from '../searcher/searcher.module';



@NgModule({
  declarations: [
    TableComponent,
    TableDataComponent,
    TableHeaderComponent,
    TablePaginatorComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    SearcherModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
