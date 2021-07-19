import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { LoginPage } from "../login/login";
import { User } from "../../models/user";
import firebase from "firebase";
import { createRendererType2 } from "@angular/core/src/view";

@IonicPage()
@Component({
  selector: 'page-userreg',
  templateUrl: 'userreg.html',
})
export class RegisterPage {
  public showPassword: boolean = false;
  user = {} as User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  signup(user: User) {
    let st = user.compId;
    let idc=[];
    idc = st.split("#");
    let compIdc= idc[1]+'#'+idc[2];
    if (user.email && user.password && user.name && user.compId != null) {
      firebase.auth()
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((data) => {
          let currentuser = firebase.auth().currentUser;
          currentuser.updateProfile({
            displayName: user.name,
            photoURL: user.compId ,
          });
          console.log(currentuser.photoURL);
          if (currentuser && data.user.emailVerified === false) {
            let s = user.compId;
            let id = [];
            id = s.split("#");
            let compId= id[1]+'#'+id[2];
            let name = [];
            name = user.name.split(' ');

            if (id[0] == "M") {
              currentuser.sendEmailVerification().then;
              {
                firebase
                  .firestore()
                  .collection("Company")
                  .doc(compIdc)
                  .collection("Admin")
                  .doc(id[2])
                  .update({
                    Managers: firebase.firestore.FieldValue.arrayUnion({
                      id: currentuser.uid,
                      name: name[0],
                      last: name[1],
                      role: "Manager",
                    }),
                  });
                firebase
                  .firestore()
                  .collection("Company")
                  .doc(compIdc)
                  .collection("Users")
                  .doc(currentuser.uid)
                  .set({
                    email: currentuser.email,
                    id: currentuser.uid,
                    name: name[0],
                    last: name[1],
                    role: "Manager",
                    function:true
                  });

                

                  firebase
                  .firestore()
                  .collection("Company")
                  .doc(compIdc)
                  .collection("non-active").where('email','==',user.email).get().then(snap =>
                    {
                      snap.docs.forEach(dat =>
                        {
                          
                         dat.ref.delete();
                        })
                    }
                    
                    )
                

                window.localStorage.setItem(
                  "emailForSignIn",
                  currentuser.email
                );
                let alert = this.alertCtrl.create({
                  title: "Success",
                  subTitle:
                    "Verification link sent to you, Please check your Inbox",
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
            } else {
              currentuser.sendEmailVerification().then;
              {
                firebase
                  .firestore()
                  .collection("Company")
                  .doc(compIdc)
                  .collection("Admin")
                  .doc(id[2])
                  .update({
                    Users: firebase.firestore.FieldValue.arrayUnion({
                      id: currentuser.uid,
                      name: name[0],
                      last: name[1],
                      role: "Sale Representative",
                    }),
                  });
                firebase
                  .firestore()
                  .collection("Company")
                  .doc(compIdc)
                  .collection("Users")
                  .doc(currentuser.uid)
                  .set({
                    email: currentuser.email,
                    id: currentuser.uid,
                    name: name[0],
                    last: name[1],
                    role: "Sale Representative",
                    function:true
                  });

                  firebase
                  .firestore()
                  .collection("Company")
                  .doc(compIdc)
                  .collection("non-active").where('email','==',user.email).get().then(snap =>
                    {
                      snap.docs.forEach(dat =>
                        {
                          
                         dat.ref.delete();
                        })
                    }
                    
                    )
                window.localStorage.setItem(
                  "emailForSignIn",
                  currentuser.email
                );
                let alert = this.alertCtrl.create({
                  title: "Success",
                  subTitle:
                    "Verification link sent to you, Please check your Inbox",
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
          }
        })
        .catch((err) => {
          console.log(err);
          let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: "Error in Creating Account " + err,
            //scope: id,
            buttons: [
              {
                text: "OK",
                handler: (data) => {
                  this.navCtrl.push(RegisterPage);
                },
              },
            ],
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
              this.navCtrl.push(RegisterPage);
            },
          },
        ],
      });
      alert.present();
    }
  }
}
