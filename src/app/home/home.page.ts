import { Component, ViewChild, ElementRef } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, SwiperOptions } from 'swiper';
import { IonicSlides, IonSlides, NavController } from '@ionic/angular';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('slides', { static: false }) slides!: IonSlides;

  @ViewChild('mySegment', { read: ElementRef })
  private mySegment!: ElementRef;

  requestsType: any;
  t1 = true;
  t2 = false;
  t3 = false;
  t4 = false;
  tact = false;

  trans = [
    { img: '/assets/imgs/hlogo.svg', name: 'From James Anderson', time: 'Swap - 2:26pm', price: '$63.98', status: 'from' },
    { img: '/assets/imgs/hlogo1.svg', name: 'To James Anderson', time: 'Swap - 2:26pm', price: '-₦63.98', status: 'to' },
    { img: '/assets/imgs/hlogo2.svg', name: 'Wallet Top-Up', time: '2:26pm', price: '$63.98', status: 'from' },
  ]
  trans1 = [
    { img: '/assets/imgs/hlogo.svg', name: 'From James Anderson', time: 'Swap - 2:26pm', price: '$63.98', status: 'from' },
    { img: '/assets/imgs/hlogo1.svg', name: 'To James Anderson', time: 'Swap - 2:26pm', price: '-₦63.98', status: 'to' }
  ]
  userdetail: any;
  user: any;
  constructor(public navCtrl: NavController) {
    this.userdetail = localStorage.getItem('userdeatil')
    console.log(this.userdetail);

    this.user = JSON.parse(this.userdetail)
  }


  ionViewWillEnter() {
    if (this.requestsType) {
      if (this.requestsType === 'AllTransactions') {
        this.mySegment.nativeElement.children[0].click();

      }
      if (this.requestsType === 'HotSwapOffers') {
        this.mySegment.nativeElement.children[1].click();

      }
    } else {
      this.requestsType = 'AllTransactions';
      this.mySegment.nativeElement.children[0].click();

    }
  }
  segmentChanged(ev: any) {
    console.log('requestType value', ev.detail.value);
    let data = ev.detail.value;
    this.requestsType = data
    if (ev.detail.value === 'AllTransactions') {
      this.requestsType = 'AllTransactions';

    }
    if (ev.detail.value === 'HotSwapOffers') {
      this.requestsType = 'HotSwapOffers';

    }
    if (ev.detail.value === 'RateTable') {
      this.requestsType = 'RateTable';

    }
    localStorage.setItem('requestType', this.requestsType);
  }


  goNext() {
    this.navCtrl.navigateForward('createsawap')
  }
  noti() {
    this.navCtrl.navigateForward('notification');
  }
  chat() {
    this.navCtrl.navigateForward('chat');
  }
  tabClick() {
    this.navCtrl.navigateRoot('track');
  }
  tab1Click() {

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

  tab5Click() { }
}
