import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-walletslist',
  templateUrl: './walletslist.page.html',
  styleUrls: ['./walletslist.page.scss'],
})
export class WalletslistPage implements OnInit {
  walletslist: any;
  walletlength: any;
  constructor(public api: ApiService,
    public extra: ExtraService,
    public navCtrl: NavController,
    public location: Location,
    public alertController: AlertController) { }

  ngOnInit() {
    this.walletslist = this.api.wallets;
    this.walletlength = this.walletslist.length
    // this.walletlist()
  }
  goback() {
    this.location.back()
  }
  walletlist() {
    this.extra.loadershow()
    let datasend = {
      "users_customers_id": localStorage.getItem('user_Id'),
    }
    this.api.sendRequest('get_wallet', datasend).subscribe((response: any) => {
      console.log(response);
      this.walletslist = response.data
      this.walletlength = this.walletslist.length
      if (response.status = 'success') {
        this.extra.hideLoader()

      } else {
        this.extra.hideLoader()
      }

    }, err => {
      this.extra.hideLoader()
    })
  }

  async presentAlert(val:any) {
    const alert = await this.alertController.create({
      header: 'Are you sure to fund your wallet?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          // handler: () => {
          //   console.log('Cancel clicked');
          // },
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
            
            this.navCtrl.navigateRoot('billingpayment',{
              queryParams: {
                // You can pass any values you want as query parameters
                key: val.users_customers_wallets_id,
                // You can add more properties here
              }
            })
          },
        },
      ],
    });

    await alert.present();
  }

  goNext() {
    this.navCtrl.navigateForward('createsawap')
  }

}
