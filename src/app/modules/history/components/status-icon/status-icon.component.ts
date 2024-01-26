import { Component, Input } from "@angular/core";

@Component({
  selector: "app-status-icon",
  templateUrl: "./status-icon.component.html",
})
export class StatusIconComponent {
  @Input() error!: boolean;
}
