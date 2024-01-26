import { Injectable } from '@angular/core';
import { CodeProps } from 'src/app/shared/models/code.model';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable()
export class FavoriteCepService {
  chosenPlaces: string = environment.chosenPlaces;

  constructor(
    private storageService: StorageService
  ) {}

  public addToFavorites(cepRetrieved: CodeProps | any): boolean {
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

      return true;
    }

    return false;
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

  public getFavorites(): CodeProps[] {
    const favorites = this.storageService.getItem<CodeProps[]>(
      this.chosenPlaces
    );

    if (favorites === null || favorites === undefined) {
      console.log(`No favorites found for key ${this.chosenPlaces}`);
      return [];
    }

    return favorites;
  }

  public setFavorites(favorites: CodeProps[]): void {
    this.storageService.setItem(this.chosenPlaces, favorites);
  }

  public removeFromFavorites(favoriteToRemove: CodeProps): void {
    const favoriteAddresses: CodeProps[] = this.getFavorites();
    const updatedFavorites = favoriteAddresses.filter(
      (favorite) => favorite.cep !== favoriteToRemove.cep
    );
    this.setFavorites(updatedFavorites);
  }
}
