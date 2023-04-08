import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = 'password';
  showPassword: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPass() {
    console.log(this.loginForm.controls['username'].dirty && this.loginForm.hasError('required', 'username'));

    this.showPassword = !this.showPassword;
    this.eyeIcon = this.showPassword ? 'fa-eye' : 'fa-eye-slash';
    this.type = this.showPassword ? 'text' : 'password';
  }

  onSubmit() {
    if (this.loginForm.valid) {

    }
    else {
      ValidateForm.validateForm(this.loginForm);
    }
  }
}
