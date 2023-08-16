
import { Component, ViewChild, ElementRef } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, SwiperOptions } from 'swiper';
import { IonicSlides, IonSlides, NavController } from '@ionic/angular';
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
  constructor(public navCtrl: NavController,
    public api: ApiService,
    public extra: ExtraService) {
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


  ionViewWillEnter() {
    this.api.sendRequest('users_customers_profile', { "users_customers_id": localStorage.getItem('user_Id') }).subscribe((p) => {
      console.log('profiledasds----', p);

    })
    if (this.requestsType) {
      if (this.requestsType === 'AllTransactions') {
        this.mySegment.nativeElement.children[0].click();
        this.gettransaction()
      }
      if (this.requestsType === 'HotSwapOffers') {
        this.mySegment.nativeElement.children[1].click();

      }
    } else {
      this.requestsType = 'AllTransactions';
      this.mySegment.nativeElement.children[0].click();

    }

    this.walletlist()
    this.unreadmessagecount()

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
      this.gettransaction()
    }
    if (ev.detail.value === 'HotSwapOffers') {
      this.requestsType = 'HotSwapOffers';

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
      console.log(this.currID);
    })
  }
  walletlist() {
    let datasend = {
      "users_customers_id": localStorage.getItem('user_Id'),
    }
    this.api.sendRequest('get_wallet', datasend).subscribe((response: any) => {
      console.log(response);
      this.walletslist = response.data
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

      if (resp.status == 'success') {
        this.extra.hideLoader()
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
