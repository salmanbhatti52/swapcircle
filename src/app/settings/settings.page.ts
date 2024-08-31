import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import parsePhoneNumber from 'libphonenumber-js'
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  notichecked = 'false';
  Idchecked='false';
  number: any;
  time: any;
  fp:any;
  constructor(public location: Location,
    public api: ApiService,
    public extra: ExtraService,
    public navCtrl: NavController) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.fp = localStorage.getItem('fingerprint');
    console.log('fingerprint====', this.fp);
    this.api.fingerPrintVal = this.fp
    this.getuser()

  }


  goback() {
    this.location.back()
  }
  getuser() {
    this.api.sendRequest('users_customers_profile', { 'users_customers_id': localStorage.getItem('user_Id') }).subscribe((res: any) => {
      // console.log('get user----', res);
      if (res.data.notifications == "No") {
        this.notichecked = 'false'
      }
      else {
        this.notichecked = 'true'
      }
    })
  }

  changed(ev: any) {
    // console.log(ev);
    localStorage.setItem('notification', ev.detail.checked)
    this.api.sendRequest('notification_permission', { 'users_customers_id': localStorage.getItem('user_Id') }).subscribe((res: any) => {
      console.log('reeer', res);

    })
  }
  changedId(ev: any) {
    console.log(ev);
    
    if (ev.detail.checked == true) {

      this.api.fingerPrintVal = 'true'
      localStorage.setItem('fingerprint', 'true')
    } else {
      this.api.fingerPrintVal = 'false';
      localStorage.setItem('fingerprint', 'false')
    }
  }

  handleChange(ev: any) {
    console.log(ev);
    this.time = ev.detail.value

    let data = {
      users_customers_id: localStorage.getItem('user_Id'),
      activity_interval: this.time
    }
    this.api.sendRequest('update_activity_interval', data).subscribe((res: any) => {
      console.log('reeer', res);
      if (res.status == 'success') {
        this.extra.presentToast('Session expire time is selected');
        this.navCtrl.navigateRoot('home')
      }
    })
  }

}
