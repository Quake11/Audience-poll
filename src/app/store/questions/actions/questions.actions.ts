import { createAction, union } from '@ngrx/store';
import { Question } from 'src/app/models';

export const loadQuestions = createAction('[Questions] Load');

export const loadQuestionsSuccess = createAction(
  '[Questions] Load Success',
  (payload: { questions: Question[] }) => ({ payload })
);

export const loadQuestionsFailure = createAction(
  '[Questions] Load Failure',
  (payload: { error: any }) => ({ payload })
);

export const createQuestion = createAction(
  '[Questions] Create',
  (payload: { question: Partial<Question> }) => ({ payload })
);

export const createQuestionSuccess = createAction(
  '[Questions] Create success',
  (payload: { question: Question }) => ({ payload })
);

export const createQuestionFailure = createAction(
  '[Questions] Create failure',
  (payload: { error: any }) => ({ payload })
);

export const deleteQuestion = createAction(
  '[Questions] Delete',
  (payload: { id: string }) => ({ payload })
);

export const toggleLikeQuestion = createAction(
  '[Questions] Toggle Like',
  (payload: { question: Question }) => ({ payload })
);

const all = union({
  loadQuestions,
  loadQuestionsSuccess,
  loadQuestionsFailure,
  createQuestion,
  createQuestionSuccess,
  createQuestionFailure,
  deleteQuestion,
  toggleLikeQuestion,
});

export type QuestionsActions = typeof all;
