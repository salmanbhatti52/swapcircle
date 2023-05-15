import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
})
export class OnboardPage implements OnInit {
  onboard = [
    {
      id: 1,
      img: 'assets/imgs/ob1.svg',
      title: 'Digital Order Book..!',
      desc1: 'Buy and sell from',
      desc2: 'validated members!',
    },
    {
      id: 1,
      img: 'assets/imgs/ob2.svg',
      title: 'Closed Community..!',
      desc1: 'Your closed community',
      desc2: 'peer to peer swap',
      desc3: 'trading platform'
    },
    {
      id: 1,
      img: 'assets/imgs/ob3.svg',
      title: 'Worldwide..!',
      desc1: 'Transparent market',
      desc2: 'place for the users ',
    },
  ];

  constructor(public router: Router) { }

  ngOnInit() { }

  skip() {
    this.router.navigate(['getstart']);
  }
  goToSignup() {
    this.router.navigate(['getstart']);
  }
  goToSignin() {
    this.router.navigate(['loginscreen']);
  }
}
