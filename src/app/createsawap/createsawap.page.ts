import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-createsawap',
  templateUrl: './createsawap.page.html',
  styleUrls: ['./createsawap.page.scss'],
})
export class CreatesawapPage implements OnInit {
  basecurrency: any;
  excurrency: any = '';
  totalamount: any = '';
  excahngerate: any;

  showcurr = false;
  showexccurr = false;
  currencies = [{ curr: 'Euro' }, { curr: 'Dollar' }, { curr: 'INR' }]
  walletslist: any;
  currsymbol: any;
  currID: any;
  fromcurrency: any = '';
  fromwalletamount: any = '';
  towalletamount: any = '';
  fromamount = false;
  Toamount = false;
  fromwalletId: any;
  towalletId: any;
  term: any;
  constructor(public location: Location,
    public api: ApiService,
    public extra: ExtraService,
    public navCtrl: NavController,
    public alert: AlertController) { }

  ngOnInit() {
    this.getbasecurr()
    this.walletslist = this.api.wallets;
    console.log("walletslist: ",this.walletslist);
    
    // this.walletlist()
  }




  goback() {
    this.location.back()
  }
  getbasecurr() {
    this.api.sendRequest('get_currencies_by_id', { "system_currencies_id": localStorage.getItem('systemcurr') }).subscribe((curr: any) => {
      console.log(curr);
      // this.basecurrency = curr.data[0].name + '(' + curr.data[0].code + ')'
      this.basecurrency = curr.data[0].symbol + " " + '-' + " " + curr.data[0].code
      this.currID = curr.data[0].system_currencies_id
      this.currsymbol = curr.data[0].symbol

    })
  }
  walletlist() {
    let datasend = {
      "users_customers_id": localStorage.getItem('user_Id'),
    }
    this.api.sendRequest('get_wallet', datasend).subscribe((response: any) => {
      console.log('get_wallet=========', response);
      this.walletslist = response.data
    })
  }

  openList() {
    if (this.walletslist.length == 0) {
      this.presentAlert()
    } else {
      if (this.showcurr == true) {
        this.showcurr = false;
      } else {
        this.showcurr = true;
        this.fromamount = false;
      }
    }

  }

  openexcList() {
    if (this.walletslist.length == 0) {
      this.presentAlert()
    } else {
      if (this.showexccurr == true) {
        this.showexccurr = false;
      } else {
        this.showexccurr = true;
        this.Toamount = false;
      }
    }
  }
  onSearch(searchTerm: any) {
    // Perform your logic here with the search term
    console.log('Search term:', searchTerm);
    this.showcurr = true;
    if (searchTerm.inputType == 'deleteContentBackward') {
      this.fromamount = false;

    }
  }
  onSearch2(searchTerm: any) {
    // Perform your logic here with the search term
    console.log('Search term:', searchTerm);
    this.showexccurr = true;
    if (searchTerm.inputType == 'deleteContentBackward') {
      this.Toamount = false;

    }
  }
  selectcurrency(list: any, index: any) {
    console.log(list);

    this.fromcurrency = list.currency.code
    this.fromwalletamount = list.wallet_amount
    this.fromwalletId = list.users_customers_wallets_id
    this.showcurr = false;
    this.fromamount = true;
  }

  selectexcurrency(list: any, index: any) {
    this.excurrency = list.currency.code
    this.towalletamount = list.wallet_amount
    this.showexccurr = false;
    this.Toamount = true;
    this.towalletId = list.users_customers_wallets_id
    if (parseFloat(this.totalamount) > parseFloat(this.fromwalletamount)) {

      this.extra.presentalert("The amount you're trying to transfer exceeds your available balance")


    }
  }

  Enteramount(ev: any) {
    console.log(ev);

    this.totalamount = ev.target.value

    if (parseFloat(this.totalamount) > parseFloat(this.fromwalletamount)) {
      if (ev.detail.inputType != 'deleteContentBackward') {
        this.extra.presentalert("The amount you're trying to transfer exceeds your available balance").then(() => {
          if (this.extra.data.role == "confirm") {

            this.totalamount = ''
          }
        })
      }


    }

  }

  save() {
    if (this.fromcurrency == '') {
      this.extra.presentToast('Select currency from account')
    }
    else if (this.totalamount == '') {
      this.extra.presentToast('Select amount to transfer')
    } else if (this.excurrency == '') {
      this.extra.presentToast('Select currency for To account')
    } else {
      this.Alerboxt()
    }
  }

  async presentAlert() {
    const alert = await this.alert.create({

      message: 'No wallet exist',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async Alerboxt() {
    const alert = await this.alert.create({
      message: 'Are you sure to transfer' + ' ' + this.fromcurrency + this.totalamount + ' ' + 'to account' + ' ' + this.excurrency,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
            let data = {
              "users_customers_id": localStorage.getItem('user_Id'),
              "from_users_customers_wallets_id": this.fromwalletId,
              "to_users_customers_wallets_id": this.towalletId,
              "amount_from": this.totalamount,
              "system_currencies_id": localStorage.getItem('systemcurr')
            }
            console.log(data);
            
            this.extra.loadershow()
            this.api.sendRequest('wallet_swap', data).subscribe((res: any) => {
              console.log('wallet response=====', res);
              if (res.status == 'success') {
                this.extra.hideLoader()
                this.extra.presentToast('Amount transfer successfully');
                this.navCtrl.navigateForward('home')
              } else {
                this.extra.presentToast(res.message)
              }
            }, err => {
              this.extra.hideLoader();
              this.extra.presentToast('Something went wrong')
            })
          },
        },
        {
          text: 'No',
          cssClass: 'alert-button-confirm',
          handler: () => {

          },
        },
      ]


    });

    await alert.present();
  }

}
