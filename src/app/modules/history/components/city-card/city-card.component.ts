import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FavoriteCepService } from 'src/app/modules/home/services/favorites.service';
import { CodeProps } from 'src/app/shared/models/code.model';

@Component({
  selector: 'app-city-card',
  templateUrl: 'city-card.component.html',
})
export class CityCardComponent implements OnInit {
  @Input() cepRetrieved: CodeProps | undefined;

  @Output() removeFromFavoritesEvent = new EventEmitter<CodeProps>();

  private cep: string = '';

  constructor(private favoriteCepService: FavoriteCepService) {}

  ngOnInit() {}

  removeFromFavorites() {
    this.favoriteCepService.removeFromFavorites(this.cepRetrieved as CodeProps);
    this.removeFromFavoritesEvent.emit();
  }
}
