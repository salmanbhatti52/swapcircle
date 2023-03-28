import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-createsawap',
  templateUrl: './createsawap.page.html',
  styleUrls: ['./createsawap.page.scss'],
})
export class CreatesawapPage implements OnInit {
  basecurrency: any;
  excurrency: any;
  totalamount: any;
  excahngerate: any;

  showcurr = false;
  showexccurr = false;
  currencies = [{ curr: 'Euro' }, { curr: 'Dollar' }, { curr: 'INR' }]
  walletslist: any;
  currsymbol: any;
  currID: any;
  fromcurrency: any;
  fromwalletamount: any;
  towalletamount: any;
  fromamount = false;
  Toamount = false;
  constructor(public location: Location,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.getbasecurr()
    this.walletlist()
  }




  goback() {
    this.location.back()
  }
  getbasecurr() {
    this.api.sendRequest('get_currencies_by_id', { "system_currencies_id": localStorage.getItem('systemcurr') }).subscribe((curr: any) => {
      console.log(curr);
      // this.basecurrency = curr.data[0].name + '(' + curr.data[0].code + ')'
      this.basecurrency = '(' + curr.data[0].symbol + ')' + curr.data[0].name
      this.currID = curr.data[0].system_currencies_id
      this.currsymbol = curr.data[0].symbol

    })
  }
  walletlist() {
    let datasend = {
      "users_customers_id": localStorage.getItem('user_id'),
    }
    this.api.sendRequest('get_wallet', datasend).subscribe((response: any) => {
      console.log('get_wallet=========', response);
      this.walletslist = response.data
    })
  }

  openList() {
    if (this.showcurr == true) {
      this.showcurr = false;
    } else {
      this.showcurr = true;
      this.fromamount = false;
    }
  }

  openexcList() {
    if (this.showexccurr == true) {
      this.showexccurr = false;
    } else {
      this.showexccurr = true;
      this.Toamount = false;
    }
  }
  selectcurrency(list: any, index: any) {
    console.log(list);

    this.fromcurrency = list.currency.code
    this.fromwalletamount = list.wallet_amount
    this.showcurr = false;
    this.fromamount = true;
  }

  selectexcurrency(list: any, index: any) {
    this.excurrency = list.currency.code
    this.towalletamount = list.wallet_amount
    this.showexccurr = false;
    this.Toamount = true;
  }

}
