import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chat = [{ image: 'assets/imgs/picon.svg', name: 'James Anderson', msg: 'Have a good one!', time: '20 minute ago', chatopen: 0 },
  { image: 'assets/imgs/picon.svg', name: 'James Anderson', msg: 'Have a good one!', time: '20 minute ago', chatopen: 1 },
  { image: 'assets/imgs/picon.svg', name: 'James Anderson', msg: 'Have a good one!', time: '20 minute ago', chatopen: 0 }
  ]
  constructor(public location: Location,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  goback() {
    this.location.back()
  }
  goto() {
    this.navCtrl.navigateForward('chatdetail')
  }


}
