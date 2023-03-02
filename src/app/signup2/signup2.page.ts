import { NavController } from '@ionic/angular';
import { ExtraService } from './../services/extra.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.page.html',
  styleUrls: ['./signup2.page.scss'],
})
export class Signup2Page implements OnInit {
  RegisterForm: any = FormGroup;
  adress: any = '';
  pass1: any = '';
  pass2: any = '';

  showPass = false;
  showcPass = false;
  constructor(public router: Router,
    public rest: ExtraService,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.RegisterForm = new FormGroup({
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&].{7,}')]),
      cpassword: new FormControl('', [Validators.required]),
    });
    this.RegisterForm.reset();
  }

  goNext() {
    if (this.adress == '') {
      this.rest.presentToast('Address is required')
    } else if (this.pass1 == '') {
      this.rest.presentToast('Password is required')
    }
    else if (this.pass2 == '') {
      this.rest.presentToast('Confirm Password is required')
    }
    else if (this.pass1 != this.pass2) {
      this.rest.presentToast('"Password" and "Confirm_password" not matched!');
    } else {
      localStorage.setItem('address', this.adress)
      localStorage.setItem('pass', this.pass1)
      localStorage.setItem('confirmpass', this.pass2)
      this.navCtrl.navigateForward('signup3');
    }


  }

  togglePass() {
    this.showPass = !this.showPass;
  }
  togglecPass() {
    this.showcPass = !this.showcPass;
  }
  goToSignin() {
    this.navCtrl.navigateForward('loginscreen');
  }
}
