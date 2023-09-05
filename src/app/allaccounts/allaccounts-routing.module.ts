import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllaccountsPage } from './allaccounts.page';

const routes: Routes = [
  {
    path: '',
    component: AllaccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllaccountsPageRoutingModule {}
