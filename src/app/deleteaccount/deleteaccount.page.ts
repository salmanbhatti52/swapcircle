import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.page.html',
  styleUrls: ['./deleteaccount.page.scss'],
})
export class DeleteaccountPage implements OnInit {
  delreason: any = ''
  desc: any = '';
  email: any;
  userdetail: any;
  user: any;
  constructor(public location: Location,
    public api: ApiService,
    public extra: ExtraService) { }

  ngOnInit() {
    this.userdetail = localStorage.getItem('userdeatil')

    this.user = JSON.parse(this.userdetail)
    console.log(this.user);
  }


  goback() {
    this.location.back()
  }

  delete() {
    if (this.delreason == '') {
      this.extra.presentToast('Delete reason required')
    }
    else if (this.desc == '') {
      this.extra.presentToast('Comments required')
    }
    else {
      let data = {
        "user_email": this.user.email,
        "delete_reason": this.delreason,
        "comments": this.desc
      }
      this.api.sendRequest('delete_account', data).subscribe((res: any) => {

        if (res.status == 'success') {
          this.extra.presentToast(res.message)
        } else {
          this.extra.presentToast(res.message)
        }
      })
    }
  }

}
