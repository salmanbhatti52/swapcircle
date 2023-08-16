import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-createwallet',
  templateUrl: './createwallet.page.html',
  styleUrls: ['./createwallet.page.scss'],
})
export class CreatewalletPage implements OnInit {
  basecurrency: any;
  excurrency: any;
  showcurr = false;
  showexccurr = false;
  currencies = [{ curr: 'Euro' }, { curr: 'Dollar' }, { curr: 'INR' }]
  exchangecurr: any;
  currencyID: any;
  constructor(public location: Location,
    public api: ApiService,
    public extra: ExtraService,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.getcurrencies()
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

  openexcList() {
    if (this.showexccurr == true) {
      this.showexccurr = false;
    } else {
      this.showexccurr = true;
    }
  }
  onSearch(searchTerm: any) {
    // Perform your logic here with the search term
    console.log('Search term:', searchTerm);
    this.showexccurr = true;
  }
  selectcurrency(list: any, index: any) {
    this.basecurrency = list.curr
    this.showcurr = false;
  }

  selectexcurrency(list: any, index: any) {
    this.excurrency = list.code
    this.currencyID = list.system_currencies_id
    this.showexccurr = false;
  }

  getcurrencies() {
    this.api.getRequest('all_currencies').subscribe((res: any) => {
      console.log(res);
      this.exchangecurr = res.data
      this.exchangecurr.sort((a: any, b: any) => a.name.localeCompare(b.name))

      // console.log(this.exchangecurr);

    })
  }

  save() {
    let datasend = {
      "users_customers_id": localStorage.getItem('user_Id'),
      "system_currencies_id": this.currencyID
    }
    this.api.sendRequest('create_wallet', datasend).subscribe((response: any) => {
      console.log(response);
      if (response.status == "success") {
        this.extra.presentToast('Wallet create successfully')
        this.navCtrl.navigateRoot('home')
      }

    })
  }

}
