import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  name: any = '';
  email: any = '';
  desc: any = '';
  constructor(public location: Location,
    public navCtrl: NavController,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
  }

  goback() {
    this.location.back()
  }

  send() {

    if (this.name == '') {
      this.extra.presentToast('Name is required')
    }
    else if (this.email == '') {
      this.extra.presentToast('Email is required')
    }
    else if (this.desc == '') {
      this.extra.presentToast('Subject is required')
    }
    else {
      if (!this.validateEmail(this.email)) {
        this.extra.presentToast('Invalid Email address')
      } else {
        let data = {
          "users_customers_id": localStorage.getItem('user_Id'),
          "name": this.name,
          "email": this.email,
          "subject": this.desc
        }
        this.extra.loadershow()
        this.api.sendRequest('user_feedback', data).subscribe((res: any) => {
          console.log(res);
          this.extra.hideLoader()
          if (res.status == 'success') {
            this.extra.presentToast('Feedback send successfully');
            this.navCtrl.navigateRoot('home')
          } else {
            this.extra.presentToast('Some error occured');
          }
        }, err => {
          this.extra.hideLoader()
        })
      }

    }

  }






  validateEmail(email: any) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
