import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCountPage } from './user-count.page';

const routes: Routes = [
  {
    path: '',
    component: UserCountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCountPageRoutingModule {}
