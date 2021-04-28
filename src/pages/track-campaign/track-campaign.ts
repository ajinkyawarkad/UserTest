import { Component } from "@angular/core";
import { AlertController, MenuController } from "ionic-angular";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { ArchivedCampaignsDetailsPage } from "../archived-campaigns-details/archived-campaigns-details";
import { EditCampaignsDetailsPage } from "../edit-campaigns-details/edit-campaigns-details";
import { LeadsDetailsPage } from "../leads-details/leads-details";

import firebase from "firebase";
import { Counts } from "../../models/user";

import { Observable } from "rxjs";

import { LoginPage } from "../login/login";

interface Users {
  name: string;
  manager: string;
}

@IonicPage()
@Component({
  selector: "page-track-campaign",
  templateUrl: "track-campaign.html",
})
export class TrackCampaignPage {
  counts = {} as Counts;

  public anArray: any = [];
  public arr = [];
  public a;
  Segments: string;
  userInfo: any;
  products: Observable<Users[]>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController
  ) {
    this.Segments = "1";
    //this.menuCtrl.enable(true, 'menu');
  }

  ionViewDidLoad() {
    let arr: any = [];
    let currentuser = firebase.auth().currentUser;

    let a = "Ajinkya";

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL).collection('Users').doc(currentuser.uid)
      .collection("CampsAsso").get()
      .then((snap) => snap.docs.forEach((camps) => arr.push(camps.data())));
    this.products = arr;

    // firebase
    //   .firestore()
    //   .collection("Company")
    //   .doc("COM#" + currentuser.uid)
    //   .collection("Campaigns")
    //   .onSnapshot((snap) => {
    //     snap.docChanges.forEach(D =>{
    //      this.products= D.doc.data()
    //     })
    //   });

    let cu = currentuser.uid;
    let b = [];
    let d = new Date().getDate();
    let m = new Date().getMonth() + 1;
    let y = new Date().getFullYear();
    let fd = y + "-" + m + "-" + d;
    // let a = new Date(fd);
    var d1 = Date.parse(fd);
    let total;

    //==================Total Leads Vs ADMIN=================================
    // firebase
    // .firestore()
    // .collection("Company")
    // .doc(currentuser.photoURL)
    // .collection("Users")
    // .doc(currentuser.uid)
    // .get()
    // .then((doc) => {
    //   this.a = doc.data().function;
    // })

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Users")
      .doc(currentuser.uid)
      .get()
      .then((doc) => {
        this.a = doc.data().function;
        firebase
          .firestore()
          .collection("Company")
          .doc(currentuser.photoURL)
          .collection("Campaigns").where('sr_id','array-contains',currentuser.uid)
          .get() // Data Sorted SRwize===========================================================================>doc
          .then((doc) => {
            doc.docs.forEach((snap) => {  //===========Inside==>snap
              let call = [];
              let meet = [];
              this.arr.push(snap.data().cid);
              firebase
                .firestore()
                .collection("Company")
                .doc(currentuser.photoURL)
                .collection("Campaigns")
                .doc(snap.data().cid)
                .collection("leads").where('sr_id','==',currentuser.uid)
                .get()
                .then((data) => { //==================Leadds Assign ==>data
                  total=data.docs.length;
                  
                        data.docs.forEach((snap2) => {
                          console.log('AAAA',snap.data().sr_id,snap.data())
                          let action = snap2.data().action;
                          let t = Date.parse(snap2.data().datetime);
                          switch (action) {
                            case "Callback":
                              if (t < d1) {
                                call.push(t);
                              } else {
                                break;
                              }
                              break;
                            case "Schedule Meet":
                              if (t < d1) {
                                meet.push(t);
                              } else {
                                break;
                              }
                              break;
                          }
                        });
                        console.log("Inserte", snap.data().cid, meet, call);

                        firebase
                          .firestore()
                          .collection("Company")
                          .doc(currentuser.photoURL)
                          .collection("Users")
                          .doc(currentuser.uid)
                          .collection("CampsAsso")
                          .doc(snap.data().cid)
                          .update({
                            pendingCalls: call.length,
                            pendingMeets: meet.length,
                          });
                      
                  

                  console.log("Size is",total);

                  firebase
                    .firestore()
                    .collection("Company")
                    .doc(currentuser.photoURL)
                    .collection("Users")
                    .doc(currentuser.uid)
                    .collection("CampsAsso")
                    .doc(snap.data().cid)
                    .update({
                      totalLeads: total
                    });
                });
            });
          });
      });

    //================================================================
    let i;
    let n = this.arr.length;
    for (i = 0; i < n; i++) {}

    console.log("ionViewDidLoad TrackCampaignPage");
  }
  gotoActive(product) {
    this.navCtrl.push(EditCampaignsDetailsPage, {
      product: product,
    });
  }

  showPopup(value) {
    let alert = this.alertCtrl.create({
      title: "Confirm Delete",
      subTitle: "Do you really want to delete?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "OK",

          handler: (data) => {
            console.log(value);
            this.deleteItem1(value);
          },
        },
      ],
    });
    alert.present();
  }

  archive(value) {
    console.log(value);
    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid + "/" + "Campaigns" + "/" + value.cid)
      .update(
        Object.assign({
          active: false,
        })
      )
      .then(() => {
        let alert = this.alertCtrl.create({
          title: "Sucess",
          subTitle: value.name + " " + "is Archived",
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                // this.navCtrl.setRoot(ProfilePage);
              },
            },
          ],
        });
        alert.present();
      })
      .catch((err) => {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                // this.navCtrl.setRoot(ProfilePage);
              },
            },
          ],
        });
      });
  }

  active(value) {
    console.log(value);
    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid + "/" + "Campaigns" + "/" + value.cid)
      .update(
        Object.assign({
          active: true,
        })
      )
      .then(() => {
        let alert = this.alertCtrl.create({
          title: "Sucess",
          subTitle: value.name + " " + "is back to Active now",
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                // this.navCtrl.setRoot(ProfilePage);
              },
            },
          ],
        });
        alert.present();
      })
      .catch((err) => {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                // this.navCtrl.setRoot(ProfilePage);
              },
            },
          ],
        });
      });
  }

  deleteItem1(value) {
    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid + "/" + "Campaigns" + "/" + value)
      .delete();
  }

  gotoAchived() {
    this.navCtrl.push(ArchivedCampaignsDetailsPage);
  }
  leads(product) {
    this.navCtrl.push(LeadsDetailsPage, {
      product: product,
    });
  }
}
