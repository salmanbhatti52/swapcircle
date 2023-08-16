import { ExtraService } from '../services/extra.service';
import { Signup4Page } from './../signup4/signup4.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { format } from 'date-fns';
import * as moment from 'moment';
@Component({
  selector: 'app-signup3',
  templateUrl: './signup3.page.html',
  styleUrls: ['./signup3.page.scss'],
})
export class Signup3Page implements OnInit {
  expiry: any = '';
  picurlfront: any;
  frontimage: any = 'assets/signup/uplload.svg';
  picurlback: any;
  backimage: any = 'assets/signup/uplload.svg';
  picurl1: any;
  userprofile: any;
  Id: any = '';
  show = false;
  dateValue = format(new Date(), 'yyyy-MM-dd');
  showPicker = false;
  displayDate: any = moment().format();
  datesendonapi: any;
  idchoose: any = '';
  constructor(public router: Router,
    public navCtrl: NavController,
    public modal: ModalController,
    public alertCtrl: AlertController,
    public extra: ExtraService,
    public rest: ApiService) { }

  ngOnInit() { }

  async chooseImage(type: any) {
    await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    }).then(res => {

      if (type == 'frontside') {
        this.frontimage = res.dataUrl
        this.picurl1 = res.dataUrl
        let picurl2 = this.picurl1.split(',');
        this.picurlfront = picurl2[1]
      } else {
        this.backimage = res.dataUrl
        this.picurl1 = res.dataUrl
        let picurl2 = this.picurl1.split(',');
        this.picurlback = picurl2[1]
      }
    })
    // let confirm = await this.alertCtrl.create({
    //   header: 'Upload Image',
    //   cssClass: 'camera-alert',
    //   buttons: [
    //     {
    //       text: 'Camera',
    //       handler: async () => {
    //         console.log('came inside Camera');
    //         const image = await Camera.getPhoto({
    //           quality: 75,
    //           allowEditing: false,
    //           resultType: CameraResultType.DataUrl,
    //           source: CameraSource.Camera
    //         }).then(res => {
    //           if (type == 'frontside') {
    //             this.frontimage = res.dataUrl
    //             this.picurl1 = res.dataUrl
    //             let picurl2 = this.picurl1.split(',');
    //             this.picurlfront = picurl2[1]
    //           } else {
    //             this.backimage = res.dataUrl
    //             this.picurl1 = res.dataUrl
    //             let picurl2 = this.picurl1.split(',');
    //             this.picurlback = picurl2[1]
    //           }




    //         })
    //       }
    //     },
    //     {
    //       text: 'Gallery',
    //       handler: async () => {
    //         console.log('came inside yes');

    //         const image = await Camera.getPhoto({
    //           quality: 75,
    //           allowEditing: false,
    //           resultType: CameraResultType.DataUrl,
    //           source: CameraSource.Photos,
    //         }).then(res => {
    //           if (type == 'frontside') {
    //             this.frontimage = res.dataUrl
    //             this.picurl1 = res.dataUrl
    //             let picurl2 = this.picurl1.split(',');
    //             this.picurlfront = picurl2[1]
    //           } else {
    //             this.backimage = res.dataUrl
    //             this.picurl1 = res.dataUrl
    //             let picurl2 = this.picurl1.split(',');
    //             this.picurlback = picurl2[1]
    //           }


    //         })



    //       }
    //     },
    //   ]
    // })
    // await confirm.present();

  }

  handleChange(ev: any) {
    console.log(ev);
    this.idchoose = ev
    this.show = true
  }
  goNext() {
    let datasend;
    if (this.Id == '') {
      this.extra.presentToast('ID Number Required')
    } else if (this.idchoose == '') {
      this.extra.presentToast('Choose One ID')
    }
    else if (this.expiry == '') {
      this.extra.presentToast('Select Expiry Date')
    } else {
      this.extra.loadershow()
      if (localStorage.getItem('customertype') == 'Company') {
        datasend = {
          "one_signal_id": '123',
          "id_number": this.Id,
          "users_customers_type": localStorage.getItem('customertype'),
          "company_name": localStorage.getItem('fname'),
          "first_name": localStorage.getItem('sname'),
          "last_name": ' ',
          "phone": localStorage.getItem('num'),
          "email": localStorage.getItem('email'),
          "password": localStorage.getItem('pass'),
          "account_type": "SignupWithApp",
          "location": localStorage.getItem('address'),
          "valid_document": '',
          "id_front_image": this.picurlfront,
          "id_back_image": this.picurlback,
          "date_expiry": this.datesendonapi,
          "profile_pic": this.extra.imgbaseURl,
          "refer_code_users_customers_id": localStorage.getItem('refer_code')
        }
      } else {
        datasend = {
          "one_signal_id": "123",
          "id_number": this.Id,
          "users_customers_type": localStorage.getItem('customertype'),
          "first_name": localStorage.getItem('fname'),
          "last_name": localStorage.getItem('sname'),
          "phone": localStorage.getItem('num'),
          "email": localStorage.getItem('email'),
          "password": localStorage.getItem('pass'),
          "account_type": "SignupWithApp",
          "location": localStorage.getItem('address'),
          "valid_document": '',
          "id_front_image": this.picurlfront,
          "id_back_image": this.picurlback,
          "date_expiry": this.datesendonapi,
          "profile_pic": this.extra.imgbaseURl,
          "refer_code_users_customers_id": localStorage.getItem('refer_code')
        }
      }


      this.rest.sendRequest('signup', datasend).subscribe((res: any) => {
        console.log('response--', res);
        this.extra.hideLoader()
        if (res.status == 'success') {
          localStorage.setItem('userdeatil', JSON.stringify(res.data));
          localStorage.setItem('user_Id', res.data.users_customers_id);
          localStorage.setItem('status', res.data.status);
          this.navCtrl.navigateForward('signup5')
        } else {
          this.extra.presentToast(res.message)
        }

      }, err => {
        console.log('error response--', err);
        this.extra.hideLoader()
      })
    }



  }

  DChanged(value: any) {
    console.log(value);
    this.datesendonapi = value
    this.expiry = moment(value).format('DD/MM/YYYY');
    this.showPicker = false;
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
