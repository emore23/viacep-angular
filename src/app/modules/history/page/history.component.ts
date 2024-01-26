import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { CodeProps } from 'src/app/shared/models/code.model';
import { FavoriteCepService } from '../../home/services/favorites.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @Output() restartSearchEvent = new EventEmitter<Event>();

  constructor(
    private router: Router,
    private favoriteCepService: FavoriteCepService,
    private cdr: ChangeDetectorRef
  ) {}

  favorites: CodeProps[] = [];

  ngOnInit(): void {
    this.favorites = this.favoriteCepService.getFavorites();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  restartSearch(historico: Event): void {
    this.restartSearchEvent.emit(historico);
  }

  removeFromFavorites(favoriteToRemove: CodeProps): void {
    this.favoriteCepService.removeFromFavorites(favoriteToRemove);

    const indexToRemove = this.favorites.findIndex(
      (fav) => fav.cep === favoriteToRemove.cep
    );

    if (indexToRemove !== -1) {
      this.favorites.splice(indexToRemove, 1);
      this.cdr.detectChanges();
    }
  }
}
