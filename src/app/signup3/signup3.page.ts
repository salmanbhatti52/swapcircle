import { ExtraService } from '../services/extra.service';
import { Signup4Page } from './../signup4/signup4.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-signup3',
  templateUrl: './signup3.page.html',
  styleUrls: ['./signup3.page.scss'],
})
export class Signup3Page implements OnInit {
  expiry: any = '';
  picurl: any;
  profileimage: any = 'assets/signup/uplload.svg';
  picurl1: any;
  userprofile: any;
  constructor(public router: Router,
    public navCtrl: NavController,
    public modal: ModalController,
    public alertCtrl: AlertController,
    public extra: ExtraService,
    public rest: ApiService) { }

  ngOnInit() { }

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
              this.picurl = picurl2[1]
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
              this.picurl = picurl2[1]
              console.log('picurlw12', this.picurl);


            })



          }
        },
      ]
    })
    await confirm.present();

  }
  goNext() {
    let datasend;
    this.extra.loadershow()
    if (localStorage.getItem('customertype') == 'Company') {
      datasend = {
        "one_signal_id": "123456",
        "users_customers_type": localStorage.getItem('customertype'),
        "company_name": localStorage.getItem('fname'),
        "first_name": localStorage.getItem('sname'),
        "last_name": ' ',
        "phone": localStorage.getItem('num'),
        "email": localStorage.getItem('email'),
        "password": localStorage.getItem('pass'),
        "account_type": "SignupWithApp",
        "location": localStorage.getItem('address'),
        "valid_document": this.picurl,
        "profile_pic": this.userprofile
      }
    } else {
      datasend = {
        "one_signal_id": localStorage.getItem('onesignalId'),
        "users_customers_type": localStorage.getItem('customertype'),
        "first_name": localStorage.getItem('fname'),
        "last_name": localStorage.getItem('sname'),
        "phone": localStorage.getItem('num'),
        "email": localStorage.getItem('email'),
        "password": localStorage.getItem('pass'),
        "account_type": "SignupWithApp",
        "location": localStorage.getItem('address'),
        "valid_document": this.picurl,
        "profile_pic": this.userprofile
      }
    }


    this.rest.sendRequest('signup', datasend).subscribe((res: any) => {
      console.log('response--', res);
      this.extra.hideLoader()
      if (res.status == 'success') {
        localStorage.setItem('userdeatil', JSON.stringify(res.data[0]));
        localStorage.setItem('user_id', res.data[0].users_customers_id);
        localStorage.setItem('status', res.data[0].status);
        this.openmodal()
      } else {
        this.extra.presentToast(res.message)
      }

    }, err => {
      console.log('error response--', err);
      this.extra.hideLoader()
    })


  }

  async openmodal() {
    const modal = await this.modal.create({
      component: Signup4Page,
      cssClass: 'Popupclass',
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log(role);

    if (role === undefined) {
      this.navCtrl.navigateForward('signup5')
    }
  }
  goToSignin() {
    this.navCtrl.navigateForward('loginscreen');
  }
}
