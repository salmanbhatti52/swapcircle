import { Injectable } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  toast: any;
  imgbaseURl: any;
  role: any;
  data: any;
  sessionExpiryTime:any;
  sessionTimer:any;
  alertTimer:any;
  btnshow = false;
  sessionAlert: HTMLIonAlertElement | undefined;
  constructor(public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public navCtrl:NavController) { }


  async presentToast(message: any) {

    this.toast = true;
    return await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    }).then(a => {

      a.present().then(() => {
        console.log('presented');
        if (!this.toast) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });

    });
  }

  async loadershow(content?: string) {

    this.loadingCtrl.create({
      cssClass: 'loadingdiv',
      message: '',
      duration: 3000
    }).then((res) => {
      res.present();
    });

  }

  async loadershowContinuous(content?: string) {

    this.loadingCtrl.create({
      cssClass: 'loadingdiv',
      message: '',
      // duration: 3000
    }).then((res) => {
      res.present();
    });

  }

  hideLoader() {

    this.loadingCtrl.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }

  async presentalert(message: any) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {

          },
        },
      ],
    });

    await alert.present();
    this.data = await alert.onDidDismiss();

  }

  startSessionTimer(){
    console.log('inside startSessionTimer()');
    console.log("expiryTimeInMins: ",this.sessionExpiryTime);
    
    let sessionTimeout = this.sessionExpiryTime * 60 * 1000;
    let alertTimeout = (this.sessionExpiryTime - 1) * 60 * 1000;

    this.sessionTimer = setTimeout(() => {
      this.dismissSession();
    }, sessionTimeout);

    this.alertTimer = setTimeout(() => {
      this.showSessionDismissAlert();  
    }, alertTimeout);
  }  

  async showSessionDismissAlert(){
    this.sessionAlert  = await this.alertController.create({
      header: 'Session Expiring Soon',
      message: 'Your session will expire in 1 minute. Do you need more time?',
      cssClass: 'custom-alert',

      buttons:[
        {
          text:'OK',
          role: 'cancel'
        },
        {
          text:'Extend Session',
          handler:()=>{
            this.sessionExpiryTime = 5
            this.resetSessionTimer();
          }
        }
      ]
    });
    
    await this.sessionAlert.present();
  }

  async dismissSession(){
    console.log('inside dismissSession()');
    
    localStorage.removeItem('user_Id');
    this.btnshow = false;
    localStorage.removeItem('sessionTimer');
    if(this.sessionAlert){
      await this.sessionAlert.dismiss();
    }
    this.sessionExpiryTime = null;
    this.clearTimer();
    this.navCtrl.navigateRoot('loginscreen')
  }

  clearTimer(){
    console.log('clearing the timer');
    console.log('timer: ',this.sessionTimer);
    
    if(this.sessionTimer){
      clearTimeout(this.sessionTimer);
    }
    if(this.alertTimer){
      clearTimeout(this.alertTimer);
    }
  }

  resetSessionTimer(){
    console.log('clearing previous timer and setting a new timer');
    this.presentToast(`Your session is extended for ${this.sessionExpiryTime} minutes.`)
    this.clearTimer();
    this.startSessionTimer();
  }
}
