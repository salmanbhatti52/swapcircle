import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ExtraService } from '../services/extra.service';
@Component({
  selector: 'app-sendcurrency',
  templateUrl: './sendcurrency.page.html',
  styleUrls: ['./sendcurrency.page.scss'],
})
export class SendcurrencyPage implements OnInit {
  // allItems: any = [];
  // public items: any = [];
  countriesList: any;
  basecurrency: any = '';
  fromcurrency: any = ''
  excurrency: any = '';
  totalamount: any = '';
  excahngerate: any;
  email: any = '';
  showcurr = false;
  showexccurr = false;
  // currencies = [{ curr: 'Euro' }, { curr: 'Dollar' }, { curr: 'INR' }];
  currencies: any;
  showcountry = false;
  country: any = '';
  listofuser: any;
  emailsshow = false;
  exchangecurrId: any;
  basecurrId: any;
  users_customers_id: any;
  countryID: any;
  currcode: any;
  convertedrate: any;
  rateafterpoint: any;
  convertedamount: any;
  amountafterpoint: any;
  excurrcode: any;
  excurrsymbol: any;
  currsymbol: any;

  amountshow = false;
  currID: any;
  walletslist: any;
  otherUserWallets:any = [];
  walletAvailable: boolean = true;
  availableWallets:string = '';

  constructor(public location: Location,
    private http: HttpClient,
    public navCtrl: NavController,
    public extra: ExtraService,
    public api: ApiService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getbasecurr()
    this.walletlist()
    this.getcurrencies()
    this.getcountries()

  }

  goback() {
    this.location.back()
  }
  getbasecurr() {
    this.api.sendRequest('get_currencies_by_id', { "system_currencies_id": localStorage.getItem('systemcurr') }).subscribe((curr: any) => {
      console.log(curr);
      this.basecurrency = curr.data[0].symbol + " " + '-' + " " + curr.data[0].code
      this.currID = curr.data[0].system_currencies_id
      this.currsymbol = curr.data[0].symbol
      localStorage.setItem('basecurrsymbol', this.currsymbol)
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
  getcurrencies() {
    this.api.getRequest('all_currencies').subscribe((res: any) => {
      console.log(res);
      this.currencies = res.data
      this.currencies.sort((a: any, b: any) => a.name.localeCompare(b.name))

      console.log("currencies: ",this.currencies);

    })
  }
  getcountries() {
    this.api.getRequest('all_countries').subscribe((res: any) => {
      console.log(res);
      this.countriesList   = res.data
      this.countriesList.sort((a: any, b: any) => a.name.localeCompare(b.name));
      console.log("countriesList: ",this.countriesList);
      
    })

  }


  onSearch(searchTerm: any) {
    // Perform your logic here with the search term
    console.log('Search term:', searchTerm);
    this.showcurr = true;
    if (searchTerm.inputType == 'deleteContentBackward') {


    }
  }
  onSearch2(searchTerm: any) {
    // Perform your logic here with the search term
    console.log('Search term:', searchTerm);
    this.showexccurr = true;
    if (searchTerm.inputType == 'deleteContentBackward') {

    }
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
    this.getcurrencies()
    if (this.showexccurr == true) {
      this.showexccurr = false;
    } else {
      this.showexccurr = true;
    }
  }
  selectcurrency(list: any, index: any) {

    this.fromcurrency = list.currency.code
    this.currsymbol = list.currency.symbol
    this.basecurrId = list.system_currencies_id
    this.showcurr = false;
    if (this.fromcurrency != '') {
      this.exchangerate()
    }
  }

  selectexcurrency(list: any, index: any) {

    this.excurrency = list.name
    this.excurrsymbol = list.symbol
    this.exchangecurrId = list.system_currencies_id
    this.showexccurr = false;
    if (this.excurrency != '') {
      console.log("excurrency: ",this.excurrency);
      console.log('list excurrency: ',list);
      
      
      this.exchangerate()
    }
  }

  openCountryList() {
    if (this.showcountry == true) {
      this.showcountry = false;
    } else {
      this.showcountry = true;
    }
  }
  selectcountry(list: any, index: any) {
    localStorage.setItem('country', list.name)
    this.country = list.name
    this.countryID = list.system_countries_id
    this.showcountry = false;
  }

  async selectemail(item: any, i: any) {
    const alert = await this.alertController.create({
      subHeader: 'Are you sure to select this email?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // this.email = item.email
            // this.emailsshow = false;
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            localStorage.setItem('recieverdetail', JSON.stringify(item));
            this.email = item.email;
            this.otherUserWallets = item.users_customers_wallets;
            this.users_customers_id = item.users_customers_id
            this.emailsshow = false;
          },
        },
      ],
    });

    await alert.present();

    
    
  }
  eventHandler(ev: any) {
    console.log(ev.target.value);
    this.api.sendRequest('all_users_suggested', { "email": ev.target.value }).subscribe((res: any) => {
      console.log('all_user_info',res);
      
      if (res.status == 'success') {
        this.emailsshow = true
        console.log(res);
        this.listofuser = res.data
      } else {
        this.emailsshow = false;
      }

    })

  }

