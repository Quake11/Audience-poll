import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionItemComponent } from './question-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { validQuestion } from 'src/app/models';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('QuestionItemComponent', () => {
  let component: QuestionItemComponent;
  let fixture: ComponentFixture<QuestionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionItemComponent],
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionItemComponent);
    component = fixture.componentInstance;
    component.question = { ...validQuestion };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleLike', () => {
    spyOn(component.toggleLike, 'emit');
    component.toggleLike.emit(validQuestion);
    expect(component.toggleLike.emit).toHaveBeenCalledWith(validQuestion);
  });

  it('should emit toggleLike on like button click', () => {
    spyOn(component.toggleLike, 'emit');
    const likeButton = fixture.debugElement.nativeElement.querySelector(
      'button.like'
    );
    likeButton.click();
    expect(component.toggleLike.emit).toHaveBeenCalledWith(validQuestion);
  });

  it('should increase like count on input change', () => {
    const likeCount = fixture.debugElement.nativeElement.querySelector(
      '.like-count'
    );
    component.question.likes = 1;
    fixture.detectChanges();
    expect(likeCount.innerHTML).toContain('1');
  });
});
