
import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, SwiperOptions } from 'swiper';
import { IonicSlides, IonSlides, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { Share } from '@capacitor/share';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {
  @ViewChild('slides', { static: false }) slides!: IonSlides;
  tact = false;
  cat: any;
  popular_articles: any;
  other_articles: any;
  term: any;
  searchbar = false;
  constructor(public navCtrl: NavController,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getcategories();
    this.popularconnects()
    this.otherconnects()
  }

  All() {
    this.popularconnects()
    this.otherconnects()
  }
  getcategories() {
    this.api.getRequest('connect_categories').subscribe((res: any) => {
      console.log('cat====', res);
      this.cat = res.data
    })
  }
  popularconnects() {
    this.extra.loadershow()
    this.api.sendRequest('popular_connect_articles', { "users_customers_id": localStorage.getItem('user_id') }).subscribe((res: any) => {
      this.extra.hideLoader()
      console.log('connect_articles====', res);
      this.popular_articles = res.data
    }, err => {
      this.extra.hideLoader()
    })
  }

  otherconnects() {
    this.api.sendRequest('connect_articles', { "users_customers_id": localStorage.getItem('user_id') }).subscribe((res: any) => {
      console.log('Other_connect_articles====', res);
      this.other_articles = res.data
    })
  }
  otherconnectsBycategory(item: any) {
    this.other_articles = []
    let data = {
      "users_customers_id": localStorage.getItem('user_id'),
      "connect_categories_id": item.connect_categories_id
    }

    this.api.sendRequest('connect_articles_by_category', data).subscribe((res: any) => {
      console.log('Other_connect_articles====', res);
      if (res.status == 'success') {
        this.other_articles = res.data
        this.popularconnectBycategory(item.connect_categories_id)
      } else {
        this.popularconnectBycategory(item.connect_categories_id)
        this.extra.presentToast(res.message)
      }

    })
  }
  popularconnectBycategory(connect_categories_id: any) {
    this.popular_articles = []
    let data = {
      "users_customers_id": localStorage.getItem('user_id'),
      "connect_categories_id": connect_categories_id
    }
    this.api.sendRequest('popular_connect_articles_by_category', data).subscribe((res: any) => {
      console.log('Other_connect_articles====', res);
      if (res.status == 'success') {
        this.popular_articles = res.data
      } else {
        this.extra.presentToast(res.message)
      }
    })
  }

  addfav(item: any) {

    let data = {
      "users_customers_id": localStorage.getItem('user_id'),
      "connect_articles_id": item.connect_articles_id
    }
    this.api.sendRequest('add_favorite_connect_articles', data).subscribe((p: any) => {
      console.log('fav========', p);
      if (p.status == 'success') {
        item.liked = "Yes"
      }
    })
  }
  removefav(item: any, i: any, type: any) {
    console.log(type);

    let data = {
      "users_customers_id": localStorage.getItem('user_id'),
      "connect_articles_id": item.connect_articles_id
    }
    this.api.sendRequest('remove_favorite_connect_articles', data).subscribe((rem: any) => {
      console.log('remove itm====', rem);
      if (rem.status == 'success') {
        if (type == 'other') {
          item.liked = "No"
        }
        else {
          item.liked = "No"
        }
      }
    })
  }
  search() {
    if (this.searchbar == true) {
      this.searchbar = false;
    } else {
      this.searchbar = true;
    }
  }
  async socialshare(obj: any) {
    await Share.share({
      title: obj.title,
      text: obj.description,
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
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