  Examount(ev: any) {
    console.log(ev.target.value);
    this.totalamount = ev.target.value
    this.exchangerate()

  }

  exchangerate() {
    let datasend = {
      "sender_currency_id": this.basecurrId,
      "receiver_currency_id": this.exchangecurrId,
      "from_amount": this.totalamount
    }
    if (this.fromcurrency != '' && this.excurrency != '') {
      this.api.sendRequest('currency_converter', datasend).subscribe((p: any) => {
        console.log(p);
        if (p.status == 'success') {

          this.amountshow = true;
          let p1 = p.data.converted_rate
          let pp = p1.toFixed(2)
          let instr = String(pp)
          let p2 = instr.split('.')
          console.log(p2);
          this.convertedrate = p2[0]
          let fixedto = p2[1]
          this.rateafterpoint = p2[1]


          let p3 = p.data.converted_amount
          let pp3 = p3.toFixed(2)
          let p3str = String(pp3)
          let p4 = p3str.split('.')
          console.log(p4);
          this.convertedamount = p4[0]
          this.amountafterpoint = p4[1]
        } else {
          // this.excurrsymbol = ''
          // this.convertedrate = ''
          // this.convertedrate = ''
          // this.excurrsymbol = ''
          // this.convertedamount = ''
          // this.amountafterpoint = ''
          this.amountshow = false;
          this.extra.presentToast(p.message)
        }


      })
    }



  }
  next() {
    if (this.fromcurrency == '') {
      this.extra.presentToast('Select from currency')
    } else if (this.totalamount == '') {
      this.extra.presentToast('Select total amount')
    }
    else if (this.excurrency == '') {
      this.extra.presentToast('Select exchange amount')
    }
    else if (this.email == '') {
      this.extra.presentToast('Select email to send')
     
    }
    // else if (this.country == '') {
    //   this.extra.presentToast('Select country')
    // }
    else {
       // if(this.excurrency != ''){
        this.walletAvailable =  this.otherUserWallets.some((wallet:any,index:number)=> {
          if(wallet.system_currencies.name === this.excurrency){
            console.log("system_currencies.name: ",wallet.system_currencies.name);
            console.log("excurrency: ",this.excurrency);
            return true;
          }else{
            return false;
          }
          
  
        });
        this.availableWallets = 'Available wallets are ';
        this.otherUserWallets.forEach((wallet:any,index:number) => {
          if(this.otherUserWallets.length>1){
            if( index == this.otherUserWallets.length-1){
              this.availableWallets += ''+ wallet.system_currencies.name + '.'
            }else{
              this.availableWallets +=  wallet.system_currencies.name + ', '
            }
          }else if(this.otherUserWallets.length>0){
            this.availableWallets += wallet.system_currencies.name + '.'
          }
          
        });
        // this.otherUserWallets.
        if(!this.walletAvailable){
          this.extra.presentToast('Selected Exchange Wallet is not available.');
        }else{
          let data = {
            "from_users_customers_id": localStorage.getItem('user_Id'),
            "from_system_currencies_id": this.basecurrId,
            "from_amount": this.totalamount,
            "to_users_customers_id": this.users_customers_id,
            "to_system_currencies_id": this.exchangecurrId,
            "payment_method_id": 1,
            "system_countries_id": this.countryID,
            "system_currencies_id": this.currID
          }
          localStorage.setItem('transfer_currency', JSON.stringify(data));
          let amounts = {
            basecurrsymbol: this.currsymbol,
            totalamount: this.totalamount,
            excurrsymbol: this.excurrsymbol,
            convertedamount: this.convertedamount,
            amountafterpoint: this.amountafterpoint,
    
          }
          localStorage.setItem('amountdetail', JSON.stringify(amounts))
          this.navCtrl.navigateForward('sendcurrency2');
        }
        
      // }
      
    }



  }

  async presentAlert() {
    const alert = await this.alertController.create({

      message: 'No currency exist',
      cssClass: 'custom-alert2',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
