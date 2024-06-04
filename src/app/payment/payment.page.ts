import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Flutterwave, InlinePaymentOptions, PaymentSuccessResponse } from "flutterwave-angular-v3"
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  publicKey = "FLWPUBK_TEST-1241302ae8374fcebff956e92d2fe5ae-X";

  customerDetails: any

  customizations = {
    title: "Customization Title",
    description: "Customization Description",
    logo: "https://flutterwave.com/images/logo-colored.svg",
  };

  meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };
  depositamount: any;
  constructor(public location: Location,
    public api: ApiService,
    public flutterwave: Flutterwave) {
  }

  ngOnInit() {

  }

  goback() {
    this.location.back()
  }

  ionViewWillEnter() {
    console.log('hellow');

    this.api.sendRequest('users_customers_profile', { "users_customers_id": localStorage.getItem('user_Id') }).subscribe((res: any) => {
      console.log(res);

      if (res.status == 'success') {
        this.customerDetails = {
          name: res.data.first_name,
          email: res.data.email,
          phone_number: res.data.phone
        }

      }

    })


  }

  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.flutterwave.closePaymentModal(5);
  }
  closedPaymentModal(): void {
    console.log("payment is closed");
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

}
