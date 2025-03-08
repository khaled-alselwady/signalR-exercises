import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'user-count',
    loadChildren: () => import('./exercises/user-count/user-count.module').then( m => m.UserCountPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'voting',
    loadChildren: () => import('./exercises/voting/voting.module').then( m => m.VotingPageModule)
  },
  {
    path: 'house-events',
    loadChildren: () => import('./exercises/house-events/house-events.module').then( m => m.HouseEventsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
