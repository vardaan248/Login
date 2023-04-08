import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  showPassword: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPass() {
    this.showPassword = !this.showPassword;
    this.eyeIcon = this.showPassword ? 'fa-eye' : 'fa-eye-slash';
    this.type = this.showPassword ? 'text' : 'password';
  }

  onSubmit() {
    if (this.signupForm.valid) {

    }
    else {
      ValidateForm.validateForm(this.signupForm);
    }
  }
}
