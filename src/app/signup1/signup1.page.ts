import { NavController } from '@ionic/angular';
import { ExtraService } from './../services/extra.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Countries, Country } from "./interface";
import { SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-signup1',
  templateUrl: './signup1.page.html',
  styleUrls: ['./signup1.page.scss'],
})
export class Signup1Page implements OnInit {
  allItems: Array<Country> = [];
  public items: Array<Country> = [];
  safeUrl!: SafeResourceUrl;

  fname: any = '';
  sname: any = '';
  email: any = '';
  num: any = '';

  showflags = false;
  nation = false;
  flaglist = false
  flagimage: any;
  showimage = false;
  upicon = false;
  callingcode: any;
  nationality: any;
  customertype: any;
  constructor(public router: Router,
    private http: HttpClient,
    public rest: ExtraService,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.customertype = localStorage.getItem('customertype')
    console.log(this.customertype);

  }

  openfflaglist() {

    if (this.upicon == false) {
      this.upicon = true;
      this.flaglist = true;
    } else {
      this.upicon = false;
      this.flaglist = false;
    }

    this.showflags = true
    this.setItems();
  }
  setItems() {
    this.http.get('assets/countries.json').toPromise().then(
      (res: any) => {
        this.allItems = res.countries;
        this.items = this.allItems;
        // console.log('items', this.items);

      }
    );
  }

  filterItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      val = val.toLowerCase();
      this.items = this.items.filter((item) => {
        return item.name.toLowerCase().includes(val)
          || item.nativeName.includes(val)
          || item.capital.toLowerCase().includes(val);
      });
    } else {
      this.items = this.allItems;
    }

  }
  viewDetails(item: any) {
    // console.log('code===', item.callingCodes[0])
    this.flaglist = false
    this.flagimage = item.flag
    this.showimage = true;
    this.upicon = false;
    this.nationality = item.name
    this.callingcode = '+' + item.callingCodes[0];
    console.log('code===', this.callingcode)
  }
  goNext() {
    if (this.fname == '') {
      if (this.customertype == 'Individual') {
        this.rest.presentToast('First Name Required')
      } else {
        this.rest.presentToast('Company Name Required')
      }
    }
    else if (this.sname == '') {
      if (this.customertype == 'Individual') {
        this.rest.presentToast('Surname Name Required')
      } else {
        this.rest.presentToast('Representative Name Required')
      }
    }
    else if (this.num == '') {
      this.rest.presentToast('Phone Number Required')
    }
    else if (this.email == '') {
      this.rest.presentToast('Email Required')
    } else {
      if (!this.validateEmail(this.email)) {
        this.rest.presentToast('Invalid Email address')
      } else {
        localStorage.setItem('fname', this.fname)
        localStorage.setItem('sname', this.sname)
        localStorage.setItem('num', this.num)
        localStorage.setItem('email', this.email)

        this.navCtrl.navigateForward('signup2');
      }

    }

  }
  goToSignin() {
    this.navCtrl.navigateForward('loginscreen');
  }







  validateEmail(email: any) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
