import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HouseEventsPageRoutingModule } from './house-events-routing.module';

import { HouseEventsPage } from './house-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HouseEventsPageRoutingModule
  ],
  declarations: [HouseEventsPage]
})
export class HouseEventsPageModule {}
