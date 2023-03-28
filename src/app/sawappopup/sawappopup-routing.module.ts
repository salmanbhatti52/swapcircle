import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SawappopupPage } from './sawappopup.page';

const routes: Routes = [
  {
    path: '',
    component: SawappopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SawappopupPageRoutingModule {}
