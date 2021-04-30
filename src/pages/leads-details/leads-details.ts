import { Component } from "@angular/core";
import firebase from "firebase";
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
}
from "ionic-angular";
import { CallDetailsPage } from "../call-details/call-details";
import { EditLeadDetailsPage } from "../edit-lead-details/edit-lead-details";
import { TaskDetailsPage } from "../task-details/task-details";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Lead } from "../../models/user";
import * as $ from "jquery";

interface Users {
  name: string;
  manager: string;
}

@IonicPage()
@Component({
  selector: "page-leads-details",
  templateUrl: "leads-details.html",
})
export class LeadsDetailsPage {
  p: number = 1;
  public hideMe: boolean = false;
  public hideMe1: boolean = false;
  public hideMe2: boolean = false;

  pageSize: number = 3;
  last;
  public first: any = [];
  public prev_strt_at: any = [];
  public pagination_clicked_count = 0;
  public disable_next: boolean = false;
  public disable_prev: boolean = false;
  public itemnumberbypage = 0;

  value: any;
  userInfo: any;
  products: Observable<Users[]>;
  // productss: Observable<Users[]>;
  productsss: any = [];
  prod: any = [];
  public anArray: any = [];
  public det: any = [];
  public hed = [];
  public array = [];
  public leaduid: any;
  public campid: any;
  isItemAvailable = false;

