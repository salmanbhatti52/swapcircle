import { ApiService } from './../services/api.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  noti = [{ image: 'assets/imgs/picon.svg', name: 'James Anderson', price: '120', time: '20 minute ago' },
  { image: 'assets/imgs/picon.svg', name: 'James Anderson', price: '120', time: '20 minute ago' },
  { image: 'assets/imgs/picon.svg', name: 'James Anderson', price: '120', time: '20 minute ago' }]
  constructor(public location: Location,
    public api: ApiService) { }

  ngOnInit() {
    this.getnotification()
  }

  getnotification() {
    this.api.sendRequest('notifications', { "users_customers_id": localStorage.getItem('user_id') }).subscribe((res: any) => {
      console.log('response', res);

    })
  }
  goback() {
    this.location.back()
  }

}
