import { ApiService } from './../services/api.service';
import { ExtraService } from './../services/extra.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {
  @ViewChild('mySegment', { read: ElementRef })
  private mySegment!: ElementRef;
  requestsType: any;
  email: any;
  pass1: any;
  showPass = false;
  showcPass = false;
  constructor(public navCtrl: NavController,
    public rest: ExtraService,
    public api: ApiService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    if (this.requestsType) {
      if (this.requestsType === 'Individual') {
        this.mySegment.nativeElement.children[0].click();

      }
      if (this.requestsType === 'Corporate') {
        this.mySegment.nativeElement.children[1].click();

      }
    } else {
      this.requestsType = 'Individual';
      this.mySegment.nativeElement.children[0].click();

    }
  }
  segmentChanged(ev: any) {
    console.log('requestType value', ev.detail.value);
    let data = ev.detail.value;
    this.requestsType = data
    if (ev.detail.value === 'Individual') {
      this.requestsType = 'Individual';

    }
    if (ev.detail.value === 'Corporate') {
      this.requestsType = 'Corporate';

    }
    localStorage.setItem('requestType', this.requestsType);
  }

  forgot() {
    this.navCtrl.navigateForward('forgot');
  }

  goNext() {
    let data = {
      // localStorage.getItem('onesignalId')
      "one_signal_id": '123',
      "email": this.email,
      "password": this.pass1
    }
    if (this.email == '') {
      this.rest.presentToast('Email is Required')
    } else if (this.pass1 == '') {
      this.rest.presentToast('Password is Required')
    } else {
      this.rest.loadershow()
      this.api.sendRequest('signin', data).subscribe((res: any) => {
        console.log('response--', res);
        if (res.status == 'success') {
          this.rest.hideLoader()
          localStorage.setItem('userdeatil', JSON.stringify(res.data))
          localStorage.setItem('user_id', res.data.users_customers_id);
          this.navCtrl.navigateRoot('home');
        } else {
          this.rest.hideLoader()
          this.rest.presentToast(res.message)
        }

      }, err => {
        this.rest.hideLoader()
      })

    }

  }

  togglePass() {
    this.showPass = !this.showPass;
  }



  goback() {
    this.navCtrl.navigateRoot('onboard');
  }
}
