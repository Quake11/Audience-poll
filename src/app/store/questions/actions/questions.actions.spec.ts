import { createQuestion, deleteQuestion } from '../actions';
import { Question } from 'src/app/models';

describe('QuestionsActions', () => {
  it('should create createQuestion', () => {
    const expectedAction = {
      type: createQuestion.type,
      payload: {
        question: { name: 'Test user', text: 'Test text' } as Question
      }
    };
    const action = createQuestion(expectedAction.payload);
    expect(action.type).toEqual(expectedAction.type);
    expect(action.payload).toEqual(expectedAction.payload);
  });
  it('should create deleteQuestion', () => {
    const expectedAction = {
      type: deleteQuestion.type,
      payload: { id: '1' }
    };
    const action = deleteQuestion(expectedAction.payload);
    expect(action.type).toEqual(expectedAction.type);
    expect(action.payload).toEqual(expectedAction.payload);
  });
});
