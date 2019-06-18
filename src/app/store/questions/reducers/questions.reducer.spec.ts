import { createQuestion, deleteQuestion } from '../actions';
import { reducer, initialState, State } from './questions.reducer';
import { Question } from 'src/app/models';

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
      const question = { id: '1', name: 'anon1', text: 'question 1' };
      const state: State = {
        ...initialState
      };
      const expected: State = {
        ...state,
        ids: ['1'],
        entities: {
          1: question
        }
      };
      const action = createQuestion({ question });
      expect(reducer(state, action)).toEqual(expected);
    });
    it('should handle deleteQuestion', () => {
      const state: State = {
        ...initialState,
        ids: [1],
        entities: {
          1: { id: '1', name: 'anon1', text: 'question 1' }
        }
      };
      const expected: State = {
        ...state,
        ids: [],
        entities: {}
      };
      const action = deleteQuestion({ id: '1' });
      expect(reducer(state, action)).toEqual(expected);
    });
  });
});
