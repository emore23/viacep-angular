import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CodeProps } from 'src/app/shared/models/code.model';
import { FavoriteCepService } from '../../../../core/services/favorites.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() cepRetrieved: CodeProps | null = null;
  @Input() isOpen: boolean | null = false;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() favoriteModalEvent = new EventEmitter<void>();

  constructor(private favoriteCepService: FavoriteCepService) {}

  ngOnInit() {}

  close(): void {
    this.closeModalEvent.emit();
  }

  favoriteAddress(): void {
    this.favoriteModalEvent.emit();
    this.favoriteCepService.addToFavorites(this.cepRetrieved);
  }
}
