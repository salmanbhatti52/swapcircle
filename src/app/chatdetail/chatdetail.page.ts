import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatdetail',
  templateUrl: './chatdetail.page.html',
  styleUrls: ['./chatdetail.page.scss'],
})
export class ChatdetailPage implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back()
  }
}
