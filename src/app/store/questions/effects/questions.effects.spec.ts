import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { QuestionsEffects } from './questions.effects';

describe('QuestionsEffects', () => {
  let actions$: Observable<any>;
  let effects: QuestionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionsEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(QuestionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
