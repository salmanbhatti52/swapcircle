import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  show = false;
  show1 = false;
  constructor(public location: Location) { }

  ngOnInit() {
  }

  openclose() {
    if (this.show == false) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  openclose1() {
    if (this.show1 == false) {
      this.show1 = true;
    } else {
      this.show1 = false;
    }
  }

  goback() {
    this.location.back()
  }

}
