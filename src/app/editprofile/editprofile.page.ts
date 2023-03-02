import { ExtraService } from './../services/extra.service';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  RegisterForm: any = FormGroup;
  oldpass: any = '';
  newpass: any = '';
  confirmpass: any = '';

  picurl: any;
  profileimage: any = 'assets/imgs/userprofile.svg';
  picurl1: any;
  userprofile: any;
  validdocument: any;
  constructor(public location: Location,
    public alertCtrl: AlertController,
    public rest: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
  }

  async chooseImage() {

    let confirm = await this.alertCtrl.create({
      header: 'Upload Image',
      cssClass: 'camera-alert',
      buttons: [
        {
          text: 'Camera',
          handler: async () => {
            console.log('came inside Camera');
            const image = await Camera.getPhoto({
              quality: 75,
              allowEditing: false,
              resultType: CameraResultType.DataUrl,
              source: CameraSource.Camera
            }).then(res => {
              this.profileimage = res.dataUrl
              this.picurl = res.dataUrl
              // console.log('image uri==', res.dataUrl);
              let picurl2 = this.picurl1.split(',');
              if (localStorage.getItem('customertype') == 'Company') {
                this.validdocument = picurl2[1];
              } else {
                this.userprofile = picurl2[1];
              }

              this.updateprofile()
            })
          }
        },
        {
          text: 'Gallery',
          handler: async () => {
            console.log('came inside yes');

            const image = await Camera.getPhoto({
              quality: 75,
              allowEditing: false,
              resultType: CameraResultType.DataUrl,
              source: CameraSource.Photos,
            }).then(res => {
              this.profileimage = res.dataUrl
              this.picurl1 = res.dataUrl
              console.log('image uri==', res.dataUrl);
              let picurl2 = this.picurl1.split(',');
              this.userprofile = picurl2[1]

              if (localStorage.getItem('customertype') == 'Company') {
                this.validdocument = picurl2[1];
              } else {
                this.userprofile = picurl2[1];
              }
              this.updateprofile()

            })



          }
        },
      ]
    })
    await confirm.present();

  }

  updateprofile() {
    let datasend;
    this.extra.loadershow()
    if (localStorage.getItem('customertype') == 'Company') {
      datasend = {
        "users_customers_id": localStorage.getItem('user_id'),
        "company_name": localStorage.getItem('fname'),
        "first_name": localStorage.getItem('sname'),
        "last_name": localStorage.getItem('sname'),
        "phone": localStorage.getItem('num'),
        "email": localStorage.getItem('email'),
        "location": localStorage.getItem('address'),
        "notifications": "Yes",
        "valid_document": this.validdocument,
        "profile_pic": this.userprofile
      }
    } else {

      datasend = {
        "users_customers_id": localStorage.getItem('user_id'),
        "first_name": localStorage.getItem('fname'),
        "last_name": localStorage.getItem('sname'),
        "phone": localStorage.getItem('num'),
        "email": localStorage.getItem('email'),
        "location": localStorage.getItem('address'),
        "notifications": "Yes",
        "valid_document": this.validdocument,
        "profile_pic": this.userprofile
      }
    }


    this.rest.sendRequest('update_profile', datasend).subscribe((res: any) => {
      console.log('response--', res);
      this.extra.hideLoader()
      if (res.status == 'success') {

      } else {
        this.extra.presentToast(res.message)
      }

    }, err => {
      console.log('error response--', err);
      this.extra.hideLoader()
    })
  }
  goback() {
    this.location.back()
  }
  goNext() {
    if (this.oldpass == '') {
      this.extra.presentToast('Old password required');
    } else if (this.newpass == '') {
      this.extra.presentToast('New password required')
    }
    else if (this.confirmpass == '') {
      this.extra.presentToast('Confirm password required')
    } else {
      let datatosend = {
        "email": localStorage.getItem('email'),
        "old_password": this.oldpass,
        "password": this.newpass,
        "confirm_password": this.confirmpass
      }
      this.rest.sendRequest('change_password', datatosend).subscribe((res: any) => {
        console.log('response--', res);
        this.extra.hideLoader()
        if (res.status == 'success') {

        } else {
          this.extra.presentToast(res.message)
        }

      }, err => {
        console.log('error response--', err);
        this.extra.hideLoader()
      })
    }
  }

}
