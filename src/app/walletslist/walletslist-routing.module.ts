import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletslistPage } from './walletslist.page';

const routes: Routes = [
  {
    path: '',
    component: WalletslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletslistPageRoutingModule {}
