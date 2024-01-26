import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CodeProps } from 'src/app/shared/models/code.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesStateService {
  private favoritesSubject = new BehaviorSubject<CodeProps[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  updateFavorites(favorites: CodeProps[]): void {
    this.favoritesSubject.next(favorites);
  }
}
