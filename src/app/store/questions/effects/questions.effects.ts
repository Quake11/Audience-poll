import { QuestionsService } from 'src/app/services/questions.service';
import {
  QuestionsActions,
  loadQuestions,
  loadQuestionsSuccess,
  loadQuestionsFailure,
  createQuestion,
  deleteQuestion
} from '../actions';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, concatMap, map, catchError } from 'rxjs/operators';
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
}
