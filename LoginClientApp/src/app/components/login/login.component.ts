import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import ValidateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';

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

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
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
    this.loginForm.valid ?
      this.authService.login(this.loginForm.value).subscribe(d => { 
        alert(d.message);
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
     }) :
      ValidateForm.validateForm(this.loginForm);
  }
}
