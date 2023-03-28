import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  tact = false;
  userdetail: any;
  user: any;
  userprofile: any;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.userdetail = localStorage.getItem('userdeatil')
    console.log(this.userdetail);

    this.user = JSON.parse(this.userdetail)

  }
  ionViewWillEnter() {
    this.userprofile = localStorage.getItem('userprofile')
  }

  billing() {
    this.navCtrl.navigateForward('billingpayment');
  }
  transaction() {
    this.navCtrl.navigateForward('transaction');
  }
  settings() {
    this.navCtrl.navigateForward('settings');
  }
  faq() {
    this.navCtrl.navigateForward('faq');
  }
  feedback() {
    this.navCtrl.navigateForward('feedback');
  }
  logout() {
    localStorage.removeItem('user_id');
    this.navCtrl.navigateRoot('loginscreen')
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
