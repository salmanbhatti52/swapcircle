import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import parsePhoneNumber from 'libphonenumber-js'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  notichecked = 'false';
  number: any;
  constructor(public location: Location,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getuser()

  }


  goback() {
    this.location.back()
  }
  getuser() {
    this.api.sendRequest('users_customers_profile', { 'users_customers_id': localStorage.getItem('user_id') }).subscribe((res: any) => {
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
    this.api.sendRequest('notification_permission', { 'users_customers_id': localStorage.getItem('user_id') }).subscribe((res: any) => {
      console.log('reeer', res);

    })
  }

}
