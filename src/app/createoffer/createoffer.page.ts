import { Component, OnInit,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import * as moment from 'moment';
@Component({
  selector: 'app-createoffer',
  templateUrl: './createoffer.page.html',
  styleUrls: ['./createoffer.page.scss'],
})
export class CreateofferPage implements OnInit {
 
  basecurrency: any;
  excurrency: any;
  totalamount: any;
  excahngerate: any;
  ExpiresIn: any;
  showcurr = false;
  showexccurr = false;
  // currencies = [{ curr: 'Euro' }, { curr: 'Dollar' }, { curr: 'INR' }]
  currencies: any;
  walletslist: any;
  currId: any;
  tocurrId: any;
  systemcurrID: any;
  selectedDateTime:any
  formattedDateTime:any='Select Date and Time';
  parsedDate: any;
  isModalOpen = false;
  constructor(public location: Location,
    public api: ApiService,
    public extra: ExtraService,
    public alertController: AlertController,
    public navCtrl: NavController,
    public modal:ModalController) { }

  ngOnInit() {
    this.walletlist()
    this.getcurrencies()
    this.getbasecurr()
  }

  goback() {
    this.location.back()
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    const date = new Date(this.selectedDateTime);
    this.formattedDateTime=moment(date).format('yyyy-MM-DD H:mm:ss');
  }
  
  openList() {
    if (this.walletslist.length == 0) {
      this.presentAlert()
    } else {
      if (this.showcurr == true) {
        this.showcurr = false;
      } else {
        this.showcurr = true;
      }
    }
  }

  openexcList() {
    if (this.showexccurr == true) {
      this.showexccurr = false;
    } else {
      this.showexccurr = true;
    }
  }
  selectcurrency(list: any, index: any) {
    this.basecurrency = list.currency.code
    this.currId = list.currency.system_currencies_id
    this.showcurr = false;
  }

  selectexcurrency(list: any, index: any) {
    this.excurrency = list.code
    this.tocurrId = list.system_currencies_id
    this.showexccurr = false;
  }

  walletlist() {
    // this.extra.loadershow()
    let datasend = {
      "users_customers_id": localStorage.getItem('user_Id'),
    }
    this.api.sendRequest('get_wallet', datasend).subscribe((response: any) => {
      console.log('get_wallet=========', response);
      if (response.status == 'success') {
        this.walletslist = response.data
        this.extra.hideLoader()
      } else {
        this.extra.hideLoader()
      }
    })
  }
  getcurrencies() {
    this.api.getRequest('all_currencies').subscribe((curr: any) => {
      console.log(curr);
      this.currencies = curr.data
      this.currencies.sort((a: any, b: any) => a.name.localeCompare(b.name))
    })
  }
  getbasecurr() {
    this.api.sendRequest('get_currencies_by_id', { "system_currencies_id": localStorage.getItem('systemcurr') }).subscribe((curr: any) => {
      console.log(curr);
      // this.basecurrency = curr.data[0].name + '(' + curr.data[0].code + ')'
      // this.basecurrency = '(' + curr.data[0].symbol + ')' + curr.data[0].name
      this.systemcurrID = curr.data[0].system_currencies_id
      // this.currsymbol = curr.data[0].symbol

    })
  }

  createoffer() {
   
    let data = {
      "users_customers_id": localStorage.getItem('user_Id'),
      "from_system_currencies_id": this.currId,
      "to_system_currencies_id": this.tocurrId,
      "from_amount": this.totalamount,
      "exchange_rate": this.excahngerate,
      "system_currencies_id": this.systemcurrID,
      "expiry_time": this.formattedDateTime
    }
    this.presentalert("You Offer " + this.totalamount + " " + this.basecurrency + " against " + this.excurrency + " with exchange rate " + this.excahngerate + ". Are you sure you want to create this offer?", data)
  }


  async presentalert(message: any, data: any) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.api.sendRequest('swap_offer', data).subscribe((rsp: any) => {
              console.log('offer response====', rsp);
              if (rsp.status == 'success') {
                this.extra.presentToast('Offer created successfully');
                this.navCtrl.navigateForward('home');
              } else {
                this.extra.presentToast(rsp.message)
              }
            })
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          },
        },
      ],
    });

    await alert.present();


  }

  async presentAlert() {
    const alert = await this.alertController.create({

      message: 'No wallet amount exist',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
