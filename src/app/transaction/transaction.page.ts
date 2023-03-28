import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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
  constructor(public location: Location) { }

  ngOnInit() {
  }

  goback() {
    this.location.back()
  }

}
