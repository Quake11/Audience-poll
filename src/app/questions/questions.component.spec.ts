import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsComponent } from './questions.component';
import {
  QuestionsListComponent,
  QuestionItemComponent,
  QuestionFormComponent,
} from './components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AppStoreModule } from '../store';
import { QuestionsStoreModule, QuestionsFacade } from '../store/questions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Question } from '../models';
import { By } from '@angular/platform-browser';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  let questionsService: QuestionsFacade;

  const validQuestion: Question = {
    id: '1',
    name: 'Test user',
    text: 'Test text',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestionsComponent,
        QuestionsListComponent,
        QuestionItemComponent,
        QuestionFormComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        QuestionsStoreModule,
        AppStoreModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        TextFieldModule,
        MatButtonModule,
        MatInputModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    questionsService = TestBed.get(QuestionsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create', () => {
    spyOn(questionsService, 'create').and.callThrough();
    component.onCreate(validQuestion);
    expect(questionsService.create).toHaveBeenCalledWith(validQuestion);
  });

  it('should call toggleLike', () => {
    spyOn(questionsService, 'toggleLike').and.callThrough();
    component.likeToggle(validQuestion);
    expect(questionsService.toggleLike).toHaveBeenCalledWith(validQuestion);
  });
});
