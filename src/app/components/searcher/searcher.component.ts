import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  //Inputs
  @Input() placeholder: string = 'Search';
  
  // Outputs
  @Output() onSearch: EventEmitter<EventTarget> = new EventEmitter<EventTarget>();

  constructor() { }

  ngOnInit(): void {

    const searcher = document.getElementsByTagName('input');

    if(searcher) {

      fromEvent(searcher, 'input').pipe(
        debounceTime(300),
        map((event: Event) => event.target )
      ).subscribe((target: EventTarget | null) => {
        if(target) {
          this.onSearch.emit(target);
        }
      })
    }
  }

}
