// Dependencies
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Services
import { HttpService } from './core/services/http.service';
import { FavoriteCepService } from './core/services/favorites.service';
import { ModalService } from './shared/components/modal/modal.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forRoot([]),
    NgxsFormPluginModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpService, FavoriteCepService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
