import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-signup5',
  templateUrl: './signup5.page.html',
  styleUrls: ['./signup5.page.scss'],
})
export class Signup5Page implements OnInit {
  fname: any;
  sname: any;
  username: any;
  email: any;
  number: any;
  userdetail: any;
  user: any;

  constructor(public navCtrl: NavController,
    public extra: ExtraService) {
    console.log(this.extra.imgbaseURl);
  }

  ngOnInit() {
    if (localStorage.getItem('customertype') == 'Company') {
      this.sname == ''
    } else {
      this.sname = localStorage.getItem('sname')
    }
    this.fname = localStorage.getItem('fname')

    this.username = this.fname + this.sname
    this.number = localStorage.getItem('num')
    this.email = localStorage.getItem('email');
    this.userdetail = localStorage.getItem('userdeatil')
    console.log(this.userdetail);

    this.user = JSON.parse(this.userdetail)
  }

  goNext() {
    this.navCtrl.navigateRoot('home');
  }

}
