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
import { QuestionsStoreModule, QuestionsFacade } from '../store/questions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { validQuestion, mockQuestions } from '../models';
import { AppStoreModule } from 'src/app/store';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  let questionsService: QuestionsFacade;
  let store: Store<State>;

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
        AppStoreModule,
        QuestionsStoreModule,
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        store = TestBed.get(Store);
        fixture = TestBed.createComponent(QuestionsComponent);
        component = fixture.componentInstance;
        component.questions$ = of(mockQuestions);

        questionsService = TestBed.get(QuestionsFacade);
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    component.questions$ = of(mockQuestions);

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
    component.toggleLike(validQuestion);
    expect(questionsService.toggleLike).toHaveBeenCalledWith(validQuestion);
  });
});
