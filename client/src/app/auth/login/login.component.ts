import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  post() {
    this.authService.loginUser(this.loginForm.value);
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 500);
  }
}
