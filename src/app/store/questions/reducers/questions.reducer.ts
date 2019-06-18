import { Question } from 'src/app/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  QuestionsActions,
  loadQuestions,
  loadQuestionsSuccess,
  loadQuestionsFailure,
  createQuestion,
  deleteQuestion,
  toggleLikeQuestion
} from '../actions';

/**
 * State ID
 */
export const STATE_ID = 'questions';

/**
 * State
 */
export interface State extends EntityState<Question> {}

function sortByLikes(q1: Question, q2: Question) {
  return q1.likes - q2.likes;
}

/**
 * Adapter
 */
export const adapter: EntityAdapter<Question> = createEntityAdapter<Question>({
  sortComparer: sortByLikes
});

/**
 * Initial state
 */
export const initialState: State = adapter.getInitialState({});

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
      return adapter.addAll(questions, { ...state });
    }
    case loadQuestionsFailure.type: {
      return { ...state };
    }
    case createQuestion.type: {
      const { question } = action.payload;
      return adapter.addOne(question, { ...state });
    }
    case deleteQuestion.type: {
      const { id } = action.payload;
      return adapter.removeOne(id, { ...state });
    }
    case toggleLikeQuestion.type: {
      const { id, liked, likes } = action.payload.question;
      let likedNew: boolean;
      let likesNew: number;

      if (liked) {
        likedNew = false;
        likesNew = likes ? likes - 1 : 0;
      } else {
        likedNew = true;
        likesNew = likes ? likes + 1 : 1;
      }

      const changes = {
        id,
        changes: { liked: likedNew, likes: likesNew }
      };
      return adapter.updateOne(changes, { ...state });
    }
    default: {
      return state;
    }
  }
}
