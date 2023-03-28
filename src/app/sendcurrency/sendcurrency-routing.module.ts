import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendcurrencyPage } from './sendcurrency.page';

const routes: Routes = [
  {
    path: '',
    component: SendcurrencyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendcurrencyPageRoutingModule {}
