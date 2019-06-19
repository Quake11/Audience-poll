import { Question } from 'src/app/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  QuestionsActions,
  loadQuestions,
  loadQuestionsSuccess,
  loadQuestionsFailure,
  createQuestion,
  createQuestionSuccess,
  createQuestionFailure,
  deleteQuestion,
  toggleLikeQuestion,
} from '../actions';

/**
 * State ID
 */
export const STATE_ID = 'questions';

/**
 * State
 */
export interface State extends EntityState<Question> {
  loading: boolean;
}

function sortByLikes(q1: Question, q2: Question) {
  return q2.likes - q1.likes;
}

/**
 * Adapter
 */
export const adapter: EntityAdapter<Question> = createEntityAdapter<Question>({
  sortComparer: sortByLikes,
});

/**
 * Initial state
 */
export const initialState: State = adapter.getInitialState({ loading: false });

/**
 * Reducer
 */
export function reducer(state = initialState, action: QuestionsActions): State {
  switch (action.type) {
    case loadQuestions.type: {
      return { ...state };
    }
    case loadQuestionsSuccess.type: {
      const { questions } = action.payload;
      return adapter.addAll(questions.map(q => ({ likes: 0, ...q })), {
        ...state,
        loading: false,
      });
    }
    case loadQuestionsFailure.type: {
      return { ...state, loading: false };
    }
    case createQuestion.type: {
      return { ...state, loading: true };
    }
    case createQuestionSuccess.type: {
      const { question } = action.payload;
      return adapter.addOne(question, { ...state, loading: false });
    }
    case createQuestionFailure.type: {
      return { ...state, loading: false };
    }
    case deleteQuestion.type: {
      const { id } = action.payload;
      return adapter.removeOne(id, { ...state, loading: true });
    }
    case toggleLikeQuestion.type: {
      const { id, liked, likes } = action.payload.question;
      let likedNew: boolean;
      let likesNew: number = likes;

      if (liked) {
        likedNew = false;
        likesNew = likes ? likes - 1 : 0;
      } else {
        likedNew = true;
        likesNew = likes ? likes + 1 : 1;
      }

      const changes = {
        id,
        changes: { liked: likedNew, likes: likesNew },
      };
      return adapter.updateOne(changes, { ...state });
    }
    default: {
      return state;
    }
  }
}
