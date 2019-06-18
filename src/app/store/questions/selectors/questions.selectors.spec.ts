import { State as QuestionState, STATE_ID } from '../reducers';
import { questionsQuery } from './questions.selectors';
import { Question } from 'src/app/models';

interface State {
  [STATE_ID]: QuestionState;
}

describe('QuestionsSelector', () => {
  it('should handle selectors', () => {
    const questions: Question[] = [
      { id: '1', name: 'anon1', text: 'question 1' },
      { id: '2', name: 'anon2', text: 'question 2' },
      { id: '3', name: 'anon3', text: 'question 3' }
    ];
    const state: State = {
      [STATE_ID]: {
        ids: ['1', '2', '3'],
        entities: {
          1: questions[0],
          2: questions[1],
          3: questions[2]
        }
      }
    };
    expect(questionsQuery.getQuestions(state)).toEqual(questions);
  });
});
