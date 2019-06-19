import { Question } from 'src/app/models';
import { Injectable } from '@angular/core';
import { of, from, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  mock = [
    {
      id: '1',
      name: 'John Doe',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    },
    {
      id: '2',
      name: 'Mary Sue',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];

  constructor() {}

  findAll(): Observable<Question[]> {
    //  mock fetch from api
    return of(this.mock).pipe(delay(1000));
  }

  create(question: Question) {
    // mock reuqest to api
    return of({ id: question.id || this.randomId(), ...question }).pipe(
      delay(1000)
    );
  }

  delete(id: string) {
    // mock reuqest to api
    return of({ success: 'true', id }).pipe(delay(1000));
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