  lead = {} as Lead;
  isIndeterminate: boolean;
  masterCheck: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    
    public alertCtrl: AlertController
  ) {
    this.value = navParams.get("product");
    console.log(this.value);
    this.campid = this.value.cid;
  }

  hide() {
    this.hideMe = true;
  }
  hide1() {
    this.hideMe1 = true;
  }
  hide2() {
    this.hideMe2 = !this.hideMe2;
  }
 
  insertsr(data) {
    console.log("i", data.id);
    console.log("i", data.name);
    let currentuser = firebase.auth().currentUser;
    let i, j;
    for (i = 0; i < this.array.length; i++) {
      firebase
        .firestore()
        .collection("Company")
        .doc("COM#" + currentuser.uid)
        .collection("Campaigns")
        .doc(this.value.cid)
        .collection("leads")
        .doc(this.array[i])
        .update({
          sr_id: data.id,
          sr_name: data.name + " " + data.last,
        });
    }
    let alert = this.alertCtrl.create({
      title: "Success",
      subTitle: "added",
      //scope: id,
      buttons: [{ text: "OK", handler: (data) => {} }],
    });
    alert.present();

    // console.log(lead.sr)
  }

  getItems(ev) {
    //   let currentuser=firebase.auth().currentUser;
    //   firebase.firestore().collection('Company').doc("COM#"+currentuser.uid).collection('Campaigns')
    // .doc(this.value.cid).collection('leads').get().then((snaps) =>{
    // snaps.docs.forEach(doc =>{
    //     this.hed.push(doc.data());
    //     var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //     console.log(source, " data: " );
    //     this.prod=this.hed;
    //     console.log('HHHHHHH',this.prod);

    // })
    //  })

    var val = ev.target.value;
    if (val && val.trim() != "") {
      this.prod = this.prod.filter((item) => {
        return (
          item.leads[0].action.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad LeadsDetailsPage", this.value.cid);
    let currentuser = firebase.auth().currentUser;
    $(document).on("change", "table thead input", function () {
      var checked = $(this).is(":checked");

      var index = $(this).parent().index();
      $("table  tr").each(function () {
        if (checked) {
          $(this).find("td").eq(index).show();
          $(this).find("th").eq(index).show();
        } else {
          $(this).find("td").eq(index).hide();
          $(this).find("th").eq(index).hide();
        }
      });
    });

    

    
    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value.cid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        // console.log(source, " data: ");
        this.products = doc.data().CSVfield;
        //this.proStatus = doc.data().status;
        console.log(this.products) ;
      });

    // this.userInfo = firebase.firestore()
    //   .collection("Company")
    //   .doc(currentuser.photoURL)
    //   .collection("Admin")
    //   .doc(currentuser.uid);
    // this.productss = this.userInfo.valueChanges().Users;

    // firebase
    //   .firestore()
    //   .collection("Company")
    //   .doc(currentuser.photoURL)
    //   .collection("Admin")
    //   .doc(currentuser.uid)
    //   .onSnapshot((doc) => {
    //     var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //     console.log(source, " data: ");
    //     this.productss = doc.data().Users;
    //     console.log(this.productss);
    //   });

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      .limit(this.pageSize)
      .get()
      .then((snaps) => {
        if (!snaps.docs.length) {
          console.log("No Data Available");
          return false;
        }
        snaps.docs.forEach((doc) => {
          this.hed.push(doc.data());
          var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          console.log(source, " data: ");
          this.productsss = this.hed;
          console.log("HHHHHHH", this.productsss);

          this.last = doc;
          this.first = doc;
          console.log("last", this.last);
        });
      });
    this.prev_strt_at = [];
    this.pagination_clicked_count = 0;
    this.disable_next = false;
    this.disable_prev = false;
    this.itemnumberbypage = 1;

    //Push first item to use for Previous action
    //this.push_prev_startAt(this.first);

    console.log("ionViewDidLoad TrackCampaignPage");
  }//=======================

  nextPage(last) {
    this.productsss.length = 0;
    this.disable_next = true;
    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      .startAfter(last)
      .limit(this.pageSize)
      .get()
      .then((snaps) => {
        if (!snaps.docs.length) {
          console.log("No Data Available");
          alert("No More Data");
          return false;
        }
        snaps.docs.forEach(
          (doc) => {
            this.hed.push(doc.data());
            var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            console.log(source, " data: ");

            this.productsss = this.hed;
            console.log("nxt", this.productsss);

            this.last = doc;
            this.first = doc;

            //console.log("first",this.push_prev_startAt)
            this.disable_next = false;
          },
          (error) => {
            this.disable_next = false;
          }
        );
        this.pagination_clicked_count++;
        this.itemnumberbypage * this.pagination_clicked_count;
      });
  }

  prevPage(first) {
    this.productsss.length = 0;
    // this.productsss.push(this.first)
    this.disable_prev = true;

    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      .endBefore(first)
      .limit(this.pageSize)
      .get()
      .then((snaps) => {
        if (!snaps.docs.length) {
          console.log("No Data Available");
          alert("No More Data");
          return false;
        }
        snaps.docs.forEach(
          (doc) => {
            this.hed.push(doc.data());

            var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            console.log(source, " data: ");

            this.productsss = this.hed;
            console.log("prev", this.productsss);
            this.last = doc;
            this.first = doc;

            //Enable buttons again
            this.disable_prev = false;
            this.disable_next = false;
          },
          (error) => {
            this.disable_prev = false;
          }
        );
        this.pagination_clicked_count--;
        this.itemnumberbypage / this.pagination_clicked_count;
      });
  }
  edit(product) {
    console.log("edit", product);
    this.navCtrl.push(EditLeadDetailsPage, {
      product: product,
      campid: this.campid,
      //proStatus:this.proStatus
    });
  }
  add() {
    // this.navCtrl.push(LeadInTrackCampPage, {
    //   product: this.value,
    // });
  }
  gotocall(id) {
    console.log(id);
    this.navCtrl.push(TaskDetailsPage, {
      product: this.value,
      id,
    });
  }
  calldetails() {
    this.navCtrl.push(CallDetailsPage);
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

  deleteItem1(value1) {
    let currentuser = firebase.auth().currentUser;
    firebase.firestore()
      .collection("Company")
      .doc(
        "COM#" +
          currentuser.uid +
          "/" +
          "Campaigns" +
          "/" +
          this.value.cid +
          "/" +
          "leads" +
          "/" +
          value1
      )
      .delete();
  }
}
