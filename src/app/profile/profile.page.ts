import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { ExtraService } from '../services/extra.service';
import OneSignal from 'onesignal-cordova-plugin';

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
  copied = false;
  referalcode: any;
  first_name: any;
  last_name: any;
  email: any;
  userid: any;
  constructor(public navCtrl: NavController,
    public toastController: ToastController,
    private clipboard: Clipboard,
    public extra: ExtraService,
  public platform:Platform) { }

  ngOnInit() {


  }
  ionViewWillEnter() {
    this.userdetail = localStorage.getItem('userdeatil')
    console.log(this.userdetail);

    this.user = JSON.parse(this.userdetail)
    console.log(this.user);
    this.userid = this.user.users_customers_id;
    console.log("userId: ",this.userid);
    
    this.userprofile = this.user.profile_pic
    this.first_name = this.user.first_name
    this.last_name = this.user.last_name
    this.email = this.user.email

    let myString: any = localStorage.getItem('user_Id');
    let encodedValue = btoa(myString);
    this.referalcode = encodedValue;
    console.log('dsads', this.referalcode);
    // this.userprofile = localStorage.getItem('userprofile')
  }

  copy() {
    // console.log(this.textTocopy);
    this.clipboard.copy(this.referalcode);
    this.presentToast();
    this.copied = true;
    setInterval(() => {
      this.copied = false;
    }, 3000);
  }

  async socialshare() {
    await Share.share({
      title: 'See cool stuff',
      text: this.referalcode,
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Coupon code copied!.',
      duration: 2000
    });
    toast.present();
  }

  addpayout() {
    this.navCtrl.navigateForward('allaccounts');
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
    localStorage.removeItem('user_Id');
    localStorage.removeItem('sessionTimer');
    this.extra.sessionExpiryTime = null;
    // if(this.platform.is('cordova')){
    //   OneSignal.logout();
    // }
    this.extra.btnshow = false;
    this.extra.clearTimer();
    this.navCtrl.navigateRoot('loginscreen')
  }
  goto() {
    this.navCtrl.navigateForward('editprofile');
  }

  delete() {
    this.navCtrl.navigateForward('deleteaccount');
  }
  tabClick() {
    this.navCtrl.navigateForward('track');
  }
  tab1Click() {
    this.navCtrl.navigateForward('home');
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

}
