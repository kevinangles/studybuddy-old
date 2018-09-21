import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreRoutingModule } from './core-routing.module';
import { CoreService } from './core.service';
import { CoreInterceptorService } from './coreInterceptor.service';

import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    NavbarComponent,
    NotFoundComponent,
    WelcomeComponent
  ],
  exports: [
    NavbarComponent,
    NotFoundComponent,
    WelcomeComponent
  ],
  providers: [
    CoreService,
    { provide: HTTP_INTERCEPTORS,
      useClass: CoreInterceptorService,
      multi: true }
  ]
})
export class CoreModule { }
