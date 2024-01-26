import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isOpenSource = new Subject<boolean>();
  isOpen$ = this.isOpenSource.asObservable();

  private isOpenAddressFormSource = new Subject<boolean>();
  isOpenAddressForm$ = this.isOpenAddressFormSource.asObservable();

  form: FormGroup | undefined;

  open(): void {
    this.isOpenSource.next(true);
  }

  close(): void {
    this.isOpenSource.next(false);
    this.isOpenAddressFormSource.next(false);
  }

  openAddressForm(): void {
    this.isOpenAddressFormSource.next(true);
  }
}
