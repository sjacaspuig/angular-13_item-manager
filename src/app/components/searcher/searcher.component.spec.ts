import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearcherComponent } from './searcher.component';

describe('SearcherComponent', () => {
  let component: SearcherComponent;
  let fixture: ComponentFixture<SearcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the passed @Input value', () => {
    component.placeholder = 'Search by';
    fixture.nativeElement.querySelector('input').placeholder = component.placeholder;
    const placeholder = fixture.nativeElement.querySelector('input').placeholder;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input').placeholder).toBe(placeholder);
  });
});
