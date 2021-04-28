import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class LoginPageModule {}
