import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatesawapPage } from './createsawap.page';

const routes: Routes = [
  {
    path: '',
    component: CreatesawapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatesawapPageRoutingModule {}
