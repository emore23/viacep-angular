import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HistoryProps } from "src/app/shared/models/history.model";

@Component({
  selector: "app-history-table",
  templateUrl: "./history-table.component.html",
})
export class HistoryTableComponent {
  @Input() history!: HistoryProps[];
  @Output() restartSearchEvent = new EventEmitter<HistoryProps>();
}
