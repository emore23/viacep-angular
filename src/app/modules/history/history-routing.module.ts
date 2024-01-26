// Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HistoryComponent } from './page/history.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryComponent,
    children: [],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}
