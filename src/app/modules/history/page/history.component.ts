import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FavoriteCepService } from 'src/app/core/services/favorites.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { CodeProps } from 'src/app/shared/models/code.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @Output() restartSearchEvent = new EventEmitter<Event>();
  isOpenAddressForm$: Observable<boolean> =
    this.modalService.isOpenAddressForm$;

  constructor(
    private router: Router,
    private favoriteCepService: FavoriteCepService,
    private cdr: ChangeDetectorRef,
    private modalService: ModalService
  ) {}

  favorites: CodeProps[] = [];

  ngOnInit(): void {
    this.favorites = this.favoriteCepService.getFavorites();
  }

  closeModal() {
    this.modalService.close();
  }

  showModalNewAddress() {
    this.modalService.openAddressForm();
  }

  favoriteAddress(): void {
    const favoritedSuccessfully = this.favoriteCepService.addToFavorites(
      this.favorites
    );

    if (favoritedSuccessfully) {
      this.onSuccess('Sucesso', 'Endereço favoritado com sucesso!');
    } else {
      this.onWarning('Aviso', 'Este endereço já foi favoritado anteriormente.');
    }
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

  onWarning(title: string, message: string): void {
    Swal.fire(title, message, 'warning');
  }

  onSuccess(title: string, message: string): void {
    Swal.fire(title, message, 'success');
  }
}
