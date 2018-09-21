import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule, CoreModule, HomeModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
