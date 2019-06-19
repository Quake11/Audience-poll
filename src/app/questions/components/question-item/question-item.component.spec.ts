import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionItemComponent } from './question-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Question } from 'src/app/models';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('QuestionItemComponent', () => {
  let component: QuestionItemComponent;
  let fixture: ComponentFixture<QuestionItemComponent>;
  const validQuestion: Question = {
    likes: 0,
    liked: false,
    name: 'Test user',
    text: 'Test text'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionItemComponent],
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatListModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(QuestionItemComponent);
        component = fixture.componentInstance;
        component.question = validQuestion;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionItemComponent);
    component = fixture.componentInstance;
    component.question = validQuestion;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit likeToggle', () => {
    spyOn(component.likeToggle, 'emit');
    component.likeToggle.emit(validQuestion);
    expect(component.likeToggle.emit).toHaveBeenCalledWith(validQuestion);
  });

  it('should emit likeToggle on like button click', () => {
    spyOn(component.likeToggle, 'emit');

    const likeButton = fixture.debugElement.nativeElement.querySelector(
      'button.like'
    );
    likeButton.click();

    fixture.whenStable().then(() => {
      expect(component.likeToggle.emit).toHaveBeenCalledWith(validQuestion);
    });
  });
});
