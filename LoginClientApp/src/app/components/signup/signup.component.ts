import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

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
      this.authService.signup(this.signupForm.value).subscribe({
        next: (res => { 
          alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['login']);
        }),
        error: (err => { alert(err?.error.message) })
      });
    }
    else {
      ValidateForm.validateForm(this.signupForm);
    }
  }
}
