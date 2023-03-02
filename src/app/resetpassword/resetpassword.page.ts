import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  newpass = '';
  confirmpass = '';
  constructor(public navCtrl: NavController,
    public rest: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
  }

  goNext() {
    let data = {
      "email": localStorage.getItem('emailonforgot'),
      "otp": localStorage.getItem('otp'),
      "password": this.newpass,
      "confirm_password": this.confirmpass
    }
    this.rest.sendRequest('modify_password', data).subscribe((res: any) => {
      console.log('password rsponse---', res);
      if (res.status == 'success') {
        this.navCtrl.navigateRoot('loginscreen')
      } else {
        this.extra.presentToast(res.message)
      }

    })

  }

}
