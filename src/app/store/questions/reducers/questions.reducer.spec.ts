import {
  createQuestion,
  deleteQuestion,
  createQuestionSuccess,
  createQuestionFailure,
  toggleLikeQuestion,
} from '../actions';
import { reducer, initialState, State } from './questions.reducer';
import { validQuestion } from 'src/app/models';

describe('QuestionsReducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('QuestionsAction', () => {
    it('should handle createQuestion', () => {
      const question = {
        id: '1',
        name: 'Test user 1',
        text: 'Test question 1',
      };
      const state: State = {
        ...initialState,
        loading: false,
      };
      const expected: State = {
        ...state,
        loading: true,
      };
      const action = createQuestion({ question });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle createQuestionSuccess', () => {
      const question = {
        id: '1',
        name: 'Test user 1',
        text: 'Test question 1',
      };
      const state: State = {
        ...initialState,
        loading: true,
      };

      const expected: State = {
        ...state,
        loading: false,
        ids: ['1'],
        entities: {
          1: question,
        },
      };
      const action = createQuestionSuccess({ question });

      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle createQuestionFailure', () => {
      const error = 'error';
      const state: State = {
        ...initialState,
        loading: true,
      };
      const expected: State = {
        ...state,
        loading: false,
      };
      const action = createQuestionFailure({ error });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle deleteQuestion', () => {
      const state: State = {
        ...initialState,
        loading: false,
        ids: ['1'],
        entities: {
          1: { id: '1', name: 'Test user 1', text: 'Test question 1' },
        },
      };
      const expected: State = {
        ...state,
        loading: true,
        ids: [],
        entities: {},
      };
      const action = deleteQuestion({ id: '1' });
      expect(reducer(state, action)).toEqual(expected);
    });

    it('should handle toggleLikeQuestion', () => {
      const state: State = {
        ...initialState,
        ids: ['1'],
        entities: {
          1: { id: '1', name: 'Test user 1', text: 'Test question 1' },
        },
      };
      const expected: State = {
        ...state,
        ids: ['1'],
        entities: {
          1: {
            id: '1',
            name: 'Test user 1',
            text: 'Test question 1',
            likes: 1,
            liked: true,
          },
        },
      };
      const action = toggleLikeQuestion({
        question: {
          id: '1',
          name: 'Test user 1',
          text: 'Test question 1',
        },
      });
      expect(reducer(state, action)).toEqual(expected);
    });
  });
});
