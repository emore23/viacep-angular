import { Injectable } from '@angular/core';
import { CodeProps } from 'src/app/shared/models/code.model';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/services/storage.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class FavoriteCepService {
  chosenPlaces: string = environment.chosenPlaces;
  private favoritesSubject = new Subject<void>();

  constructor(private storageService: StorageService) {}

  subscribeToFavoritesChanges(): Observable<void> {
    return this.favoritesSubject.asObservable();
  }

  saveAddress(address: any): void {
    const favoritedAddresses = this.getFavorites();
    favoritedAddresses.push(address);
    this.setFavorites(favoritedAddresses);
    this.favoritesSubject.next();
  }

  addToFavorites(cepRetrieved: CodeProps | any): boolean {
    if (!cepRetrieved || !this.isValidCepRetrieved(cepRetrieved)) {
      return false;
    }

    const favoriteAddresses: CodeProps[] = this.getFavorites();
    const cepAlreadyExist = favoriteAddresses.some(
      (item) => item.cep === cepRetrieved.cep
    );

    if (!cepAlreadyExist) {
      const newFavorite: CodeProps = {
        cep: cepRetrieved.cep,
        localidade: cepRetrieved.localidade,
        bairro: cepRetrieved.bairro,
        uf: cepRetrieved.uf,
      };

      favoriteAddresses.push(newFavorite);
      this.setFavorites(favoriteAddresses);
      this.favoritesSubject.next();

      return true;
    }

    return false;
  }

  removeFromFavorites(favoriteToRemove: CodeProps): void {
    const favoriteAddresses: CodeProps[] = this.getFavorites();
    const indexToRemove = favoriteAddresses.findIndex(
      (fav) => fav.cep === favoriteToRemove.cep
    );

    if (indexToRemove !== -1) {
      favoriteAddresses.splice(indexToRemove, 1);
      this.setFavorites(favoriteAddresses);
      this.favoritesSubject.next();
    }

    this.updateTokenKey();
  }

  getFavorites(): CodeProps[] {
    const favorites = this.storageService.getItem<CodeProps[]>(
      this.chosenPlaces
    );

    if (favorites === null || favorites === undefined) {
      console.log(`No favorites found for key ${this.chosenPlaces}`);
      return [];
    }

    return favorites;
  }

  private setFavorites(favorites: CodeProps[]): void {
    this.storageService.setItem(this.chosenPlaces, favorites);
  }

  private isValidCepRetrieved(cepRetrieved: CodeProps): boolean {
    return !!(
      cepRetrieved &&
      cepRetrieved.cep &&
      cepRetrieved.localidade &&
      cepRetrieved.bairro &&
      cepRetrieved.uf
    );
  }

  private updateTokenKey(): void {
    const favoriteAddresses: CodeProps[] = this.getFavorites();

    if (favoriteAddresses.length === 0) {
      this.storageService.removeItem(this.chosenPlaces);
    }
  }

  getFavoritesSubject(): Subject<void> {
    return this.favoritesSubject;
  }
}
