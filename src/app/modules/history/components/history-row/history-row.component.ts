import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HistoryProps } from "src/app/shared/models/history.model";

@Component({
  selector: "app-history-row",
  templateUrl: "./history-row.component.html",
})
export class HistoryRowComponent {
  @Input() consult!: HistoryProps;
  @Input() index!: number;
  @Output() restartSearchEvent = new EventEmitter<HistoryProps>();
}
