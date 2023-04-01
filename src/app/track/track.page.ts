import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "../services/api.service";
import { ExtraService } from "../services/extra.service";

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
  tosystemId: any;
  fromsystemId: any;
  amount: any;
  constructor(
    public navCtrl: NavController,
    public api: ApiService,
    public extra: ExtraService
  ) {}

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
      this.curr.sort((a: any, b: any) => a.name.localeCompare(b.name));

      // console.log(this.exchangecurr);
    });
  }

  optionsFn(ev: any) {
    console.log(ev);

    this.fromsystemId = ev.detail.value;
  }
  choose(s: any) {
    console.log(s);
  }
  optionsFn2(ev: any) {
    this.tosystemId = ev.detail.value;
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
