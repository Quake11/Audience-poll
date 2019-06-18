import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, STATE_ID } from '../reducers';
import { adapter } from '../reducers/questions.reducer';

/**
 * Selectors
 */
const { selectAll } = adapter.getSelectors();
const getQuestionsState = createFeatureSelector<State>(STATE_ID);

const getQuestions = createSelector(
  getQuestionsState,
  selectAll
);

/**
 * Queries
 */
export const questionsQuery = {
  getQuestions
};
