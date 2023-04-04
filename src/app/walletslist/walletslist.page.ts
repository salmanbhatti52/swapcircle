import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-walletslist',
  templateUrl: './walletslist.page.html',
  styleUrls: ['./walletslist.page.scss'],
})
export class WalletslistPage implements OnInit {
  walletslist: any;
  constructor(public api: ApiService,
    public extra: ExtraService,
    public navCtrl: NavController,
    public location: Location) { }

  ngOnInit() {
    this.walletlist()
  }
  goback() {
    this.location.back()
  }
  walletlist() {
    let datasend = {
      "users_customers_id": localStorage.getItem('user_id'),
    }
    this.api.sendRequest('get_wallet', datasend).subscribe((response: any) => {
      console.log(response);
      this.walletslist = response.data
    })
  }

  goNext() {
    this.navCtrl.navigateForward('createsawap')
  }

}
