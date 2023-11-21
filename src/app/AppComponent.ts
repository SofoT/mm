import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './user-name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  i = 0;
  showEmailInput = false;
  emailInputs: FormControl[] = [];
  registrationForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {


    this.registrationForm = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        forbiddenNameValidator(/admin/),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        forbiddenNameValidator(/admin/),

      ]),

      gender: new FormControl('', [Validators.required]),
      address: new FormGroup(
        {
          city: new FormControl('', [Validators.required]),
          region: new FormControl('', [Validators.required]),
          postalCode: new FormControl('', [Validators.required]),

        },
        [Validators.required]
      ),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{9}$/),
      ]),

      
      dateOfBirth: new FormControl('', [Validators.required]),
      position: new FormControl(''),
      subscribeToNewsLetter: new FormControl(false),
      emails: this.formBuilder.array([]),
    });
  }
  public onSubmit() {
    if (this.registrationForm.valid) {
      this.i++;
      console.log(this.registrationForm.value);
      console.log(`hi ${this.i}`);
    }
  }
  addEmail() {
    const newEmailInput = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.emailInputs.push(newEmailInput);
    const emailsFormArray = this.registrationForm.get('emails') as FormArray;
    emailsFormArray.push(newEmailInput);
  }
}
