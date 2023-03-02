import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Signup4PageRoutingModule } from './signup4-routing.module';

import { Signup4Page } from './signup4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Signup4PageRoutingModule
  ],
  declarations: [Signup4Page]
})
export class Signup4PageModule {}
