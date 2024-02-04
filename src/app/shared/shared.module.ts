// Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { InputComponent } from './components/input/input.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [ModalComponent, AddressFormComponent, InputComponent],
  exports: [ModalComponent, AddressFormComponent, InputComponent],
})
export class SharedModule {}
