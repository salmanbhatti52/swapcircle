import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  @ViewChild('mySegment', { read: ElementRef })
  private mySegment!: ElementRef;
  requestsType: any;
  tact = false;
  title: any;
  reference = '';
  constructor(public navCtrl: NavController) { }

  ionViewWillEnter() {
    if (this.requestsType) {
      if (this.requestsType === 'AllOffers') {
        this.mySegment.nativeElement.children[0].click();

      }
      if (this.requestsType === 'Favorite') {
        this.mySegment.nativeElement.children[1].click();

      }
      if (this.requestsType === 'MyOffers') {
        this.mySegment.nativeElement.children[1].click();

      }
    } else {
      this.requestsType = 'AllOffers';
      this.mySegment.nativeElement.children[0].click();

    }
  }
  segmentChanged(ev: any) {
    console.log('requestType value', ev.detail.value);
    let data = ev.detail.value;
    this.requestsType = data
    if (ev.detail.value === 'AllOffers') {
      this.requestsType = 'AllOffers';

    }
    if (ev.detail.value === 'Favorite') {
      this.requestsType = 'Favorite';

    }
    if (ev.detail.value === 'MyOffers') {
      this.requestsType = 'MyOffers';

    }
    localStorage.setItem('requestType', this.requestsType);
  }
  ngOnInit() {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
  }

  paymentCancel() {
    console.log('payment failed');
  }

  setting() {
    this.navCtrl.navigateForward('settings');
  }
  noti() {
    this.navCtrl.navigateForward('notification');
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
