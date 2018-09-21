import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  majors = [
    'Computer Science',
    'Information Technology',
    'Undeclared'
  ];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(32)]],
      last_name: ['', [Validators.required, Validators.maxLength(32)]],
      gender: ['', [Validators.required, Validators.maxLength(10)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$'),
      Validators.maxLength(32)]],
      major: ['', [Validators.required, Validators.maxLength(32)]],
      references: this.fb.array([
        this.fb.control(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)])
      ])
    });
  }

  get first_name() {
    return this.registerForm.get('first_name');
  }

  get last_name() {
    return this.registerForm.get('last_name');
  }

  get gender() {
    return this.registerForm.get('gender');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get major() {
    return this.registerForm.get('major');
  }

  get referencesForm() {
    return this.registerForm.get('references') as FormArray;
  }

  addReference() {
    if (this.referencesForm.length < 7) {
      this.referencesForm.push(this.fb.control(null));
    }
  }

  removeReference(i) {
    if (this.referencesForm.length > 1) {
      this.referencesForm.removeAt(i);
    }
  }

  post() {
    this.authService.registerUser(this.registerForm.value);
  }
}
