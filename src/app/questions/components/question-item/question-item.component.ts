import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent {
  @Input() question: Question;
  @Output() likeToggle: EventEmitter<string> = new EventEmitter();
}
