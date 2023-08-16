import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  toast: any;
  imgbaseURl: any;
  role: any;
  data: any;

  btnshow = false;
  constructor(public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertController: AlertController) { }

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
      // duration: 2000
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
}
