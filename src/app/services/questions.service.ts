import { Question, mockQuestions } from 'src/app/models';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor() {}

  findAll(): Observable<Question[]> {
    //  mock fetch from api
    return of(mockQuestions).pipe(delay(100));
  }

  create(question: Question) {
    // mock reuqest to api
    return of({ id: question.id || this.randomId(), ...question }).pipe(
      delay(100)
    );
  }

  delete(id: string) {
    // mock reuqest to api
    return of({ success: 'true', id }).pipe(delay(100));
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
