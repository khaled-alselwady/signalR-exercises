import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCountPageRoutingModule } from './user-count-routing.module';

import { UserCountPage } from './user-count.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCountPageRoutingModule
  ],
  declarations: [UserCountPage]
})
export class UserCountPageModule {}
