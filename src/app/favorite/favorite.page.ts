import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  tact = false;
  fav_articles: any;
  term: any;
  searchbar = false;
  constructor(public navCtrl: NavController,
    public location: Location,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.favconnects()
  }

  goback() {
    this.location.back()
  }

  favconnects() {
    this.api.sendRequest('favorite_connect_articles', { "users_customers_id": localStorage.getItem('user_id') }).subscribe((res: any) => {
      console.log('fav_articles====', res);
      this.fav_articles = res.data
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
