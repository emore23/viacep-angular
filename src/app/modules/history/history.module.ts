// Dependencies
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

// Components
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './page/history.component';
import { CityCardComponent } from './components/city-card/city-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

// Core
import { FavoritesFilterPipe } from 'src/app/core/pipes/favorites-filter.pipe';
import { DatePipe } from 'src/app/core/pipes/date.pipe';

@NgModule({
  declarations: [
    HistoryComponent,
    CityCardComponent,
    FavoritesFilterPipe,
    DatePipe,
  ],
  imports: [
    SharedModule,
    CommonModule,
    HistoryRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HistoryModule {}
