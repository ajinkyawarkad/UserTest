import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallDetailsPage } from '../call-details/call-details';
import { EditLeadDetailsPage } from '../edit-lead-details/edit-lead-details';
import { TaskDetailsPage } from '../task-details/task-details';


@IonicPage()
@Component({
  selector: 'page-leads-details',
  templateUrl: 'leads-details.html',
})
export class LeadsDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeadsDetailsPage');
  }
  edit()
  {
    this.navCtrl.push(EditLeadDetailsPage);
  }
  gotocall()
    {
      this.navCtrl.push(TaskDetailsPage);
    }
    calldetails()
    {
      this.navCtrl.push(CallDetailsPage);
    }

}
