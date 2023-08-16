import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackPageRoutingModule } from './track-routing.module';

import { TrackPage } from './track.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [TrackPage]
})
export class TrackPageModule { }
