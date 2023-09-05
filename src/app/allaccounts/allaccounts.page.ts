import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-allaccounts',
  templateUrl: './allaccounts.page.html',
  styleUrls: ['./allaccounts.page.scss'],
})
export class AllaccountsPage implements OnInit {
  accounts: any;
  datalength: any;
  errtext: any;
  errtextshow = false;
  isModalOpen = false;
  showcurr = false;
  walletslist: any;
  currencyId: any;
  currency: any;
  bankname: any;
  accountnumber: any;
  amount: any;
  desc: any;
  accountId: any;
  walletId: any;
  constructor(public api: ApiService,
    public location: Location,
    public navCtrl: NavController,
    public extra: ExtraService,
    public modal: ModalController,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  goback() {
    this.location.back()
  }

  ionViewWillEnter() {
    this.getaccounts()
    this.walletlist()
  }

  walletlist() {
    this.extra.loadershow()
    let datasend = {
      "users_customers_id": localStorage.getItem('user_Id'),
    }
    this.api.sendRequest('get_wallet', datasend).subscribe((response: any) => {
      console.log('get_wallet=========', response);
      this.extra.hideLoader()
      this.walletslist = response.data
    })
  }
  openList() {
    if (this.showcurr == true) {
      this.showcurr = false;
    } else {
      this.showcurr = true;
    }
  }
  selectcurrency(list: any, index: any) {
    console.log(list);
    this.currency = list.currency.code
    this.walletId = list.users_customers_wallets_id
    this.showcurr = false;
  }
  onSearch(searchTerm: any) {
    // Perform your logic here with the search term
    console.log('Search term:', searchTerm);
    this.showcurr = true;
    if (searchTerm.inputType == 'deleteContentBackward') {


    }
  }
  getaccounts() {
    let datasend = {
      "users_customers_id": localStorage.getItem('user_Id'),
    }
    this.api.sendRequest('all_acounts', datasend).subscribe((res: any) => {
      console.log('resposne====', res);
      if (res.status == 'success') {
        this.datalength = res.data.length
        this.accounts = res.data
      } else {
        this.errtextshow = true;
        this.errtext = 'No data available';
      }

    })
  }
  setOpen(item: any) {
    this.isModalOpen = true;
    this.accountId = item.users_customers_accounts_id
    this.bankname = item.bank_name
    this.accountnumber = item.account_no
  }
  setclose() {
    this.isModalOpen = false;
  }
  edit() {

    this.isModalOpen = false;
    this.modal.dismiss()
    this.navCtrl.navigateForward('addaccount');

  }

  withdraw() {
    let data = {
      "users_customers_id": localStorage.getItem('user_Id'),
      "users_customers_wallets_id": this.walletId,
      "users_customers_accounts_id": this.accountId,
      "amount": this.amount,
      "description": this.desc
    }
    this.api.sendRequest('withdraw_wallets_request', data).subscribe((res: any) => {
      console.log('withdraw response:::', res);
      if (res.status == 'success') {
        this.presentAlert()
      } else {
        this.extra.presentToast(res.message)
      }
    })
  }
  goto() {
    this.navCtrl.navigateForward('addaccount');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'WithDraw Request',
      message: 'WithDraw will be completed after admin approvel!',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.isModalOpen = false;
            this.modal.dismiss()
            this.navCtrl.navigateRoot('home')
          },
        },
      ],
    });

    await alert.present();
  }

}
