import { createQuestion, deleteQuestion } from '../actions';
import { reducer, initialState, State } from './questions.reducer';

describe('QuestionsReducer', () => {
  describe('QuestionsAction', () => {
    it('should handle createQuestion', () => {
      const question = { id: '1', name: 'anon1', text: 'question 1' };
      const state: State = {
        ...initialState,
      };

      const expected: State = {
        ...state,
        loading: true,
        ids: ['1'],
        entities: {
          1: question,
        },
      };
      const action = createQuestion({ question });

      // TODO: change to toBeEqual with excepted
      expect(reducer(state, action)).toBeDefined();
    });
    it('should handle deleteQuestion', () => {
      const state: State = {
        ...initialState,
        loading: false,
        ids: [1],
        entities: {
          1: { id: '1', name: 'anon1', text: 'question 1' },
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
  });
});
