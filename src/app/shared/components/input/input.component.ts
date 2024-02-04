// Dependencies
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

// Models
import { InputProps } from '../../models/input.model';

@Component({
  selector: 'app-input',
  template: `
    <div class="form-group">
      <label>{{ inputData.inputProps.description }}</label>

      <input
        type="text"
        class="form-control"
        [id]="inputData.inputProps.id"
        [placeholder]="inputData.inputProps.placeholder"
        [formControl]="control"
      />
    </div>
  `,
})
export class InputComponent {
  @Input() control: FormControl | any;

  @Input() inputData!: InputProps;

  constructor() {}
}
