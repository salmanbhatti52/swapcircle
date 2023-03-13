import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatesawapPageRoutingModule } from './createsawap-routing.module';

import { CreatesawapPage } from './createsawap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatesawapPageRoutingModule
  ],
  declarations: [CreatesawapPage]
})
export class CreatesawapPageModule {}
