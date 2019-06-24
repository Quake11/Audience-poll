import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSwipeActionDirective } from './ngx-swipe-action.directive';

describe('SwipeActionDirective', () => {
  let component: NgxSwipeActionDirective;
  let fixture: ComponentFixture<NgxSwipeActionDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxSwipeActionDirective],
      imports: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSwipeActionDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
