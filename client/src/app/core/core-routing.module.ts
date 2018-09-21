import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';

const coreRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule { }
