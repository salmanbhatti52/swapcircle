import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-billingpayment',
  templateUrl: './billingpayment.page.html',
  styleUrls: ['./billingpayment.page.scss'],
})
export class BillingpaymentPage implements OnInit {
  accounts: any;
  datalength: any;

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
      "users_customers_id": localStorage.getItem('user_id'),
    }
    this.api.sendRequest('all_acounts', datasend).subscribe((res: any) => {
      console.log('resposne====', res);
      this.datalength = res.data.length
      this.accounts = res.data
    })
  }

  goback() {
    this.location.back()
  }
  addaccount() {
    this.navCtrl.navigateForward('addaccount')
  }

}
