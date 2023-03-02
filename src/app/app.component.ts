import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public navCtrl: NavController) {

    console.log(localStorage.getItem('user_id'));

    // if (localStorage.getItem('user_id') == '' || localStorage.getItem('user_id') == null) {
    //   this.navCtrl.navigateRoot('getstart')
    // } else {
    //   if (localStorage.getItem('status') == 'Active') {
    //     this.navCtrl.navigateRoot('home');
    //   } else {
    //     this.navCtrl.navigateRoot('loginscreen');
    //   }

    // }
  }
}
