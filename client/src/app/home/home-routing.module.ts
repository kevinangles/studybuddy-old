import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';

const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'results/:code', component: ResultsComponent, canActivate: [AuthGuard]},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
