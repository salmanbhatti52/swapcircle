import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sendcurrency2Page } from './sendcurrency2.page';

const routes: Routes = [
  {
    path: '',
    component: Sendcurrency2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sendcurrency2PageRoutingModule {}
