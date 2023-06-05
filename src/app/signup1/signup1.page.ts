import { AlertController, NavController } from '@ionic/angular';
import { ExtraService } from './../services/extra.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Countries, Country } from "./interface";
import { SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import parsePhoneNumber from 'libphonenumber-js'
@Component({
  selector: 'app-signup1',
  templateUrl: './signup1.page.html',
  styleUrls: ['./signup1.page.scss'],
})
export class Signup1Page implements OnInit {
  allItems: Array<Country> = [];
  public items: Array<Country> = [];
  safeUrl!: SafeResourceUrl;

  fname: any = '';
  sname: any = '';
  email: any = '';
  num: any = '';

  showflags = false;
  nation = false;
  flaglist = false
  flagimage: any;
  showimage = false;
  upicon = false;
  callingcode: any = '+1';
  nationality: any;
  customertype: any;
  numberhave: any;
  profileimage: any = 'assets/signup/user.svg';
  picurl1: any;
  userprofile: any;
  countrycode: any = 'US';
  validnumber: any;
  referalcode: any;

  // cameraOptions: CameraOptions = {
  //   quality: 50,
  //   allowEdit: false,
  //   correctOrientation: true,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }
  // galleryOptions: CameraOptions = {
  //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   quality: 50,
  //   allowEdit: false,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE,
  //   correctOrientation: true
  // }
  constructor(public router: Router,
    public api: ApiService,
    private http: HttpClient,
    public rest: ExtraService,
    public navCtrl: NavController,
    public alertCtrl: AlertController) { }

  ngOnInit() {
    this.customertype = localStorage.getItem('customertype')
    console.log(this.customertype);
    this.setItems();

  }

  openfflaglist() {

    if (this.upicon == false) {
      this.upicon = true;
      this.flaglist = true;
    } else {
      this.upicon = false;
      this.flaglist = false;
    }

    this.showflags = true
    // this.setItems();
  }
  setItems() {
    this.http.get('assets/countries.json').toPromise().then(
      (res: any) => {
        this.allItems = res.countries;
        this.items = this.allItems;
        console.log(this.items);

      }
    );
  }

  filterItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      val = val.toLowerCase();
      this.items = this.items.filter((item) => {
        return item.name.toLowerCase().includes(val)
          || item.nativeName.includes(val)
          || item.capital.toLowerCase().includes(val);
      });
    } else {
      this.items = this.allItems;
    }

  }
  viewDetails(item: any) {
    // console.log('code===', item.callingCodes[0])
    this.flaglist = false
    this.flagimage = item.flag
    this.showimage = true;
    this.upicon = false;
    this.nationality = item.name
    this.callingcode = '+' + item.callingCodes[0];
    console.log('code===', this.callingcode)
    this.countrycode = item.alpha2Code
  }

  updateList(ev: any) {
    console.log(ev);

    let num11 = this.num.formatInternational()
    console.log(num11);

  }
  async chooseImage() {
    const permissions = await Camera.requestPermissions();
    console.log('permissions.photos', permissions.photos);
    if (permissions.photos === 'denied' || permissions.camera === 'denied') {
      //Popover asking them to click `Allow` on the native permission dialog


    } else {
      await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      }).then(res => {

        this.profileimage = res.dataUrl
        this.picurl1 = res.dataUrl
        // console.log('image uri==', res.dataUrl);
        let picurl2 = this.picurl1.split(',');


        this.userprofile = picurl2[1];
        this.rest.imgbaseURl = this.userprofile
      })

    }


  }


  goNext() {
    const phoneNumber = parsePhoneNumber(this.num, this.countrycode)
    this.validnumber = phoneNumber!.isValid()
    console.log(this.validnumber);

    // if (this.profileimage == 'assets/signup/user.svg') {
    //   this.rest.presentToast('Profile image Required')
    // } else
    if (this.fname == '') {
      if (this.customertype == 'Individual') {
        this.rest.presentToast('First Name Required')
      } else {
        this.rest.presentToast('Company Name Required')
      }
    }
    else if (this.sname == '') {
      if (this.customertype == 'Individual') {
        this.rest.presentToast('Surname Name Required')
      } else {
        this.rest.presentToast('Representative Name Required')
      }
    }
    else if (this.num == '') {
      this.rest.presentToast('Phone Number Required')
    }
    else if (this.email == '') {
      this.rest.presentToast('Email Required')
    } else {
      if (!this.validateEmail(this.email)) {
        this.rest.presentToast('Invalid Email address')
      } else if (this.validnumber == false) {

        this.rest.presentToast("Phone number does't match with the country code")
      } else {
        localStorage.setItem('fname', this.fname);
        localStorage.setItem('sname', this.sname);
        localStorage.setItem('num', this.num);
        localStorage.setItem('email', this.email);
        localStorage.setItem('refer_code', this.referalcode)

        this.api.sendRequest('email_exist', { email: this.email }).subscribe((res: any) => {
          if (res.status == 'success') {
            this.navCtrl.navigateForward('signup2');
          } else {
            this.rest.presentToast(res.message)
          }
        })

      }

    }

  }
  goToSignin() {
    this.navCtrl.navigateForward('loginscreen');
  }







  validateEmail(email: any) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
