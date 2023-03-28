import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferpopupPage } from './offerpopup.page';

const routes: Routes = [
  {
    path: '',
    component: OfferpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferpopupPageRoutingModule {}
