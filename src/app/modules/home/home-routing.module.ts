// Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './page/home.component';

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
