import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.page.html',
  styleUrls: ['./addaccount.page.scss'],
})
export class AddaccountPage implements OnInit {
  currency: any;
  holdername: any;
  iban: any;

  showcurr = false;
  currencies = [{ curr: 'Euro' }, { curr: 'Dollar' }, { curr: 'INR' }]
  walletslist: any;
  currencyId: any;
  constructor(public location: Location,
    public api: ApiService,
    public navCtrl: NavController,
    public extra: ExtraService) { }

  ngOnInit() {
    this.walletlist()
  }

  walletlist() {
    this.extra.loadershow()
    let datasend = {
      "users_customers_id": localStorage.getItem('user_id'),
    }
    this.api.sendRequest('get_wallet', datasend).subscribe((response: any) => {
      console.log('get_wallet=========', response);
      this.extra.hideLoader()
      this.walletslist = response.data
    })
  }
  selectcurrency(list: any, index: any) {
    console.log(list);

    this.currencyId = list.currency.system_currencies_id
    this.showcurr = false;
  }

  save() {
    let data = {
      "users_customers_id": localStorage.getItem('user_id'),
      "system_currencies_id": this.currencyId,
      "full_name": this.holdername,
      "iban": this.iban
    }
    this.extra.loadershow()
    this.api.sendRequest('add_acount', data).subscribe((res: any) => {
      console.log('add account response====', res);
      if (res.status == 'success') {
        this.extra.hideLoader()
        this.extra.presentToast('Account add successfully');
        this.navCtrl.navigateForward('billingpayment')
      } else {
        this.extra.presentToast(res.message);
      }

    })
  }
  goback() {
    this.location.back()
  }
  openList() {
    if (this.showcurr == true) {
      this.showcurr = false;
    } else {
      this.showcurr = true;
    }
  }


}
