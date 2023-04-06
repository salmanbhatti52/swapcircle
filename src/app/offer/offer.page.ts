import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { ModalController } from '@ionic/angular';
import { OfferpopupPage } from '../offerpopup/offerpopup.page';
import { log } from 'console';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  @ViewChild('mySegment', { read: ElementRef })
  private mySegment!: ElementRef;
  @ViewChild(IonModal) modal!: IonModal;

  requestsType: any;
  tact = false;
  title: any;
  reference = '';
  offers: any;
  userswapoffers: any;

  isModalOpen = false;
  currsymbol: any;
  from_currency_symbol: any;
  to_currency_symbol: any;
  exchange_rate: any;
  from_amount: any;
  convertedamt: any;
  basecurrID: any;
  baseamt: any;
  currID: any;
  swap_offers_id: any;
  fav: any;


  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    public api: ApiService,
    public extra: ExtraService) {
    this.getbasecurr()
  }

  ionViewWillEnter() {
    if (this.requestsType) {
      if (this.requestsType === 'AllOffers') {
        this.mySegment.nativeElement.children[0].click();

      }
      if (this.requestsType === 'Favorite') {
        this.mySegment.nativeElement.children[1].click();
        this.getfav()
      }
      if (this.requestsType === 'MyOffers') {
        this.useroffers()
        this.mySegment.nativeElement.children[2].click();

      }
    } else {
      this.alloffers()
      this.requestsType = 'AllOffers';
      this.mySegment.nativeElement.children[0].click();

    }
  }
  getbasecurr() {
    this.api.sendRequest('get_currencies_by_id', { "system_currencies_id": localStorage.getItem('systemcurr') }).subscribe((curr: any) => {
      console.log(curr);

      this.basecurrID = curr.data[0].system_currencies_id
      this.currsymbol = curr.data[0].symbol
      localStorage.setItem('basecurrsymbol', this.currsymbol)
    })
  }

  segmentChanged(ev: any) {
    console.log('requestType value', ev.detail.value);
    let data = ev.detail.value;
    this.requestsType = data
    if (ev.detail.value === 'AllOffers') {
      this.requestsType = 'AllOffers';
      this.alloffers()
    }
    if (ev.detail.value === 'Favorite') {
      this.requestsType = 'Favorite';
      this.getfav()
    }
    if (ev.detail.value === 'MyOffers') {
      this.requestsType = 'MyOffers';

    }
    localStorage.setItem('requestType', this.requestsType);
  }
  ngOnInit() {
    this.useroffers()
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  dismiss() {
    this.modal.dismiss()
  }

  alloffers() {
    this.api.sendRequest('all_swap_offers', { "users_customers_id": localStorage.getItem('user_id') }).subscribe((res: any) => {
      console.log('all offers', res);
      this.offers = res.data
    })
  }
  useroffers() {
    this.api.sendRequest('user_swap_offers', { "users_customers_id": localStorage.getItem('user_id') }).subscribe((res: any) => {
      console.log('user0ffers----', res);
      this.userswapoffers = res.data
    })
  }
  async onWillDismiss(f: any) {
    // console.log(f);
    if (f.detail.role == 'backdrop') {
      this.isModalOpen = false
    }
    // const modal = await this.modalCtrl.create({
    //   component: OfferpopupPage,
    //   cssClass: 'offer-modal'
    // });
    // modal.present();

    // const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   let message = `Hello, ${data}!`;
    // }
  }
  setOpen(isOpen: boolean, f: any) {
    this.isModalOpen = isOpen;
    console.log(this.isModalOpen);

    console.log(f)
    this.swap_offers_id = f.swap_offers_id
    this.from_currency_symbol = f.from_currency.symbol;
    this.to_currency_symbol = f.to_currency.symbol
    this.exchange_rate = f.exchange_rate
    this.from_amount = f.from_amount
    this.convertedamt = f.to_amount
    this.currID = f.from_currency.system_currencies_id

    this.exchangerate()
  }
  setClose(isOpen: boolean) {
    this.isModalOpen = isOpen;
    let data = {
      "swap_offers_id": this.swap_offers_id,
      "from_users_customers_id": localStorage.getItem('user_id')
    }
    this.api.sendRequest('swap_offer_request', data).subscribe((offer: any) => {
      console.log('swap_offer====', offer);
      this.extra.presentToast("Offer send successfully")
    })
  }

  exchangerate() {
    let datasend = {
      "sender_currency_id": this.currID,
      "receiver_currency_id": this.basecurrID,
      "from_amount": this.from_amount
    }

    this.api.sendRequest('currency_converter', datasend).subscribe((p: any) => {
      console.log(p);
      let base_amt = p.data.converted_amount
      this.baseamt = base_amt.toFixed(2)
    })





  }
  getfav() {
    this.api.sendRequest('all_favorite_swaps_offers', { "users_customers_id": localStorage.getItem('user_id') }).subscribe((res: any) => {
      console.log('get fav====', res);
      this.fav = res.data
    })
  }

  addfav(f: any) {
    let data = {
      "users_customers_id": localStorage.getItem('user_id'),
      "swap_offers_id": f.swap_offers_id
    }
    this.api.sendRequest('add_favorite_swaps_offers', data).subscribe((fav: any) => {
      console.log('fav========', fav);
      if (fav.status == 'success') {
        f.liked = "Yes"
      }
    })
  }
  removefav(f: any, i: any) {
    console.log(i);

    let data = {
      "users_customers_id": localStorage.getItem('user_id'),
      "swap_offers_id": f.swap_offers_id
    }
    this.api.sendRequest('remove_favorite_swaps_offers', data).subscribe((rem: any) => {
      console.log('remove itm====', rem);
      if (rem.status == 'success') {
        this.fav.splice(i, 1)
      }
    })
  }
  seerequests(f: any) {
    // console.log(f);

    this.navCtrl.navigateForward(['swapofferrequests', {
      swap_offers_obj: JSON.stringify(f)
    }])
  }

  setting() {
    this.navCtrl.navigateForward('settings');
  }
  noti() {
    this.navCtrl.navigateForward('notification');
  }

  createoffer() {
    this.navCtrl.navigateForward('createoffer');
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
