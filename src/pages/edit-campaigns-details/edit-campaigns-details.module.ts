import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCampaignsDetailsPage } from './edit-campaigns-details';

@NgModule({
  declarations: [
    EditCampaignsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCampaignsDetailsPage),
  ],
})
export class EditCampaignsDetailsPageModule {}
