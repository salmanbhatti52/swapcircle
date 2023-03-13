import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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

  openexcList() {
    if (this.showexccurr == true) {
      this.showexccurr = false;
    } else {
      this.showexccurr = true;
    }
  }
  selectcurrency(list: any, index: any) {
    this.basecurrency = list.curr
    this.showcurr = false;
  }

  selectexcurrency(list: any, index: any) {
    this.excurrency = list.curr
    this.showexccurr = false;
  }

}
