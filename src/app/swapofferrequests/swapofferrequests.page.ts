import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { log } from 'console';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-swapofferrequests',
  templateUrl: './swapofferrequests.page.html',
  styleUrls: ['./swapofferrequests.page.scss'],
})
export class SwapofferrequestsPage implements OnInit {
  swap_offers_id: any;
  reqarr: any;

  constructor(public activated: ActivatedRoute,
    public navCtrl: NavController,
    public location: Location,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.swap_offers_id = this.activated.snapshot.params['swap_offers_id']
    console.log(this.swap_offers_id);

    this.getrequests(this.swap_offers_id)
  }

  goback() {
    this.location.back()
  }
  getrequests(swap_offers_id: any) {
    let datasend = {
      "swap_offers_id": swap_offers_id
    }

    this.api.sendRequest('user_swap_offers_requests', datasend).subscribe((p: any) => {
      console.log(p);
      this.reqarr = p.data
    })
  }

  acceptrequest(user: any) {

    let datasend = {
      "swap_offers_requests_id": user.swap_offers_requests_id,
      "swap_offers_id": user.swap_offers_id,
      "from_users_customers_id": user.from_users_customers_id
    }

    this.api.sendRequest('swap_offer_request_approve', datasend).subscribe((p: any) => {
      console.log(p);
      if (p.status == 'success') {
        this.extra.presentToast('Request accept successfully');
        this.navCtrl.navigateForward('offer')
      }
    })
  }

}
