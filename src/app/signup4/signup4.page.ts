import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signup4',
  templateUrl: './signup4.page.html',
  styleUrls: ['./signup4.page.scss'],
})
export class Signup4Page implements OnInit {

  constructor(public navCtrl: NavController,
    public route: Router,
    public modal: ModalController) {
    setTimeout(() => {
      this.modal.dismiss()

    }, 2500);
  }

  ngOnInit() {

  }


}
