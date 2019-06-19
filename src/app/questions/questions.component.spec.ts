import { toggleLikeQuestion } from './../store/questions/actions/questions.actions';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsComponent } from './questions.component';
import {
  QuestionsListComponent,
  QuestionItemComponent,
  QuestionFormComponent
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
import { Question } from '../models';
import { AppStoreModule } from 'src/app/store';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  let questionsService: QuestionsFacade;
  let store: Store<State>;

  const validQuestion: Question = {
    likes: 0,
    liked: false,
    name: 'Test user',
    text: 'Test text'
  };

  const mock = [
    {
      id: '1',
      name: 'Test user 1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    },
    {
      id: '2',
      name: 'Test user 2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestionsComponent,
        QuestionsListComponent,
        QuestionItemComponent,
        QuestionFormComponent
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
        MatCardModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        store = TestBed.get(Store);
        fixture = TestBed.createComponent(QuestionsComponent);
        component = fixture.componentInstance;
        component.questions$ = of(mock);

        questionsService = TestBed.get(QuestionsFacade);
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    component.questions$ = of(mock);

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

  /*
  it('should increase/decrease like counter', () => {
    spyOn(questionsService, 'toggleLike').and.callThrough();

    component.questions$ = of(mock);
    fixture.detectChanges();
    console.log(component.questions$);

    component.questions$.subscribe(v => console.log(v));
    fixture.detectChanges();

    console.log(
      fixture.debugElement.query(By.css('app-question-item')).nativeElement
    );


    expect(questionsService.toggleLike).toHaveBeenCalledWith(validQuestion);

    /* component.questions$ = of(mock);
    fixture.detectChanges();
    const itemComponentElement = fixture.debugElement.query(
      By.directive(QuestionItemComponent)
    );
    console.log(component);
    console.log(itemComponentElement);

    const itemComponent = itemComponentElement.componentInstance;
    itemComponent.likeToggle.emit(itemComponent.question);

    fixture.detectChanges();

    console.log(
      itemComponentElement.nativeElement.querySelector('.like-count')
    );

    console.log(itemComponent);

    fixture.detectChanges();
  }); */
});
