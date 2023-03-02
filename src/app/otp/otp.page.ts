import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  userEmail: any;
  otp: any;

  constructor(public navCtrl: NavController,
    public extra: ExtraService) { }

  ngOnInit() {
    this.userEmail = localStorage.getItem('emailonforgot')
  }

  goNext() {
    if (localStorage.getItem('otp') == this.otp) {
      this.navCtrl.navigateRoot('resetpassword')
    } else {
      this.extra.presentToast("OTP doesn't match")
    }

  }

  onOtpChange(event: any) {
    console.log(event, "eventevent");
    this.otp = event;
  }

}
