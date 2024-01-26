import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryProps } from 'src/app/shared/models/history.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  @Input() history!: HistoryProps[];
  @Output() restartSearchEvent = new EventEmitter<Event>();

  constructor() {}

  restartSearch(historico: Event): void {
    this.restartSearchEvent.emit(historico);
  }
}
