import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { ExtraService } from '../services/extra.service';
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
  constructor(public navCtrl: NavController,
    public toastController: ToastController,
    private clipboard: Clipboard,
    public extra: ExtraService) { }

  ngOnInit() {


  }
  ionViewWillEnter() {
    this.userdetail = localStorage.getItem('userdeatil')
    console.log(this.userdetail);

    this.user = JSON.parse(this.userdetail)
    console.log(this.user);
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
    this.navCtrl.navigateForward('addaccount');
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
    this.extra.btnshow = false;
    this.navCtrl.navigateRoot('loginscreen')
  }
  goto() {
    this.navCtrl.navigateForward('editprofile');
  }

  delete() {
    this.navCtrl.navigateForward('deleteaccount');
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
