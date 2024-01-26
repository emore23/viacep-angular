import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { HistoryRoutingModule } from "./history-routing.module";
import { HistoryComponent } from "./page/history.component";
import { HistoryTableComponent } from "./components/history-table/history-table.component";
import { HistoryRowComponent } from "./components/history-row/history-row.component";
import { StatusIconComponent } from "./components/status-icon/status-icon.component";
import { RestartSearchButtonComponent } from "./components/restar-search-button/restar-search-button.component";
import { DatePipe } from "src/app/core/pipes/date.pipe";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    // HistoryTableComponent,
    // HistoryRowComponent,
    // StatusIconComponent,
    // RestartSearchButtonComponent,
    DatePipe,
  ],
  imports: [CommonModule, HistoryRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HistoryModule {}
