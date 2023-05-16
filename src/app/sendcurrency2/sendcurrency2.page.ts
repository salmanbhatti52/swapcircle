import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import * as moment from 'moment';
@Component({
  selector: 'app-sendcurrency2',
  templateUrl: './sendcurrency2.page.html',
  styleUrls: ['./sendcurrency2.page.scss'],
})
export class Sendcurrency2Page implements OnInit {
  recieverdetail: any;
  reciever: any;
  country: any;
  convertedrate: any;
  rateafterpoint: any;
  amountdetail: any;
  amount: any;
  currentdate: any;
  constructor(public location: Location,
    public navCtrl: NavController,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.recieverdetail = localStorage.getItem('recieverdetail')
    this.reciever = JSON.parse(this.recieverdetail)
    this.country = localStorage.getItem('country')

    this.amountdetail = localStorage.getItem('amountdetail')
    this.amount = JSON.parse(this.amountdetail)

    console.log(this.amount);
    const d = new Date();
    this.currentdate = moment(d).format('DD-MMM-YYYY');
  }

  goback() {
    this.location.back()
  }

  next() {
    this.extra.loadershow()
    this.api.sendRequest('transfer_currency', localStorage.getItem('transfer_currency')).subscribe((res: any) => {
      console.log('response gte', res);
      if (res.status == 'success') {
        this.extra.hideLoader()
        this.extra.presentToast('Currency transfer successfully')
        this.navCtrl.navigateForward('home')
      } else {
        this.extra.hideLoader()
        this.extra.presentToast(res.message)
      }
    }, err => {
      this.extra.hideLoader()
    })
  }

}
