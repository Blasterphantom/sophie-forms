import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { Person } from '../Model/Person';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  savedData: Person | null = null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      fName: ['', [Validators.required, Validators.minLength(2)]],
      lName: ['', [Validators.required, Validators.minLength(2)]],
      eMail: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          this.phoneNumberValidator,
        ],
      ],
      cereal1: [false, [Validators.required]],
      cereal2: [false, [Validators.required]],
      cereal3: [false, [Validators.required]],
      cereal4: [false, [Validators.required]],
    });
  }

  submitForm() {
    if (this.userForm.invalid) {
      alert('Fix errors on form');
    } else {
      alert('Succesful!');
      console.log(this.userForm.value);
      const formData = { ...this.userForm.value };
      this.savedData = formData as Person;
      this.userForm.reset();
      this.ngOnInit();
    }
  }

  // Custom phone number validator function
  phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const phoneNumberPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    const isValid = phoneNumberPattern.test(control.value);

    return isValid ? null : { phoneNumber: true };
  }

  CheckData(){
    console.log(this.savedData);
  }
}
