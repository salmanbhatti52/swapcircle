import { Component } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { ApiService } from "./services/api.service";
// import OneSignal from 'onesignal-cordova-plugin';
import OneSignal from 'onesignal-cordova-plugin';
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
    console.log(localStorage.getItem('user_Id'));

    if (localStorage.getItem('user_Id') == '' || localStorage.getItem('user_Id') == null) {
      this.navCtrl.navigateRoot('onboard')
    } else {

      this.navCtrl.navigateRoot('home');
    }

    this.pushNotification()
  }
  
  pushNotification() {
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(6)
    
    // Replace YOUR_ONESIGNAL_APP_ID with your OneSignal App ID
    OneSignal.initialize("3e72c5cc-01d7-4486-90cd-95a58b7a8d7a");

    OneSignal.Notifications.addEventListener('click', async (e) => {
      let clickData = await e.notification;
      console.log("Notification Clicked : " + clickData);
    })

    OneSignal.Notifications.requestPermission(true).then((success: Boolean) => {
      console.log("Notification permission granted " + success);
    });

  }

  handleSharedButtonClick() {
    // Handle the shared button click action here
    this.navCtrl.navigateForward('createsawap');
    console.log('Shared button clicked!');
  }
}
