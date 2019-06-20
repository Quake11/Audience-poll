import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Question } from 'src/app/models';
import { Observable } from 'rxjs';
import { QuestionsFacade } from 'src/app/store/questions';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  keyframes,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('150ms', [
            animate(
              '700ms ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(10px)',
                  offset: 0.3,
                }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
              ])
            ),
          ]),
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class QuestionsComponent implements OnInit {
  questions$: Observable<Question[]>;

  constructor(private questionsFacade: QuestionsFacade) {}

  ngOnInit() {
    this.questionsFacade.findAll();
    this.questions$ = this.questionsFacade.questions$;
  }

  onCreate(data: Question) {
    this.questionsFacade.create({ ...data });
  }

  toggleLike(question: Question) {
    this.questionsFacade.toggleLike(question);
  }

  trackByFn(index: number, q: Question) {
    return q.id;
  }
}
