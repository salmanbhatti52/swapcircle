import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "../services/api.service";
import { ExtraService } from "../services/extra.service";
import { log } from "console";

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

  amount: any;
  currcode: any = 'USD';
  tocurrcode: any = 'EUR';
  convertedamount: any;
  amountafterpoint: any;
  amountshow = false
  constructor(
    public navCtrl: NavController,
    public api: ApiService,
    public extra: ExtraService
  ) { }

  ngOnInit() {
    this.getcurrencies();
  }

  ionViewWillEnter() {
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

  optionsFn(ev: any) {
    console.log(ev);
    let val = ev.detail.value
    this.currcode = val.code
    this.fromsystemId = val.system_currencies_id;
  }

  optionsFn2(ev: any) {
    console.log(ev);
    let val = ev.detail.value
    this.tocurrcode = val.code
    this.tosystemId = val.system_currencies_id;
  }

  track() {
    let datatosend = {
      "from_system_currencies_id": this.fromsystemId,
      "to_system_currencies_id": this.tosystemId,
      "from_amount": this.amount
    }
    if (this.requestsType == "Buy") {
      this.api.sendRequest('buy_currency_rate', datatosend).subscribe((res: any) => {
        console.log('rate response====', res);
        if (res.status == 'success') {
          this.amountshow = true
          let amt = res.data.converted_amount
          let pp = amt.toFixed(2)
          let instr = String(pp)
          let p2 = instr.split('.')
          this.convertedamount = p2[0]
          let fixedto = p2[1]
          console.log(this.convertedamount);

          this.amountafterpoint = p2[1]
        }
      })
    } else {
      this.api.sendRequest('sell_currency_rate', datatosend).subscribe((res: any) => {
        console.log('rate response====', res);
        if (res.status == 'success') {
          this.amountshow = true
          let amt = res.data.converted_amount
          let pp = amt.toFixed(2)
          let instr = String(pp)
          let p2 = instr.split('.')
          this.convertedamount = p2[0]
          let fixedto = p2[1]
          console.log(this.convertedamount);

          this.amountafterpoint = p2[1]
        }
      })
    }
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
