import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {
  public hideMe: boolean = false;
  public hideMe1: boolean = false;
  myDate;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailsPage');
  }
  hide() {
    this.hideMe = !this.hideMe;
  }
  hide1() {
    this.hideMe1 = !this.hideMe1;
  }
  StartTask()
  {
    this.navCtrl.pop();
  }
  change(datePicker){
    console.log("date",this.myDate);
    console.log("datePicker",datePicker);
    datePicker.open();
  }
  ab()
  {
    console.log("date");
  }
  
 
}
