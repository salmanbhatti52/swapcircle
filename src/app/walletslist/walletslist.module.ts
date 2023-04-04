import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletslistPageRoutingModule } from './walletslist-routing.module';

import { WalletslistPage } from './walletslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletslistPageRoutingModule
  ],
  declarations: [WalletslistPage]
})
export class WalletslistPageModule {}
