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
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  savedData: Person | null = null;
  savedArray:any = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      eMail: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.minLength(5)]],
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
      this.savedArray.push(this.savedData);
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
    console.log(this.savedArray);
  }
}
