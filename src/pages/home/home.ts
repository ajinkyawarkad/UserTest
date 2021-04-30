import { Component } from '@angular/core';
import firebase from 'firebase';
import { MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { TrackCampaignPage } from '../track-campaign/track-campaign';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController ,public menuCtrl:MenuController) {
    this.menuCtrl.enable(true, 'menu');
  }
  ionViewDidLoad() {
    let cu=firebase.auth().currentUser;

    console.log(cu.uid,cu.displayName,cu.photoURL)
  }
  
  trackCampaigns()
  {
    
    this.navCtrl.push(TrackCampaignPage);
  }


}
