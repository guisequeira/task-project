import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { AppSharedModule } from 'src/app/app-shared.module';
import { UIButtonComponent } from 'src/app/uibutton/uibutton.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

/**
 * Modulo do login
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AppSharedModule
  ],
  declarations: [LoginPage, UIButtonComponent]
})
export class LoginPageModule {}
