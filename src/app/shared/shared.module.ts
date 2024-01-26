import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { CommonModule } from '@angular/common';

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
