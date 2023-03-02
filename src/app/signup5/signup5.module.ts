import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Signup5PageRoutingModule } from './signup5-routing.module';

import { Signup5Page } from './signup5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Signup5PageRoutingModule
  ],
  declarations: [Signup5Page]
})
export class Signup5PageModule {}
