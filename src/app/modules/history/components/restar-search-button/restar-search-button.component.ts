import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-reproduzir-button",
  templateUrl: "./restar-search-button.component.html",
})
export class RestartSearchButtonComponent {
  @Input() disabled!: boolean;
  @Output() restartSearchEvent = new EventEmitter<void>();
}
