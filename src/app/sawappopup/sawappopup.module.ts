import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SawappopupPageRoutingModule } from './sawappopup-routing.module';

import { SawappopupPage } from './sawappopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SawappopupPageRoutingModule
  ],
  declarations: [SawappopupPage]
})
export class SawappopupPageModule {}
