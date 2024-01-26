import { Pipe, PipeTransform } from '@angular/core';
import { CodeProps } from 'src/app/shared/models/code.model';

@Pipe({
  name: 'favoritesFilter',
})
export class FavoritesFilterPipe implements PipeTransform {
  transform(favorites: CodeProps[] | null, searchTerm: string): CodeProps[] {
    if (!favorites) {
      return [];
    }

    return favorites.filter((favorite) =>
      this.isFavoriteMatchingSearch(favorite, searchTerm)
    );
  }

  private isFavoriteMatchingSearch(
    favorite: CodeProps,
    searchTerm: string
  ): boolean {
    const searchString = searchTerm.toLowerCase();
    const ufToCompare = favorite.uf ? favorite.uf.toLowerCase() : '';

    return (
      favorite.localidade.toLowerCase().includes(searchString) ||
      favorite.bairro.toLowerCase().includes(searchString) ||
      ufToCompare.includes(searchString)
    );
  }
}
