import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CodeProps } from 'src/app/shared/models/code.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() cepRetrieved: CodeProps | undefined;
  @Input() isOpen: boolean | null = false;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() favoriteModalEvent = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  close(): void {
    this.closeModalEvent.emit();
  }

  favorite(): void {
    this.favoriteModalEvent.emit();
  }
}
