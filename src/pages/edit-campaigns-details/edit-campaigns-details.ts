import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-campaigns-details',
  templateUrl: 'edit-campaigns-details.html',
})
export class EditCampaignsDetailsPage {

  @ViewChild(Slides) slides: Slides;
  slideOpts;
  public form: FormGroup;
  createSuccess = false;

  constructor(private _FB   : FormBuilder,public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController) {
      this.slideOpts = {
        effect: 'flip'
      };
      this.form = this._FB.group({
        name       	  : ['', Validators.required],
        technologies     : this._FB.array([
          this.initTechnologyFields()
        ])
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCampaignsDetailsPage');
  }

  initTechnologyFields() : FormGroup
{
   return this._FB.group({  
      name : ['', Validators.required]
   });
}

  addNewInputField() : void
{
   const control = <FormArray>this.form.controls.technologies;
   control.push(this.initTechnologyFields());
}
removeInputField(i : number) : void
{
   const control = <FormArray>this.form.controls.technologies;
   control.removeAt(i);
}
manage(val : any) : void
   {
      console.dir(val);
   }
  
    ionViewDidEnter() {
      //lock manual swipe for main slider
      this.slides.lockSwipeToNext(true);
      this.slides.lockSwipeToPrev(true);
    }
  
    slideToSlide() {
      if (this.slides.getActiveIndex() + 1 === this.slides.length()) {
        this.slides.slideTo(0);
      } else {
        this.slides.lockSwipeToNext(false);
        this.slides.slideTo(this.slides.getActiveIndex() + 1);
        this.slides.lockSwipeToNext(true);
      }
    }

    slideToPrev()
   { 
      if (this.slides.getActiveIndex() + 1 == this.slides.length()) 
      {
        this.slides.lockSwipeToPrev(false);
        this.slides.slideTo(this.slides.getActiveIndex() - 1);
        this.slides.lockSwipeToPrev(true);
        
      }  
   }

   presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      message: 'Compaign Edited Successfully..',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: () => {
            console.log('Add clicked');
            
          }
        }
      ]
    });
    alert.present();
  }

}
