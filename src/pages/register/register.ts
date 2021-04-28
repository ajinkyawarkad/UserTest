import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import firebase from 'firebase'
import { createRendererType2 } from '@angular/core/src/view';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public showPassword: boolean = false;
  user = {} as User;


  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signup(user:User){
  
  
    if(user.email && user.password && user.name && user.compId != null){
      firebase.auth().createUserWithEmailAndPassword(user.email,user.password).then((data) => {
        let currentuser=firebase.auth().currentUser;
        currentuser.updateProfile({
          displayName: user.name,
          photoURL: user.compId ,  
        })
       console.log(currentuser.photoURL);
         if(currentuser && data.user.emailVerified === false)
         {
          let s= user.compId;
          let id=[];
          id=s.split("#")
           currentuser.sendEmailVerification().then
             {
               firebase.firestore().collection('Company').doc(user.compId).collection('Admin').doc(id[1]).update({
                 Users:firebase.firestore.FieldValue.arrayUnion({
                   id:currentuser.uid,
                   name:user.name,
                   last:'',
                   role:'Sale Representative',
                  })
               })
               firebase.firestore().collection('Company').doc(user.compId).collection('Users').doc(currentuser.uid).set({
                 email:currentuser.email,
                 id:currentuser.uid,
                 name:user.name,
                 role:'Sale Representative'
                
              })
              window.localStorage.setItem('emailForSignIn', currentuser.email);
              let alert = this.alertCtrl.create({
               title: 'Success',
               subTitle: 'Verification link sent to you, Please check your Inbox',
               //scope: id,
               buttons: [{text: 'OK',
                         handler: data => {
                          this.navCtrl.push(LoginPage);
                         } 
                       }]
                     });
             alert.present();
             }    
         } 
         
         
       }).catch((err) => {
         console.log(err); 
         let alert = this.alertCtrl.create({
           title: 'Error',
           subTitle: 'Error in Creating Account ' + err ,
           //scope: id,
           buttons: [{text: 'OK',
                     handler: data => {
                      this.navCtrl.push(RegisterPage);
                     } 
                   }]
                 });
         alert.present();
       });
  
  
    }else{
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Enter your Details',
        //scope: id,
        buttons: [{text: 'OK',
                  handler: data => {
                   this.navCtrl.push(RegisterPage);
                  } 
                }]
              });
      alert.present();
    }
    
   }
 

}
