import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArchivedCampaignsDetailsPage } from './archived-campaigns-details';

@NgModule({
  declarations: [
    ArchivedCampaignsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ArchivedCampaignsDetailsPage),
  ],
})
export class ArchivedCampaignsDetailsPageModule {}
