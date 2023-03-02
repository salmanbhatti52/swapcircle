import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-getstart',
  templateUrl: './getstart.page.html',
  styleUrls: ['./getstart.page.scss'],
})
export class GetstartPage implements OnInit {
  constructor(public navCtrl: NavController) { }

  ngOnInit() { }

  goToIndividual() {
    localStorage.setItem('customertype', 'Individual');
    this.navCtrl.navigateForward('signup1');
  }

  goToCorporate() {
    this.navCtrl.navigateForward('signup1');
    localStorage.setItem('customertype', 'Company');
  }

  goToSignin() {
    this.navCtrl.navigateForward('loginscreen');
  }
}
