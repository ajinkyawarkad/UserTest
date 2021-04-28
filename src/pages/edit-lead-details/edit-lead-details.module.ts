import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditLeadDetailsPage } from './edit-lead-details';

@NgModule({
  declarations: [
    EditLeadDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditLeadDetailsPage),
  ],
})
export class EditLeadDetailsPageModule {}
