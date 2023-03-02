import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  tact = false;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  billing() {
    this.navCtrl.navigateForward('billingpayment');
  }
  settings() {
    this.navCtrl.navigateForward('settings');
  }
  faq() {
    this.navCtrl.navigateForward('faq');
  }
  goto() {
    this.navCtrl.navigateForward('editprofile');
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
