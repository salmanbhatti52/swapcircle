import { ApiService } from './../services/api.service';
import { ExtraService } from './../services/extra.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import OneSignal from 'onesignal-cordova-plugin';
@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {
  @ViewChild('mySegment', { read: ElementRef })
  private mySegment!: ElementRef;
  requestsType: any;
  email: any;
  pass1: any;
  showPass = false;
  showcPass = false;
  fingerprint = false;
  getuserEmail: any;
  getuserPassword: any;
  oneSignalId: any;
  oneSignalSubscriptionId: any;
  constructor(public navCtrl: NavController,
    public rest: ExtraService,
    public api: ApiService,
    public faio: FingerprintAIO,
    public platform:Platform) { }

  ngOnInit() {
    // setTimeout(async () => {
      // await 
      
    //  }, 3000);
  }

  async ionViewWillEnter() {
    if(this.platform.is('cordova')){
     await this.getOneSignalUserAndExternalIds();
    }

    if (this.requestsType) {
      if (this.requestsType === 'Individual') {
        this.mySegment.nativeElement.children[0].click();

      }
      if (this.requestsType === 'Corporate') {
        this.mySegment.nativeElement.children[1].click();

      }
    } else {
      this.requestsType = 'Individual';
      this.mySegment.nativeElement.children[0].click();

    }
    //////////////////
    if (localStorage.getItem('fingerprint') == 'true') {
      this.fingerprint = true;
    } else {
      this.fingerprint = false;
    }
    this.getuserEmail = localStorage.getItem('email');
    this.getuserPassword = localStorage.getItem('password');
    console.log('email', localStorage.getItem('email'));
    console.log('password', localStorage.getItem('password'));
  }

  async getOneSignalUserAndExternalIds() {
    
    // Fetch OneSignal ID (Player ID)
     this.oneSignalId = await OneSignal.User.getOnesignalId();
    if (this.oneSignalId) {
      console.log('OneSignal ID (User ID):', this.oneSignalId);
    } else {
      console.log('OneSignal ID is null. Ensure the user is subscribed.');
    }

    // Fetch External ID (if set)
    // const externalId = await OneSignal.User.getExternalId();
    // if (externalId) {
    //   console.log('External ID:', externalId);
    // } else {
    //   console.log('External ID is null. Ensure it has been set.');
    // }

    this.oneSignalSubscriptionId = await  OneSignal.User.pushSubscription.getIdAsync();
    console.log("subscription id: ",this.oneSignalSubscriptionId);
    
  }

  segmentChanged(ev: any) {
    console.log('requestType value', ev.detail.value);
    let data = ev.detail.value;
    this.requestsType = data
    if (ev.detail.value === 'Individual') {
      this.requestsType = 'Individual';

    }
    if (ev.detail.value === 'Corporate') {
      this.requestsType = 'Company';

    }
    localStorage.setItem('requestType', this.requestsType);
  }

  forgot() {
    this.navCtrl.navigateForward('forgot');
  }

  goNext() {
    let data = {
      "one_signal_id": this.oneSignalSubscriptionId ,
      "email": this.email,
      "password": this.pass1
    }
    console.log("login data: ",data);
    
    if (this.email == '') {
      this.rest.presentToast('Email is Required')
    } else if (this.pass1 == '') {
      this.rest.presentToast('Password is Required')
    } else {
      this.rest.loadershow();
      this.api.sendRequest('signin', data).subscribe((res: any) => {
        this.rest.hideLoader();
        console.log('response--', res);
        if (res.status == 'success') {
          if(res.data.users_customers_type == this.requestsType){
            localStorage.setItem('userdeatil', JSON.stringify(res.data))
            localStorage.setItem('user_Id', res.data.users_customers_id);
            // if(localStorage.getItem('sessionTimer')!= null || localStorage.getItem('sessionTimer')!= undefined){
            //   localStorage.removeItem('sessionTimer');
            // }
            // if(this.platform.is('cordova')){
            //   OneSignal.login(res.data.users_customers_id);
            // }
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('password', this.pass1);
            this.navCtrl.navigateRoot('home');
          }else{
            this.rest.presentToast('Please select the correct user type for login');
          }
          
        } else {
          this.rest.presentToast(res.message)
        }

      }, err => {
        this.rest.hideLoader()
      })

    }

  }
  
  async fflogin() {
    this.faio.isAvailable().then(
      () => {
        this.faio
          .show({
            cancelButtonTitle: 'Cancel',
            description: 'Sign in with biometrics',
            disableBackup: true,
            // title: 'Scanner Title',
            fallbackButtonTitle: 'FB Back Button',
            // subtitle: 'This SubTitle'
          })
          .then(
            (result: any) => {
              console.log(result);
              let data = {
                "one_signal_id": this.oneSignalSubscriptionId,
                "email": this.getuserEmail,
                "password": this.getuserPassword
              }
              this.api.sendRequest('signin', data).subscribe((res: any) => {
                console.log('response--', res);
                if (res.status == 'success') {
                  this.rest.hideLoader()
                  localStorage.setItem('userdeatil', JSON.stringify(res.data))
                  localStorage.setItem('user_Id', res.data.users_customers_id);
                  // if(localStorage.getItem('sessionTimer')!= null || localStorage.getItem('sessionTimer')!= undefined){
                  //   localStorage.removeItem('sessionTimer');
                  // }
                  // if(this.platform.is('cordova')){
                  //   OneSignal.login(res.data.users_customers_id);
                  // }
                  this.navCtrl.navigateRoot('home');
                } else {
                  this.rest.hideLoader()
                  this.rest.presentToast(res.message)
                }

              }, err => {
                this.rest.hideLoader()
              })
            },
            (err: any) => {
              this.rest.presentToast(err.message);
            }
          );
      },
      (err: any) => {
        this.rest.presentToast('No Fingerprint found on your device.');
      }
    );
  }

  togglePass() {
    this.showPass = !this.showPass;
  }



  goback() {
    this.navCtrl.navigateRoot('getstart');
  }
}
