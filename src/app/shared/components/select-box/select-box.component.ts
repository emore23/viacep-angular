import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OptionProps } from '../../models/search-options.model';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
})
export class SelectBoxComponent implements OnInit {
  @Input() selectProps!: OptionProps[];
  @Output() selectionChanged = new EventEmitter<OptionProps>();

  constructor() {}

  ngOnInit() {}

  onSelectionChange(event: any): void {
    const selectedOption: OptionProps | undefined = this.selectProps.find(
      (option) => option.description === event.target.value
    );
    this.selectionChanged.emit(selectedOption);
  }
}
