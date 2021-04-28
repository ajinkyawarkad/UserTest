import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallDetailsPage } from './call-details';

@NgModule({
  declarations: [
    CallDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CallDetailsPage),
  ],
})
export class CallDetailsPageModule {}
