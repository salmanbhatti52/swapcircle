import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Signup5Page } from './signup5.page';

const routes: Routes = [
  {
    path: '',
    component: Signup5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Signup5PageRoutingModule {}
