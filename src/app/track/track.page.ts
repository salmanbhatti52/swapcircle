import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "../services/api.service";
import { ExtraService } from "../services/extra.service";
import { log } from "console";
import { threadId } from "worker_threads";

@Component({
  selector: "app-track",
  templateUrl: "./track.page.html",
  styleUrls: ["./track.page.scss"],
})
export class TrackPage implements OnInit {
  @ViewChild("mySegment", { read: ElementRef })
  private mySegment!: ElementRef;
  tact = true;
  requestsType: any;
  curr: any;
  symbol: any;
  fromsystemId: any = '2';
  tosystemId: any = '11';

  amount: any = '';
  currcode: any = 'USD';
  // currcode: any;
  tocurrcode: any = 'EUR';
  convertedamount: any;
  amountafterpoint: any;
  amountshow = false
  currsymbol: any = '$';
  // currsymbol: any;
  tocurrsymbol: any = '€';
  baseamt: any;
  basecurrID: any;
  basecurrsymbol: any;
  resshow = false;
  searchTerm: any;
  term: any;

  isModalOpen = false;
  Tocurrmodalopen = false;
  currval: any;
  adminrate: any;

  constructor(
    public navCtrl: NavController,
    public api: ApiService,
    public extra: ExtraService
  ) { }

  ngOnInit() {
    this.getcurrencies();
  }

  ionViewWillEnter() {
    this.getbasecurr()
    if (this.requestsType) {
      if (this.requestsType === "Buy") {
        this.mySegment.nativeElement.children[0].click();
      }
      if (this.requestsType === "Sell") {
        this.mySegment.nativeElement.children[1].click();
      }
    } else {
      this.requestsType = "Buy";
      this.mySegment.nativeElement.children[0].click();
    }
  }
  segmentChanged(ev: any) {
    console.log("requestType value", ev.detail.value);
    let data = ev.detail.value;
    this.requestsType = data;
    if (ev.detail.value === "Buy") {
      this.requestsType = "Buy";
    }
    if (ev.detail.value === "Sell") {
      this.requestsType = "Sell";
    }
    localStorage.setItem("requestType", this.requestsType);
  }
  goNext() {
    this.navCtrl.navigateForward("billingpayment");
  }
  getcurrencies() {
    this.api.getRequest("all_currencies").subscribe((res: any) => {
      console.log(res);
      this.curr = res.data;
      this.curr.sort((a: any, b: any) => a.code.localeCompare(b.code));

      // console.log(this.exchangecurr);
    });
  }
  getbasecurr() {
    this.api.sendRequest('get_currencies_by_id', { "system_currencies_id": localStorage.getItem('systemcurr') }).subscribe((curr: any) => {
      console.log(curr);

      this.basecurrID = curr.data[0].system_currencies_id
      this.basecurrsymbol = curr.data[0].symbol
      localStorage.setItem('basecurrsymbol', this.currsymbol)
    })
  }

  optionsFn(ev: any) {
    console.log(ev);
    let val = ev.detail.value
    this.currcode = val.code
    this.fromsystemId = val.system_currencies_id;
    this.currsymbol = val.symbol

    this.track()
  }

  optionsFn2(ev: any) {
    console.log(ev);
    let val = ev.detail.value
    this.tocurrcode = val.code
    this.tosystemId = val.system_currencies_id;
    this.tocurrsymbol = val.symbol
    this.track()
  }
  Enteramount(ev: any) {
    console.log(ev.target.value);

    this.amount = ev.target.value
    // this.track()
  }

  openmodal() {
    this.term = ''
    this.isModalOpen = true
  }
  closemodal(val: any) {
    console.log(val);
    this.currcode = val.code
    this.currsymbol = val.symbol
    this.fromsystemId = val.system_currencies_id;
    this.isModalOpen = false
  }
  Tocurrmodel() {
    this.term = ''
    this.Tocurrmodalopen = true
  }
  closeTocurrmodal(val: any) {
    console.log(val);
    this.tocurrcode = val.code
    this.tocurrsymbol = val.symbol
    this.tosystemId = val.system_currencies_id;
    this.Tocurrmodalopen = false
  }

  track() {
    if (this.amount != '') {


      this.extra.loadershow()
      let datatosend = {
        "from_system_currencies_id": this.fromsystemId,
        "to_system_currencies_id": this.tosystemId,
        "from_amount": this.amount
      }
      if (this.requestsType == "Buy") {
        this.api.sendRequest('buy_currency_rate', datatosend).subscribe((res: any) => {
          console.log('rate response====', res);
          if (res.status == 'success') {
            this.extra.hideLoader()
            this.amountshow = true
            let amt = res.data.converted_amount
            let pp = amt.toFixed(2)
            let instr = String(pp)
            let p2 = instr.split('.')
            this.convertedamount = p2[0]
            let fixedto = p2[1]
            console.log(this.convertedamount);

            this.amountafterpoint = p2[1];
            this.adminrate = res.data.admin_rate_amount
            this.exchangerate()
          } else {
            this.amountshow=false;
            this.convertedamount = '' 
            this.amountafterpoint = ''
            this.extra.presentToast(res.message)
            this.extra.hideLoader()
          }
        }, err => {
          this.extra.hideLoader()
        })
      } else {
        this.api.sendRequest('sell_currency_rate', datatosend).subscribe((res: any) => {
          console.log('rate response====', res);
          if (res.status == 'success') {
            this.extra.hideLoader()
            this.amountshow = true
            let amt = res.data.converted_amount
            let pp = amt.toFixed(2)
            let instr = String(pp)
            let p2 = instr.split('.')
            this.convertedamount = p2[0]
            let fixedto = p2[1]
            console.log(this.convertedamount);

            this.amountafterpoint = p2[1]

            //admin rate///
            this.adminrate = res.data.admin_rate_amount
            // let amt1 = res.data.admin_rate_amount
            // let pp1 = amt1.toFixed(2)
            // let instr1 = String(pp1)
            // let p21 = instr.split('.')
            // this.admin_rate_amount = p21[0];
            // this.amountafterpoint = p21[1]
          } else {
            this.amountshow=false;
            this.convertedamount = '' 
            this.amountafterpoint = ''
            this.extra.presentToast(res.message)
            this.extra.hideLoader()
          }
        }, err => {
          this.extra.hideLoader()
        })
      }
    }

  }
  exchangerate() {
    let datasend = {
      "sender_currency_id": this.fromsystemId,
      "receiver_currency_id": this.basecurrID,
      "from_amount": this.amount
    }

    this.api.sendRequest('currency_converter', datasend).subscribe((p: any) => {
      console.log(p);
      if (p.status == 'success') {
        this.resshow = true;
        let base_amt = p.data.converted_amount
        this.baseamt = base_amt.toFixed(2)
      }

    })





  }
  tabClick() {
    this.navCtrl.navigateRoot("track");
  }
  tab1Click() {
    this.navCtrl.navigateRoot("home");
  }
  tab2Click() {
    this.navCtrl.navigateRoot("offer");
  }
  tab3Click() {
    this.navCtrl.navigateRoot("connect");
  }
  tab4Click() {
    this.navCtrl.navigateRoot("profile");
  }
}
