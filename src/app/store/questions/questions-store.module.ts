import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducer, STATE_ID } from './reducers';
import { QuestionsEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { QuestionsFacade } from './questions.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(STATE_ID, reducer),
    EffectsModule.forFeature([QuestionsEffects])
  ],
  providers: [QuestionsFacade]
})
export class QuestionsStoreModule {}
