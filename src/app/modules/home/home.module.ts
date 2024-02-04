// Dependencies
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

// Components
import { HomeComponent } from './page/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CepCardComponent } from './components/cep-card/cep-card.component';

// Core
import { JsonPipe } from 'src/app/core/pipes/json.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchInputComponent,
    CepCardComponent,
    JsonPipe,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HomeRoutingModule,
    NgxMaskModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
