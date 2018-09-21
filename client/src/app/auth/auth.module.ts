import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './authInterceptor.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotComponent
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    ForgotComponent
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true }
  ]
})
export class AuthModule { }
