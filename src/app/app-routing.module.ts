import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeRoutingModule } from './modules/home/home-routing.module';
import { HistoryRoutingModule } from './modules/history/history-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./modules/history/history.module').then((m) => m.HistoryModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
