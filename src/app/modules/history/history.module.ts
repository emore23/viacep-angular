import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './page/history.component';
import { DatePipe } from 'src/app/core/pipes/date.pipe';
import { CityCardComponent } from './components/city-card/city-card.component';
import { FavoritesFilterPipe } from 'src/app/core/pipes/favorites-filter.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

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
