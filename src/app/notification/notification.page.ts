import { ApiService } from './../services/api.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ExtraService } from '../services/extra.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  // noti = [{ image: 'assets/imgs/picon.svg', name: 'James Anderson', price: '120', time: '20 minute ago' },
  // { image: 'assets/imgs/picon.svg', name: 'James Anderson', price: '120', time: '20 minute ago' },
  // { image: 'assets/imgs/picon.svg', name: 'James Anderson', price: '120', time: '20 minute ago' }]
  noti: any = [];
  notilength: any;
  constructor(public location: Location,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.getnotification()
  }

  getnotification() {
    this.extra.loadershow()
    this.api.sendRequest('notifications', { "users_customers_id": localStorage.getItem('user_Id') }).subscribe((res: any) => {
      console.log('response', res);
      this.notilength = res.data.length
      if (res.status == 'success') {
        this.extra.hideLoader()
        let dd = moment(res.data.date_added).format('YYYY-MM-DD')
        const d = new Date(dd);

        console.log(moment(d).fromNow());

        res.data.forEach((ele: any) => {
          let data = {
            first_name: ele.notification_sender.first_name,
            last_name: ele.notification_sender.last_name,
            message: ele.message,
            profile_pic: ele.notification_sender.profile_pic,
            time: moment(ele.date_added).fromNow()
          }
          this.noti.push(data)
        });
      } else {
        this.extra.hideLoader()
      }


    }, err => {
      this.extra.hideLoader()
    })
  }
  goback() {
    this.location.back()
  }

}
