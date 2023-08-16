import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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
  amount: any;
  desc: any;
  recieptimage: any = '';
  validreciept: any;
  constructor(public location: Location,
    public navCtrl: NavController,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getaccounts()
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
  }
  send() {

  }

}
