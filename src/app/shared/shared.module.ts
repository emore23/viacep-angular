// Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AddressFormComponent } from './components/address-form/address-form.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  declarations: [ModalComponent, AddressFormComponent],
  exports: [ModalComponent, AddressFormComponent],
})
export class SharedModule {}
