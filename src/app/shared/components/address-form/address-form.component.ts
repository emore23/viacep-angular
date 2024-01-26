// Dependencies
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Services
import { FavoriteCepService } from 'src/app/core/services/favorites.service';
import { AddressFormService } from './adress-form.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent {
  @Input() form: FormGroup;

  constructor(
    private favoriteCepService: FavoriteCepService,
    private addressFormService: AddressFormService,
    private modalService: ModalService
  ) {
    this.form = this.addressFormService.createForm();
  }

  onCloseModal() {
    this.modalService.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const address = this.form.value;

      if (this.areFieldsFilled(address)) {
        this.favoriteCepService.saveAddress(address);

        this.favoriteCepService.addToFavorites(address);
        this.form.reset();
        this.modalService.close();
      } else {
        console.error('Preencha todos os campos obrigatórios.');
      }
    }
  }

  private areFieldsFilled(address: any): boolean {
    return (
      address.cep &&
      address.logradouro &&
      address.bairro &&
      address.localidade &&
      address.uf
    );
  }
}
