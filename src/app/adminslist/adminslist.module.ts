import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminslistPageRoutingModule } from './adminslist-routing.module';

import { AdminslistPage } from './adminslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminslistPageRoutingModule
  ],
  declarations: [AdminslistPage]
})
export class AdminslistPageModule {}
