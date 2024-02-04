// Dependencies
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

// Models
import { SearchInputProps } from '../../models/search-input.model';

@Component({
  selector: 'app-search-input',
  template: `
    <input
      type="text"
      class="form-control"
      mask="00000-000"
      [id]="searchInputProps.id"
      [placeholder]="searchInputProps.placeholder"
      [formControl]="control"
    />
  `,
})
export class SearchInputComponent {
  @Input() control!: FormControl;
  @Input() searchInputProps: SearchInputProps = {
    id: '',
    placeholder: '',
  };

  constructor() {}
}
