import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { ExtraService } from './../services/extra.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  email: any = ''
  constructor(public navCtrl: NavController,
    public rest: ExtraService,
    public api: ApiService,
    public location: Location) { }

  ngOnInit() {
  }

  goback() {
    this.location.back()
  }
  goNext() {
    let data = {
      "email": this.email,
    }
    if (this.email == '') {
      this.rest.presentToast('Email is Required')
    } else {
      this.api.sendRequest('forgot_password', data).subscribe((res: any) => {
        console.log('response--', res);
        if (res.status == 'success') {
          this.navCtrl.navigateForward('otp');
          localStorage.setItem('emailonforgot', this.email);
          localStorage.setItem('otp', res.data.otp);
          this.rest.presentToast(res.data.message);
        } else {
          this.rest.presentToast(res.message);
        }

      })

    }

  }

}
