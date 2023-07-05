import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatesawapPageRoutingModule } from './createsawap-routing.module';

import { CreatesawapPage } from './createsawap.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatesawapPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [CreatesawapPage]
})
export class CreatesawapPageModule { }
