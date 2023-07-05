import { Component } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
// import OneSignal from 'onesignal-cordova-plugin';
import { ApiService } from "./services/api.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  sender_id = "558453112065";
  oneSignalAppId = "925e80ab-a9d8-4e29-9824-f1956346665c";
  intervalId: any;
  constructor(public navCtrl: NavController, public platform: Platform, public api: ApiService) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.initializeApp();
    });
  }

  initializeApp() {
    console.log(localStorage.getItem("user_id"));

    if (localStorage.getItem('user_id') == '' || localStorage.getItem('user_id') == null) {
      this.navCtrl.navigateRoot('onboard')
    } else {

      this.navCtrl.navigateRoot('home');
    }

    // this.pushNotification()
  }
  // pushNotification() {
  //   console.log('push notification in function.....');
  //   OneSignal.setAppId("925e80ab-a9d8-4e29-9824-f1956346665c");

  //   OneSignal.setNotificationOpenedHandler((jsonData) => {
  //     console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  //   });

  //   OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
  //     console.log('accepted response----', accepted);

  //   })
  //   OneSignal.addSubscriptionObserver(async (event: any) => {
  //     console.log('addSubscriptionObserver response----', event);
  //     await OneSignal.getDeviceState((res) => {
  //       console.log('getDeviceState response----', res);
  //       localStorage.setItem('onesignalId', res.userId)
  //     })
  //   })

  // }
}
