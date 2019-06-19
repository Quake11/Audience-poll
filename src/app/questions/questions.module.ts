import { AppStoreModule } from './../store/app-store.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  QuestionsListComponent,
  QuestionItemComponent,
  QuestionFormComponent,
} from './components';
import { QuestionsStoreModule } from '../store/questions';
import { QuestionsComponent } from './questions.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionsListComponent,
    QuestionItemComponent,
    QuestionFormComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    QuestionsStoreModule,
    AppStoreModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [QuestionsComponent],
})
export class QuestionsModule {}
