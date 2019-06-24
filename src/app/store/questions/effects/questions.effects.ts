import { QuestionsService } from 'src/app/services';
import {
  QuestionsActions,
  loadQuestions,
  loadQuestionsSuccess,
  loadQuestionsFailure,
  createQuestion,
  createQuestionSuccess,
  createQuestionFailure
} from '../actions';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class QuestionsEffects {
  constructor(
    private actions$: Actions<QuestionsActions>,
    private questionsService: QuestionsService
  ) {}

  @Effect()
  loadQuestions$ = this.actions$.pipe(
    ofType(loadQuestions.type),
    switchMap(action => {
      return this.questionsService.findAll().pipe(
        map(result => loadQuestionsSuccess({ questions: result })),
        catchError(error => of(loadQuestionsFailure({ error })))
      );
    })
  );

  @Effect()
  createQuestion$ = this.actions$.pipe(
    ofType(createQuestion.type),
    switchMap(action => {
      const { question } = action.payload;
      return this.questionsService.create(question).pipe(
        map(result => createQuestionSuccess({ question: result })),
        catchError(error => of(createQuestionFailure({ error })))
      );
    })
  );
}
