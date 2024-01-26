import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HistoryComponent } from "./page/history.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "history",
    component: HistoryComponent,
    children: [],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}
