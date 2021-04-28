import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackCampaignPage } from './track-campaign';

@NgModule({
  declarations: [
    TrackCampaignPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackCampaignPage),
  ],
})
export class TrackCampaignPageModule {}
