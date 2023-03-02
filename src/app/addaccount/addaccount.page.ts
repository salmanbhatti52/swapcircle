import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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
  constructor(public location: Location) { }

  ngOnInit() {
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
  selectcurrency(list: any, index: any) {
    this.currency = list.curr
    this.showcurr = false;
  }

}
