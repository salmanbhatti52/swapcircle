import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavController, IonContent } from '@ionic/angular';
import * as moment from 'moment';
import { ExtraService } from '../services/extra.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatdetail',
  templateUrl: './chatdetail.page.html',
  styleUrls: ['./chatdetail.page.scss'],
})
export class ChatdetailPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  private autoSaveInterval: any;
  message: any;
  messages: any = [];
  loggedid: any;
  other_users_customers_id: any;
  otherusername: any;
  constructor(public location: Location,
    public api: ApiService,
    public extra: ExtraService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.loggedid = localStorage.getItem('user_id')
    console.log('users_customers_id', localStorage.getItem('user_id'));

    this.other_users_customers_id = this.route.snapshot.params['otheruserid'];
    console.log('other_users_customers_id', this.other_users_customers_id);
    this.otherusername = this.route.snapshot.params['otherusername'];
    console.log('otherusername', this.otherusername);

  }

  goBack() {
    clearInterval(this.autoSaveInterval);
    this.location.back()
  }
  ionViewWillLeave() {
    clearInterval(this.autoSaveInterval);
    console.log("clear");
  }

  ionViewWillEnter() {
    this.scrollDown();

    // // Get all  messages....
    this.getMessages();
    this.autoSaveInterval = setInterval(() => {
      this.updateMessages();
    }, 2000);
  }

  userTyping(event: any) {
    this.scrollDown();
  }

  updateMessages() {
    let data = {
      "requestType": "updateMessages",
      "users_customers_id": localStorage.getItem('user_id'),
      "other_users_customers_id": this.other_users_customers_id
    }
    this.api.sendRequest('user_chat', data).subscribe((res: any) => {
      console.log("get msgs update response----", res);
      if (res.status == 'success') {
        res.data.unread_messages.forEach((ele: any) => {
          console.log(ele);
          let data = {
            userloggedId: ele.users_data.users_customers_id,
            message: ele.message,
            time: ele.time
          }
          this.messages.push(data)
          this.scrollDown();
        });
      }

    });
  }

  getMessages() {
    this.extra.loadershow()
    let data = {
      "requestType": "getMessages",
      "users_customers_id": localStorage.getItem('user_id'),
      "other_users_customers_id": this.other_users_customers_id
    }
    this.api.sendRequest('user_chat', data).subscribe((res: any) => {
      console.log("get msgs response----", res);
      this.extra.hideLoader()
      if (res.status == 'success') {
        this.scrollDown()
        res.data.forEach((ele: any) => {
          let data = {
            userloggedId: ele.user_data.users_customers_id,
            message: ele.message,
            time: ele.time
          }
          this.messages.push(data)
        });
      } else {
        this.extra.presentToast(res.message)
        this.extra.hideLoader()
      }

    });
  }
  sendMessage() {
    let time = moment().format('LT');
    console.log(time);
    let fiedlstosend = {
      "requestType": "sendMessage",
      "sender_type": "Users",
      "users_customers_id": localStorage.getItem('user_id'),
      "other_users_customers_id": this.other_users_customers_id,
      "content": this.message,
      "messageType": "1"
    }
    this.api.sendRequest('user_chat', fiedlstosend).subscribe((res: any) => {
      console.log("send-msg-response", res);
      if (res.status == 'success') {
        this.scrollDown()
        let datatosend = {
          userloggedId: localStorage.getItem('user_id'),
          message: this.message,
          time: time,
        }
        this.messages.push(datatosend);
        this.message = ''
      }

    });

  }

  scrollDown() {
    this.content.scrollToBottom(50);

  }
}
