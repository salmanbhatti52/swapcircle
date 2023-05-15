import { LoadingController, NavController } from '@ionic/angular';
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
    public loadingCtrl: LoadingController,
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
    this.loadershow()
    this.api.sendRequest('favorite_connect_articles', { "users_customers_id": localStorage.getItem('user_id') }).subscribe((res: any) => {

      console.log('fav_articles====', res);
      this.fav_articles = res.data

    }, err => {

    })
  }
  removefav(item: any, index: any) {
    console.log(item);

    let data = {
      "users_customers_id": localStorage.getItem('user_id'),
      "connect_articles_id": item.connect_articles_id
    }
    this.api.sendRequest('remove_favorite_connect_articles', data).subscribe((res: any) => {
      console.log(res);

      if (res.status == 'success') {
        this.extra.presentToast(res.message)
        this.fav_articles.splice(index, 1)
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

  async loadershow(content?: string) {

    this.loadingCtrl.create({
      cssClass: 'loadingdiv',
      message: '',
      duration: 2000
    }).then((res) => {
      res.present();
    });

  }

}
