import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Question } from 'src/app/models';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  animations: [
    trigger('fromTop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-25px)' }),
        animate(
          '200ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class QuestionFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<Question> = new EventEmitter();

  form: FormGroup;
  controls = {
    name: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  };

  private _isOpened: boolean;
  get isOpened() {
    return this._isOpened;
  }
  set isOpened(bool) {
    this.form.reset();
    this._isOpened = bool;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(this.controls);
  }

  onSubmit() {
    this.formSubmit.emit(this.form.value);
    this.isOpened = false;
  }
}
