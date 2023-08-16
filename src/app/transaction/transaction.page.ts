import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  trans = [
    { img: '/assets/imgs/hlogo.svg', name: 'From James Anderson', time: 'Received | Wed, 8th Mar', price: '$63.98', status: 'from' },
    { img: '/assets/imgs/hlogo1.svg', name: 'To James Anderson', time: 'Transfered | Wed, 8th Mar', price: '-₦63.98', status: 'to' }
  ]
  transarr: any;
  userdetail: any;
  user: any;
  userloginId: any;
  bcurrsymbol: any;
  errortext: boolean = false;
  errorshow: any;
  constructor(public location: Location,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.userdetail = (localStorage.getItem('userdeatil'))
    console.log(this.userdetail);

    this.user = JSON.parse(this.userdetail);
    this.userloginId = this.user.users_customers_id
    this.bcurrsymbol = localStorage.getItem('basecurrsymbol')
    this.gettransaction()
  }

  goback() {
    this.location.back()
  }

  gettransaction() {
    this.api.sendRequest('all_transactions', { "users_customers_id": localStorage.getItem('user_Id') }).subscribe((resp: any) => {
      console.log('trans----', resp);
      if (resp.status == 'success') {
        this.transarr = resp.data
      }
      else {
        this.errortext = true
        this.errorshow = resp.message
      }
    })
  }

}
