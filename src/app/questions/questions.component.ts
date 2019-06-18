import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Question } from 'src/app/models';
import { Observable } from 'rxjs';
import { QuestionsFacade } from 'src/app/store/questions';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions$: Observable<Question[]>;

  constructor(private questionsFacade: QuestionsFacade) {}

  ngOnInit() {
    this.questionsFacade.findAll();
    this.questions$ = this.questionsFacade.questions$;
  }

  onCreate(data: Question) {
    console.log(data);

    this.questionsFacade.create({ id: this.randomId(), ...data });
  }

  likeToggle(question: Question) {
    this.questionsFacade.toggleLike(question);
  }

  // imitating backend random id
  randomId() {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
}
