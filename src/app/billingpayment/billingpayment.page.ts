import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-billingpayment',
  templateUrl: './billingpayment.page.html',
  styleUrls: ['./billingpayment.page.scss'],
})
export class BillingpaymentPage implements OnInit {

  constructor(public location: Location,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  goback() {
    this.location.back()
  }
  addaccount() {
    this.navCtrl.navigateForward('addaccount')
  }

}
