import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss'],
  animations: [
    trigger('like', [
      state(
        'unliked',
        style({
          transform: 'scale(1)'
        })
      ),
      state(
        'liked',
        style({
          transform: 'scale(1)'
        })
      ),
      transition(
        '* => liked',
        animate(
          '800ms ease-in-out',
          keyframes([
            style({ transform: 'translate3d(0, 1px, 0)', offset: 0.1 }),
            style({ transform: 'translate3d(0, -5px, 0)', offset: 0.5 }),
            style({ transform: 'translate3d(0, 1px, 0)', offset: 0.9 })
          ])
        )
      ),
      transition(
        '* => unliked',
        animate(
          '500ms ease-in-out',
          keyframes([
            style({ transform: 'translate3d(0, -1px, 0)', offset: 0.1 }),
            style({ transform: 'translate3d(0, 5px, 0)', offset: 0.5 }),
            style({ transform: 'translate3d(0, -1px, 0)', offset: 0.9 })
          ])
        )
      )
    ])
  ]
})
export class QuestionItemComponent {
  @Input() question: Question;
  @Output() toggleLike: EventEmitter<Question> = new EventEmitter();
}
