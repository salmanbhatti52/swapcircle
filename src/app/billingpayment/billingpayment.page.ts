import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-billingpayment',
  templateUrl: './billingpayment.page.html',
  styleUrls: ['./billingpayment.page.scss'],
})
export class BillingpaymentPage implements OnInit {
  accounts: any;
  datalength: any;
  errtext: any;
  errtextshow = false;
  payment: any;
  amount: any = '';
  desc: any = '';
  recieptimage: any = '';
  validreciept: any;
  bankname: any = '';
  wallet_id: any;
  instructions: any;
  constructor(public location: Location,
    public navCtrl: NavController,
    public alertController: AlertController,
    public api: ApiService,
    public extra: ExtraService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params && params.key) {
        this.wallet_id = params.key;
        // Use the value as needed
      }
    });

  }

  ionViewWillEnter() {
    this.getaccounts()
    this.systemsettings()
  }
  getaccounts() {
    let datasend = {
      "users_customers_id": localStorage.getItem('user_Id'),
    }
    // this.api.sendRequest('all_acounts', datasend).subscribe((res: any) => {
    //   console.log('resposne====', res);
    //   if (res.status == 'success') {
    //     this.datalength = res.data.length
    //     this.accounts = res.data
    //   } else {
    //     this.errtextshow = true;
    //     this.errtext = 'No data available';
    //   }

    // })
  }

  async chooseimage() {
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

        this.recieptimage = res.dataUrl
        let picurl2 = this.recieptimage.split(',');

        this.validreciept = picurl2[1];

      })
    }
  }

  goback() {
    this.location.back()
  }

  selectpaymentmethod(ev: any) {
    console.log(ev);
    this.payment = ev.detail.value
    if (this.payment == 'Online') {
      this.navCtrl.navigateForward('payment')
    }
  }
  selectbank(ev: any) {
    console.log(ev);
    this.bankname = ev.detail.value
  }
  send() {
    if (this.validreciept == '') {
      this.extra.presentToast('please upload reciept of payemnt')
    }
    else if (this.bankname == '') {
      this.extra.presentToast('please select bank name')
    }
    else if (this.amount == '') {
      this.extra.presentToast('please enter amount')
    }
    else if (this.desc == '') {
      this.extra.presentToast('please enter some description')
    } else {
      let data = {
        "users_customers_id": localStorage.getItem('user_Id'),
        "users_customers_wallets_id": this.wallet_id,
        "bank_name": this.bankname,
        "amount": this.amount,
        "description": this.desc,
        "image": this.validreciept
      }
      this.api.sendRequest('fund_wallet_request', data).subscribe((res: any) => {
        console.log('fund response', res);
        if (res.status == 'success') {
          this.presentAlert();
        } else {
          this.extra.presentToast(res.message)
        }

      })
    }

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Payment Pending',
      message: 'Transaction will be completed once validated​',
      cssClass: 'custom-alert2',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.navCtrl.navigateRoot('home')
          },
        },
      ],
    });

    await alert.present();
  }


  systemsettings() {
    this.api.getRequest('system_settings').subscribe((res: any) => {
      console.log(res);

      res.data.map((value: any, index: any) => {
        if (
          value.type == "transfer_instructions"
        ) {
          this.instructions = value.description

        }
      });

    })
  }

}
