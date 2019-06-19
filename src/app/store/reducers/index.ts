import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromQuestions from '../questions/reducers/questions.reducer';

export interface State {
  questions: fromQuestions.State;
}

export const reducers: ActionReducerMap<State> = {
  questions: fromQuestions.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
