import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import formatCEP from "src/app/core/helpers/mask";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit {
  code!: string;
  @Output() searchClicked = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.code = formatCEP(inputElement.value);
  }
}
