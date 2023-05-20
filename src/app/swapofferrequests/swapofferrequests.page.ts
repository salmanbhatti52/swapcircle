import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { log } from 'console';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-swapofferrequests',
  templateUrl: './swapofferrequests.page.html',
  styleUrls: ['./swapofferrequests.page.scss'],
})
export class SwapofferrequestsPage implements OnInit {
  swap_offers_id: any;
  reqarr: any;
  swap_offers_obj: any;
  isModalOpen = false;
  from_currency_symbol: any;
  to_currency_symbol: any;
  exchange_rate: any;
  from_amount: any;
  convertedamt: any;
  currID: any;
  basecurrID: any;
  baseamt: any;
  currsymbol: any;
  constructor(public activated: ActivatedRoute,
    public navCtrl: NavController,
    public location: Location,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.swap_offers_obj = JSON.parse(this.activated.snapshot.params['swap_offers_obj'])
    console.log(this.swap_offers_obj);
    this.swap_offers_id = this.swap_offers_obj.swap_offers_id
    this.getbasecurr()
    this.getrequests(this.swap_offers_id)
  }
  goback() {
    this.location.back()
  }
  getbasecurr() {
    this.api.sendRequest('get_currencies_by_id', { "system_currencies_id": localStorage.getItem('systemcurr') }).subscribe((curr: any) => {
      console.log(curr);

      this.basecurrID = curr.data[0].system_currencies_id
      this.currsymbol = curr.data[0].symbol
      localStorage.setItem('basecurrsymbol', this.currsymbol)
    })
  }
  getrequests(swap_offers_id: any) {
    let datasend = {
      "swap_offers_id": swap_offers_id
    }
    this.extra.loadershow()
    this.api.sendRequest('user_swap_offers_requests', datasend).subscribe((p: any) => {
      console.log(p);
      this.extra.hideLoader()
      if (p.status == 'success') {
        this.reqarr = p.data
      } else {
        this.extra.presentToast(p.message)
      }


    }, err => {
      this.extra.presentToast('Something went wrong');
      this.extra.hideLoader()
    })
  }


  acceptrequest(isOpen: boolean, f: any) {
    this.isModalOpen = isOpen;
    console.log(this.isModalOpen);

    console.log(f)
    this.swap_offers_id = this.swap_offers_obj.swap_offers_id
    this.from_currency_symbol = this.swap_offers_obj.from_currency.symbol;
    this.to_currency_symbol = this.swap_offers_obj.to_currency.symbol
    this.exchange_rate = this.swap_offers_obj.exchange_rate
    this.from_amount = this.swap_offers_obj.from_amount
    this.convertedamt = this.swap_offers_obj.to_amount
    this.currID = this.swap_offers_obj.from_currency.system_currencies_id

    this.exchangerate()

  }
  exchangerate() {
    let datasend = {
      "sender_currency_id": this.currID,
      "receiver_currency_id": this.basecurrID,
      "from_amount": this.from_amount
    }

    this.api.sendRequest('currency_converter', datasend).subscribe((p: any) => {
      console.log(p);
      let base_amt = p.data.converted_amount
      this.baseamt = base_amt.toFixed(2)
    })




  }
  setClose(isOpen: any, user: any) {
    this.isModalOpen = isOpen;
    let datasend = {
      "swap_offers_requests_id": user.swap_offers_requests_id,
      "swap_offers_id": user.swap_offers_id,
      "from_users_customers_id": user.from_users_customers_id
    }

    this.api.sendRequest('swap_offer_request_approve', datasend).subscribe((p: any) => {
      console.log(p);
      if (p.status == 'success') {
        this.extra.presentToast('Request accept successfully');
        this.navCtrl.navigateForward('offer')
      }
    })
  }

  async onWillDismiss(f: any) {
    // console.log(f);
    if (f.detail.role == 'backdrop') {
      this.isModalOpen = false
    }

  }
  chat(user: any) {
    console.log(user);

    let data = {
      "requestType": "startChat",
      "users_customers_id": localStorage.getItem('user_id'),
      "other_users_customers_id": user.user_data.users_customers_id
    }
    this.api.sendRequest('user_chat', data).subscribe((res: any) => {
      console.log('res---for check start chat', res);
      if (res.status == 'success') {
        this.navCtrl.navigateForward(['chatdetail', {
          otheruserid: user.user_data.users_customers_id,
          otherusername: user.user_data.first_name

        }])
      } else {
        this.extra.presentToast(res.message)
      }
    })

  }

  remove(item: any, index: any) {
    console.log(item);

    let data = {
      "swap_offers_requests_id": item.swap_offers_requests_id
    }
    this.api.sendRequest('swap_offer_request_reject', data).subscribe((rem: any) => {
      console.log('remove request====', rem);
      if (rem.status == 'success') {
        this.reqarr.splice(index, 1)
      }
    })
  }

  handleImgError(ev: any) {
    const source = ev.srcElement;
    const imgSrc = `assets/imgs/placeholder.jpg`;
    source.src = imgSrc;
  }

}
