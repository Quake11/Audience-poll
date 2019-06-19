import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { State } from './reducers';
import { questionsQuery } from './selectors';
import {
  QuestionsActions,
  loadQuestions,
  createQuestion,
  deleteQuestion,
  toggleLikeQuestion,
} from './actions';
import { Question } from 'src/app/models';

@Injectable()
export class QuestionsFacade {
  questions$ = this.store.pipe(select(questionsQuery.getQuestions));

  constructor(
    private store: Store<State>,
    private actions$: Actions<QuestionsActions>
  ) {}

  /**
   * Find all
   */
  findAll() {
    this.store.dispatch(loadQuestions());
  }

  /**
   * Create
   * @param question Question
   */
  create(question: Question) {
    this.store.dispatch(createQuestion({ question }));
  }

  /**
   * Delete
   * @param id ID
   */
  delete(id: string) {
    this.store.dispatch(deleteQuestion({ id }));
  }

  /**
   * Toggle like
   * @param question Question
   */
  toggleLike(question: Question) {
    this.store.dispatch(toggleLikeQuestion({ question }));
  }
}
