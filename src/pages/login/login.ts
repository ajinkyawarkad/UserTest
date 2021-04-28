import { Component } from '@angular/core';
import { IonicPage,  MenuController, NavController, NavParams,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  public showPassword: boolean = false;
  user = {} as User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  login(user: User) {
    if (user.email && user.password != null) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((user) => {
          let currentuser = firebase.auth().currentUser;
          let s= currentuser.photoURL;
          let id=[];
          id=s.split("#")
          console.log(id)
          
          firebase.auth().onAuthStateChanged((data) => {
            if (
              currentuser.photoURL &&
              currentuser &&
              data.emailVerified === true
            ) {
              
              console.log(currentuser.displayName);
              console.log(currentuser.photoURL);
              this.storage.set("name", currentuser.displayName);
              this.storage.set("email", currentuser.email);
              this.storage.set("cuid", currentuser.photoURL);
              this.storage.set("adminId",id[1])
              console.log("Email is verified");
              console.log(data);
              
              this.navCtrl.setRoot(HomePage);
            } else {
              console.log("Email is not verified ");
              // this.navCtrl.setRoot(LoginPage);
              let alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "Email not verified please check your inbox",
                buttons: [
                  {
                    text: "OK",
                    handler: (data) => {
                      this.navCtrl.setRoot(LoginPage);
                    },
                  },
                ],
              });
              alert.present();
            }
          });
        })
        .catch((err) => {
          console.log(err);
          let alert = this.alertCtrl.create({
            //title: 'Error',
            subTitle: err,
            buttons: [{ text: "OK", handler: (data) => {} }],
          });
          alert.present();
        });
    } else {
      let alert = this.alertCtrl.create({
        title: "Warning",
        subTitle: "Enter your Details",
        //scope: id,
        buttons: [
          {
            text: "OK",
            handler: (data) => {
              this.navCtrl.push(LoginPage);
            },
          },
        ],
      });
      alert.present();
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
}
