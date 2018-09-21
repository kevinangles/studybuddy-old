import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreService } from '.././core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public coreService: CoreService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  post() {
    this.coreService.loginUser(this.loginForm.value);
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 400);
  }
}
