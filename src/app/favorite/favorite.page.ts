import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  tact = false;
  constructor(public navCtrl: NavController,
    public location: Location) { }

  ngOnInit() {
  }

  goback() {
    this.location.back()
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
