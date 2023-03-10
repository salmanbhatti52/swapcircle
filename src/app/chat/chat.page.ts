import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  // chat = [{ user_image: 'assets/imgs/picon.svg', first_name: 'James Anderson', last_message: 'Have a good one!', date: '20 minute ago', chatopen: 0 },
  // { user_image: 'assets/imgs/picon.svg', first_name: 'James Anderson', last_message: 'Have a good one!', date: '20 minute ago', chatopen: 1 },
  // { user_image: 'assets/imgs/picon.svg', first_name: 'James Anderson', last_message: 'Have a good one!', date: '22 minute ago', chatopen: 0 }
  // ]
  chat: any;
  constructor(public location: Location,
    public navCtrl: NavController,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.getchat()

  }

  goback() {
    this.location.back()
  }

  getchat() {
    // 2
    // localStorage.getItem('user_id')
    // this.extra.loadershow()
    let data = {
      "users_customers_id": 2
    }
    this.api.sendRequest('getAllChatLive', data).subscribe((res: any) => {
      console.log('res---', res);
      this.extra.hideLoader()
      this.chat = res.data
    }, err => {
      // this.extra.hideLoader()
    })
  }
  goto(user: any) {
    // let data = {
    //   "requestType": "startChat",
    //   "users_customers_id": "2",
    //   "other_users_customers_id": "1"
    // }
    // this.api.sendRequest('user_chat_live', data).subscribe((res: any) => {
    //   console.log('res---for check start chat', res);
    //   if (res.status == 'success') {
    //     this.navCtrl.navigateForward('chatdetail')
    //   } else {
    //     this.extra.presentToast(res.message)
    //   }
    // })

    this.navCtrl.navigateForward(['chatdetail', {
      otheruserid: user.receiver_id,
      otherusername: user.first_name
    }])
  }

  seeuser() {
    this.navCtrl.navigateForward('userslist')
  }


}
