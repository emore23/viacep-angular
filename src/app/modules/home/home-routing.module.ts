import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
