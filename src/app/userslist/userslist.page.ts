import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.page.html',
  styleUrls: ['./userslist.page.scss'],
})
export class UserslistPage implements OnInit {
  userlist: any;
  other_users_customers_id: any;
  constructor(public location: Location,
    public navCtrl: NavController,
    public api: ApiService,
    public extra: ExtraService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.users()
    this.other_users_customers_id = this.route.snapshot.params['otheruserid'];
    console.log('other_users_customers_id', this.other_users_customers_id);
  }

  goback() {
    this.location.back()
  }

  users() {

    this.api.sendRequest('all_users', { 'users_customers_id': localStorage.getItem('user_id') }).subscribe((res: any) => {
      console.log(res);
      this.userlist = res.data
    })
  }

  goto(user: any) {
    let data = {
      "requestType": "startChat",
      "users_customers_id": localStorage.getItem('user_id'),
      "other_users_customers_id": user.users_customers_id
    }
    this.api.sendRequest('user_chat_live', data).subscribe((res: any) => {
      console.log('res---for check start chat', res);
      if (res.status == 'success') {
        this.navCtrl.navigateForward(['chatdetail', {
          otheruserid: user.users_customers_id,
          otherusername: user.first_name
        }])
      } else {
        this.extra.presentToast(res.message)
      }
    })

  }



  handleImgError(ev: any) {
    console.log(ev);

    const source = ev.srcElement;
    const imgSrc = `assets/imgs/user.png`;
    source.src = imgSrc;
  }
}
