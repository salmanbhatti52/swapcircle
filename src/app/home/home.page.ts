
import { Component, ViewChild, ElementRef } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, SwiperOptions } from 'swiper';
import { AlertController, IonicSlides, IonSlides, NavController } from '@ionic/angular';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
import { IonModal } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('slides', { static: false }) slides!: IonSlides;

  @ViewChild('mySegment', { read: ElementRef })
  private mySegment!: ElementRef;

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonModal) modal1!:IonModal;
  requestsType: any = 'HotSwapOffers';
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

  basecurrency: any;
  totalamount: any;
  showcurr = false;
  currencies = [{ curr: 'Euro' }, { curr: 'Dollar' }, { curr: 'INR' }];
  walletslist: any;
  // transarr: any = [];
  transarr: any;
  // 18 loginid
  userloginId: any;
  currID: any;
  bcurrsymbol: any;
  messagecount: any;
  textshow: any;
  errortext = false;
  errorshow: any;
  intervalId: any;
  offers: any = [];
  isModalOpen = false;
  basecurrID: any;
  from_amount: any;
  baseamt: any;
  from_currency_symbol: any;
  to_currency_symbol: any;
  exchange_rate: any;
  convertedamt: any;
  swap_offers_id: any;
  fav: any;
  currsymbol: any;
  toSystemCurrenciesId: any;
  isAllOfferFunctionCalled = false;

  constructor(public navCtrl: NavController,
    public api: ApiService,
    public extra: ExtraService,
    public alert: AlertController
  ) {
    this.systemsettings()
    
    this.userdetail = localStorage.getItem('userdeatil')
    console.log(this.userdetail);
    ///show floating btn
    this.extra.btnshow = true;
    /////
    this.user = JSON.parse(this.userdetail);
    this.userloginId = this.user.users_customers_id

    this.bcurrsymbol = localStorage.getItem('basecurrsymbol')


    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      console.log("Good Morning");
      this.textshow = "Good Morning"
    } else if (currentHour >= 12 && currentHour < 18) {
      console.log("Good Afternoon");
      this.textshow = "Good Afternoon"
    } else {
      console.log("Good Evening");
      this.textshow = "Good Evening"
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


  ionViewWillEnter() {
    this.offers = this.api.offers;
    this.api.sendRequest('users_customers_profile', { "users_customers_id": localStorage.getItem('user_Id') }).subscribe((p) => {
      console.log('profiledasds----', p);

    })
    if (this.requestsType) {
      if (this.requestsType === 'AllTransactions') {
        this.mySegment.nativeElement.children[0].click();
        this.gettransaction();
        console.log('call trans 1');
      }
      if (this.requestsType === 'HotSwapOffers') {
        this.mySegment.nativeElement.children[1].click();
        // if(this.offers.length != 0){
        if(this.isAllOfferFunctionCalled == false){
          this.isAllOfferFunctionCalled = true;
          this.alloffers();
        }
          
        // }
        
        console.log('call 1');
        
      }
    } 
    // else {
    //   this.requestsType = 'AllTransactions';
    //   // this.mySegment.nativeElement.children[0].click();
    //   // this.gettransaction();
    // }

    this.walletlist()
    this.unreadmessagecount()
    this.alertbox()
    // this.api.sendRequest('users_customers_activity_interval', { "users_customers_id": localStorage.getItem('user_Id') }).subscribe((res: any) => {
    //   console.log('users_customers_activity_interval', res);

    //   if (res.status == 'success') {
    //     this.intervalId = setInterval(() => {
    //       this.api.sendRequest('users_customers_last_activity', { "users_customers_id": localStorage.getItem('user_Id') }).subscribe((res: any) => {
    //         console.log('users_customers_last_activity', res);
    //         if (res.status == 'success') {

    //         }
    //       })
    //       // Code to be executed every 1 minute
    //       console.log('This code will run every 1 minute');
    //     }, 60000); // 60,000 milliseconds = 1 minute

    //   } else {
    //     localStorage.removeItem('user_id');
    //     clearInterval(this.intervalId);
    //     this.navCtrl.navigateRoot('loginscreen')
    //   }
    // })
  }

  alloffers() {
    this.offers = []
    this.extra.loadershow();
    this.api.sendRequest('all_swap_offers', { "users_customers_id": localStorage.getItem('user_Id') }).subscribe((res: any) => {
      console.log('all offers', res);
      this.extra.hideLoader();

      if (res.status == "success") {
        this.extra.hideLoader()
        this.offers = res.data
      } else {
        this.extra.hideLoader()
      }
      this.isAllOfferFunctionCalled = false;
    }, err => {
      this.extra.hideLoader()
    })
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
    this.toSystemCurrenciesId = f.to_system_currencies_id;
    this.exchangerate()
  }

  setClose(isOpen: boolean) {
    this.isModalOpen = isOpen;
    let data = {
      "swap_offers_id": this.swap_offers_id,
      "from_users_customers_id": localStorage.getItem('user_Id')
    }
    this.api.sendRequest('swap_offer_request', data).subscribe((res: any) => {
      console.log('swap_offer====', res);
      if(res.status=='success'){
        this.extra.presentToast("Offer send successfully")
      }else{
        this.extra.presentToast(res.message);
      }
      
    })
  }

  async onWillDismiss(f: any) {
    if (f.detail.role == 'backdrop') {
      this.isModalOpen = false
    }
  }

  removefav(f: any, i: any) {
    console.log(i);

    let data = {
      "users_customers_id": localStorage.getItem('user_Id'),
      "swap_offers_id": f.swap_offers_id
    }
    this.api.sendRequest('remove_favorite_swaps_offers', data).subscribe((rem: any) => {
      console.log('remove itm====', rem);
      if (rem.status == 'success') {
        // this.fav.splice(i, 1);
        f.liked = 'No';
      }
    })
  }

  addfav(f: any) {
    let data = {
      "users_customers_id": localStorage.getItem('user_Id'),
      "swap_offers_id": f.swap_offers_id
    }
    this.api.sendRequest('add_favorite_swaps_offers', data).subscribe((fav: any) => {
      console.log('fav========', fav);
      if (fav.status == 'success') {
        f.liked = "Yes"
      }
    })
  }

  exchangerate() {
    let datasend = {
      "sender_currency_id": this.currID,
      "receiver_currency_id": this.basecurrID,
      "from_amount": this.from_amount,
      // " ":this.toSystemCurrenciesId
    }
    console.log("currency_converter_payloads:",datasend);
    
    this.api.sendRequest('currency_converter', datasend).subscribe((p: any) => {
      console.log(p);
      let base_amt = p.data.converted_amount
      this.baseamt = base_amt.toFixed(2)
    })
  }
  
  async alertbox() {
    const fp = localStorage.getItem('fingerprint');
    console.log('sASAsaSA', fp);
    if (fp == null) {
      const alert = await this.alert.create({
        header: 'Do you want to add Finger Print/Face ID login',
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => {
              localStorage.setItem('fingerprint', 'true');
              this.api.fingerPrintVal = 'true';
            },
          },
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              localStorage.setItem('fingerprint', 'false');
              this.api.fingerPrintVal = 'false';
            },
          },
        ],
      });
      await alert.present();
    }
  }
  
  unreadmessagecount() {
    this.api.sendRequest('unreaded_messages', { "users_customers_id": localStorage.getItem('user_Id') }).subscribe((res: any) => {
      console.log('message count====', res);
      if (res.status == 'success') {
        this.messagecount = res.data
      }
    })
  }

  segmentChanged(ev: any) {
    console.log('requestType value', ev.detail.value);
    let data = ev.detail.value;
    this.requestsType = data
    if (ev.detail.value === 'AllTransactions') {
      this.requestsType = 'AllTransactions';
      console.log('call trans 2');

      this.gettransaction()
    }
    if (ev.detail.value === 'HotSwapOffers' ) {
      this.requestsType = 'HotSwapOffers';
      console.log('call 2');
      if(this.isAllOfferFunctionCalled == false){
        this.isAllOfferFunctionCalled = true;
        this.alloffers();
      }
    }
    if (ev.detail.value === 'RateTable') {
      this.requestsType = 'RateTable';

    }
    localStorage.setItem('requestType', this.requestsType);
  }

  systemsettings() {
    this.api.getRequest('system_settings').subscribe((res: any) => {
      console.log(res);

      res.data.map((value: any, index: any) => {
        if (
          value.type == "system_currencies_id"
        ) {
          this.currID = value.description
          localStorage.setItem('systemcurr', this.currID)
        }
      });
      this.getbasecurr();
      console.log(this.currID);
    })
  }
  walletlist() {
    let datasend = {
      "users_customers_id": localStorage.getItem('user_Id'),
    }
    this.api.sendRequest('get_wallet', datasend).subscribe((response: any) => {
      console.log(response);
      this.walletslist = response.data;
      this.api.wallets = this.walletslist;
    })
  }

  dismiss() {
    this.modal.dismiss()
  }

  seewallets() {
    this.navCtrl.navigateForward('walletslist')
  }
  wallet() {
    this.navCtrl.navigateForward('createwallet')
  }
  transaction() {
    this.navCtrl.navigateForward('sendcurrency')
  }
  openList() {
    if (this.showcurr == true) {
      this.showcurr = false;
    } else {
      this.showcurr = true;
    }
  }


  selectcurrency(list: any, index: any) {
    this.basecurrency = list.curr
    this.showcurr = false;
  }

  gettransaction() {
    this.transarr = []
    this.extra.loadershow();
    this.api.sendRequest('all_transactions', { "users_customers_id": localStorage.getItem('user_Id') }).subscribe((resp: any) => {
      console.log('trans----', resp);
      this.extra.hideLoader();
      if (resp.status == 'success') {
        
        resp.data.date_added = moment(resp.data.date_added).format('LT');
        console.log(resp.data.date_added)
        this.transarr = resp.data
        // resp.data.forEach((ele: any) => {
        //   // console.log(ele);
        //   let obj = {
        //     from_users_customers_id: ele.from_users_customers_id,
        //     first_name: ele.from_users_customers.first_name,
        //     last_name: ele.from_users_customers.last_name,
        //     base_amount: ele.base_amount,
        //     to_system_currencies: ele.to_system_currencies,
        //     to_amount: ele.to_amount,
        //     from_system_currencies: ele.from_system_currencies,
        //     from_amount: ele.from_amount,
        //     time: moment(ele.date_added).format('LT')
        //   }
        //   this.transarr.push(obj)
        // });

      }
      else {
        this.extra.hideLoader()
        // this.extra.presentToast(resp.message)
        this.errortext = true
        this.errorshow = resp.message
      }
    }, err => {
      this.extra.hideLoader()
    })
  }

  goNext() {
    this.navCtrl.navigateForward('createoffer')
  }
  noti() {
    this.navCtrl.navigateForward('notification');
  }
  chat() {
    this.navCtrl.navigateForward('chat');
  }
  tabClick() {
    this.navCtrl.navigateForward('track');
  }
  tab1Click() {

  }
  tab2Click() {
    this.navCtrl.navigateForward('offer');
  }
  tab3Click() {
    this.navCtrl.navigateForward('connect');
  }
  tab4Click() {
    this.navCtrl.navigateForward('profile');
  }

  tab5Click() { }
}
