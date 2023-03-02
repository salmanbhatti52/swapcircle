
import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, SwiperOptions } from 'swiper';
import { IonicSlides, IonSlides, NavController } from '@ionic/angular';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {
  @ViewChild('slides', { static: false }) slides!: IonSlides;
  tact = false;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goto() {
    this.navCtrl.navigateForward('favorite');
  }
  tabClick() {
    this.navCtrl.navigateRoot('track');
  }
  tab1Click() {
    this.navCtrl.navigateRoot('home');
  }
  tab2Click() {
    this.navCtrl.navigateRoot('offer');
  }
  tab3Click() {
    this.navCtrl.navigateRoot('connect');
  }
  tab4Click() {
    this.navCtrl.navigateRoot('profile');

  }


}
