import {
  loadQuestions,
  loadQuestionsSuccess,
  loadQuestionsFailure,
  createQuestion,
  createQuestionSuccess,
  createQuestionFailure,
  deleteQuestion,
  toggleLikeQuestion,
} from '../actions';
import { Question, mockQuestions } from 'src/app/models';

describe('QuestionsActions', () => {
  it('should create loadQuestions', () => {
    const expectedAction = {
      type: loadQuestions.type,
    };
    const action = loadQuestions();
    expect(action.type).toEqual(expectedAction.type);
  });

  it('should create loadQuestionsSuccess', () => {
    const expectedAction = {
      type: loadQuestionsSuccess.type,
      payload: {
        questions: mockQuestions,
      },
    };
    const action = loadQuestionsSuccess(expectedAction.payload);
    expect(action.type).toEqual(expectedAction.type);
    expect(action.payload).toEqual(expectedAction.payload);
  });

  it('should create loadQuestionsFailure', () => {
    const expectedAction = {
      type: loadQuestionsFailure.type,
      payload: {
        error: 'error',
      },
    };
    const action = loadQuestionsFailure(expectedAction.payload);
    expect(action.type).toEqual(expectedAction.type);
    expect(action.payload).toEqual(expectedAction.payload);
  });

  it('should create createQuestion', () => {
    const expectedAction = {
      type: createQuestion.type,
      payload: {
        question: { name: 'Test user', text: 'Test question' } as Question,
      },
    };
    const action = createQuestion(expectedAction.payload);
    expect(action.type).toEqual(expectedAction.type);
    expect(action.payload).toEqual(expectedAction.payload);
  });

  it('should create createQuestionSuccess', () => {
    const expectedAction = {
      type: createQuestionSuccess.type,
      payload: {
        question: { name: 'Test user', text: 'Test question' } as Question,
      },
    };
    const action = createQuestionSuccess(expectedAction.payload);
    expect(action.type).toEqual(expectedAction.type);
    expect(action.payload).toEqual(expectedAction.payload);
  });

  it('should create createQuestionFailure', () => {
    const expectedAction = {
      type: createQuestionFailure.type,
      payload: {
        error: 'error',
      },
    };
    const action = createQuestionFailure(expectedAction.payload);
    expect(action.type).toEqual(expectedAction.type);
    expect(action.payload).toEqual(expectedAction.payload);
  });

  it('should create deleteQuestion', () => {
    const expectedAction = {
      type: deleteQuestion.type,
      payload: { id: '1' },
    };
    const action = deleteQuestion(expectedAction.payload);
    expect(action.type).toEqual(expectedAction.type);
    expect(action.payload).toEqual(expectedAction.payload);
  });

  it('should create toggleLikeQuestion', () => {
    const expectedAction = {
      type: toggleLikeQuestion.type,
      payload: {
        question: { name: 'Test user', text: 'Test text' } as Question,
      },
    };
    const action = toggleLikeQuestion(expectedAction.payload);
    expect(action.type).toEqual(expectedAction.type);
    expect(action.payload).toEqual(expectedAction.payload);
  });
});
