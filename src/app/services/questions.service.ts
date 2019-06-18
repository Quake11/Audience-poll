import { Question } from 'src/app/models';
import { Injectable } from '@angular/core';
import { of, from, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor() {}

  findAll(): Observable<Question[]> {
    //  mock fetch from api
    console.log('Questions service: findAll');

    return of([
      { id: '1', name: 'anon 1', text: 'question 1' },
      { id: '2', name: 'anon 2', text: 'question 2' }
    ]).pipe(delay(1000));
  }

  create(question: Question) {
    console.log('Questions service: create', question);
    // mock reuqest to api
    return of({ id: 1, ...question }).pipe(delay(1000));
  }

  delete(id: string) {
    console.log('Questions service: delete', id);
    // mock reuqest to api
    return of({ success: 'true', id }).pipe(delay(1000));
  }
}
