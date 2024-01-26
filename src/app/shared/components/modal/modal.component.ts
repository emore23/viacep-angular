import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FavoriteCepService } from 'src/app/core/services/favorites.service';
import { CodeProps } from 'src/app/shared/models/code.model';
import { ModalService } from './modal.service';

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

  showButtons: boolean = false;

  constructor(
    private favoriteCepService: FavoriteCepService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.modalService.showButtons$.subscribe((showButtons) => {
      this.showButtons = showButtons;
    });
  }

  close(): void {
    this.closeModalEvent.emit();
  }

  favoriteAddress(): void {
    this.favoriteModalEvent.emit();
    this.favoriteCepService.addToFavorites(this.cepRetrieved);
  }
}
