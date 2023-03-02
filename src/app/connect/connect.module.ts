import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectPageRoutingModule } from './connect-routing.module';

import { ConnectPage } from './connect.page';
import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectPageRoutingModule,
    SwiperModule
  ],
  declarations: [ConnectPage]
})
export class ConnectPageModule { }
