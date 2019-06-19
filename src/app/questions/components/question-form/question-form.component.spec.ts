import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormComponent } from './question-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Question } from 'src/app/models';

describe('QuestionFormComponent', () => {
  let component: QuestionFormComponent;
  let fixture: ComponentFixture<QuestionFormComponent>;

  const validQuestion: Question = {
    name: 'Test user',
    text: 'Test text'
  };

  function updateForm(question: Question) {
    const { name, text } = question;
    component.form.controls.name.patchValue(name);
    component.form.controls.text.patchValue(text);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionFormComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatListModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid form data', () => {
    updateForm(validQuestion);
    expect(component.form.valid).toBeTruthy();
  });

  it('should be invalid form data', () => {
    updateForm({ name: '', text: '' });
    expect(component.form.valid).toBeFalsy();
  });

  it('should emit event formSubmit', () => {
    spyOn(component.formSubmit, 'emit');
    updateForm(validQuestion);
    component.onSubmit();
    expect(component.formSubmit.emit).toHaveBeenCalledWith(validQuestion);
  });
});
