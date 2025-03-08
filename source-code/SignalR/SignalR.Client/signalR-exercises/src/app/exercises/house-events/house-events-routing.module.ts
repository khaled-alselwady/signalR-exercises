import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseEventsPage } from './house-events.page';

const routes: Routes = [
  {
    path: '',
    component: HouseEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseEventsPageRoutingModule {}
