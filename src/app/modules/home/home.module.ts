// Dependencies
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { HomeRoutingModule } from './home-routing.module';

import { InputComponent } from 'src/app/shared/components/input/input.component';
import { SelectBoxComponent } from 'src/app/shared/components/select-box/select-box.component';

// Components
import { HomeComponent } from './page/home.component';
import { CepCardComponent } from './components/cep-card/cep-card.component';

// Pipe
import { JsonPipe } from 'src/app/core/pipes/json.pipe';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    SelectBoxComponent,
    SelectBoxComponent,
    InputComponent,
    ModalComponent,
    CepCardComponent,
    JsonPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HomeRoutingModule,
    NgxMaskModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
