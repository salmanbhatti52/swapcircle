import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwapofferrequestsPage } from './swapofferrequests.page';

const routes: Routes = [
  {
    path: '',
    component: SwapofferrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwapofferrequestsPageRoutingModule {}
