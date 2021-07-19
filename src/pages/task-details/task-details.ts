import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Leadd, Leadref } from '../../models/user';

import firebase, { database } from 'firebase/app';
import { Storage } from '@ionic/storage';

import { AngularFirestore} from '@angular/fire/firestore';

import { uuid } from 'uuidv4';
import { Observable, Timestamp } from 'rxjs';
import * as $ from "jquery";
import { timestamp } from 'rxjs/operators';



interface Lead {
  status:string; 
  action:string;
}


@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {
  public hideMe: boolean = false;
  public hideMe1: boolean = false;
  myDate;
  value:any;
  id:any;
  data:any;
  data1:any;
  arr:any=[];
 //refid:any;
  leadref = {} as Leadref;
  leadd = {} as Leadd;
  public products: Observable<Lead[]>;
 
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, 
    public alertCtrl: AlertController,) {

      this.value = navParams.get('product');
      console.log(this.value);
      

      this.id = navParams.get('id');
      console.log("lead id",this.id);

      this.data = navParams.get('data');
      console.log("Data",this.data);

      this.data1 = navParams.get('data1');
      console.log("Data1",this.data1);


      let currentuser=firebase.auth().currentUser;
      firebase.firestore().collection('Company').doc(currentuser.photoURL+'/' +'Campaigns' +'/'+this.value.cid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: "); 
        this.products =  doc.data().status ;
        this.arr=this.products
         console.log(this.products) ;

 
    });
    
  }

  ionViewDidLoad() {

  
  }

  Getselected(selected_value)
  {
    
    
  console.log("selector: ",selected_value);
  console.log('AAAAAAAAAAAA',this.arr.length) 
  if( "Inform Manager")
  {
    console.log("Message sent")
    let currentuser = firebase.auth().currentUser
    
    firebase.firestore().collection('Company').doc("COM#"+currentuser.uid+'/' +'Campaigns' +
    '/'+this.value.cid+'/'+'leads messages'+'/'+this.id)
    .set(Object.assign({
    id: this.id,
    message:"status upated to "+selected_value+" "+"by" +" "+this.value.sr
    }
    ))
    

  }
  else
  {
    console.log("Message not send..")
  }
  }


  Task(leadd:Leadd){
    if(leadd.action && leadd.remark  != null){
    
    this.storage.get('cuid').then((val) => {
    console.log('id is', val);
    let uid = uuid();
    console.log(uid);
    let currentuser = firebase.auth().currentUser
    
    firebase.firestore().collection('Company').doc(currentuser.photoURL+'/' +'Campaigns' +'/'+this.value.cid+'/'+'leads'+'/'+this.id)
    .update(Object.assign({
    //id: uid,
    action:leadd.action,
    datetime:leadd.datetime1,
    status: leadd.selected_value,
    remark: leadd.remark
    },{merge:true}
    ))

    firebase.firestore().collection('Company').doc(currentuser.photoURL).collection('Campaigns').doc(this.value.cid).collection('leads').doc(this.id).collection('History')
    .doc('Activity1').set({
     data:firebase.firestore.FieldValue.arrayUnion({
       Time: new Date(),
       Action:leadd.action,
       Handler:currentuser.displayName,
       FollowUp:leadd.datetime1,
       Remark:leadd.remark,
       link:"https://google.com"

     }) 
    },{merge:true})
    var b = new Date().getMonth()+1;

    var c = new Date().getFullYear();
    var a = new Date().getDate();

    let date = a+'-'+b+'-'+c;
    let dat='';
    dat=date;
    
    firebase.firestore().collection('Company').doc(currentuser.photoURL).collection('Users').doc(currentuser.uid).collection('Report').
    doc(dat).set(
      {
        data:firebase.firestore.FieldValue.arrayUnion({
        Time: new Date(),
       Action:leadd.action,
      
       FollowUp:leadd.datetime1,
       Remark:leadd.remark,
       name:this.id,
       link:"https://google.com"



        })
       
      },{merge:true}
    )
    
   
    let alert = this.alertCtrl.create({ 
    title: 'Success',
    subTitle: 'Saved Successfully',
    //scope: id,
    buttons: [{text: 'OK',
    handler: data => {
    //this.navCtrl.push(UserDetailsPage);
    }
    }]
    });
    alert.present();
    
    });
    
    
    
    }else{
    
    let alert = this.alertCtrl.create({
    title: 'Warning',
    subTitle: 'Please Insert Data',
    //scope: id,
    buttons: [{text: 'OK',
    handler: data => {
    //this.navCtrl.push(LoginPage);
    }
    }]
    });
    alert.present();
    
    }
    
    }
  
  Save(leadref:Leadref){
    if(leadref.email && leadref.first_name && leadref.last_name && leadref.phone != null){
    
    this.storage.get('cuid').then((val) => {
    console.log('id is', val);
    let uid = uuid();
    console.log(uid);
    let currentuser = firebase.auth().currentUser
    
    firebase.firestore().collection('Company').doc("COM#"+currentuser.uid+'/' +'Campaigns' +'/'+this.value.cid+'/'+'Lead references'+'/'+uid)
    .set(Object.assign({
    id: uid,
    first_name:leadref.first_name,
    last_name:leadref.last_name,
    email: leadref.email,
    phone: leadref.phone,
    refId:this.id
    }
    ))
    
   
    let alert = this.alertCtrl.create({ 
    title: 'Success',
    subTitle: 'Saved Successfully',
    //scope: id,
    buttons: [{text: 'OK',
    handler: data => {
    //this.navCtrl.push(UserDetailsPage);
    }
    }]
    });
    alert.present();
    
    });
    
    
    
    }else{
    
    let alert = this.alertCtrl.create({
    title: 'Warning',
    subTitle: 'Please Insert Data',
    //scope: id,
    buttons: [{text: 'OK',
    handler: data => {
    //this.navCtrl.push(LoginPage);
    }
    }]
    });
    alert.present();
    
    }
    
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