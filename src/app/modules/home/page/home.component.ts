// Dependencies
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

// Models
import { CodeProps } from 'src/app/shared/models/code.model';

// Components
import { HistoryProps } from 'src/app/shared/models/history.model';

// Services
import { HttpService } from 'src/app/core/services/http.service';
import { FavoriteCepService } from '../../../core/services/favorites.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  cepRetrieved: CodeProps | null = null;
  openModal: boolean = true;
  isVisibleHistory: boolean = false;

  isOpen$: Observable<boolean> = this.modalService.isOpen$;
  isOpenAddressForm$: Observable<boolean> =
    this.modalService.isOpenAddressForm$;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private favoriteCepService: FavoriteCepService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      cep: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });
  }

  searchCep(): void {
    if (this.form?.valid) {
      const cepValue = this.cep?.value;

      this.httpService.search(cepValue).subscribe(
        (dados: CodeProps) => {
          if (dados.erro) {
            this.handleSearchError(cepValue);
          } else {
            this.handleSearchSuccess(dados);
            this.modalService.open();
          }
        },
        (error) => this.handleSearchError(cepValue)
      );
    }
  }

  closeModal() {
    this.modalService.close();
  }

  handleSearchSuccess(data: CodeProps): void {
    this.httpService.postHistory(this.cep?.value, false);
    this.cepRetrieved = data;
    this.cep?.reset();
  }

  handleSearchError(cepValue: string): void {
    this.httpService.postHistory(cepValue, true);
    this.onError(
      'Erro',
      `Não foi possível localizar o CEP informado ( ${cepValue} )`
    );
  }

  reproduzirConsulta(historico: HistoryProps): void {
    this.cep?.setValue(historico.cep);
    this.searchCep();
  }

  showHistory(): void {
    const historicalConsultations = this.getHistoricalConsultations();
    const favoriteAddresses = this.favoriteCepService.getFavorites();

    if (historicalConsultations.length > 0 || favoriteAddresses.length > 0) {
      this.isVisibleHistory = !this.isVisibleHistory;
      if (this.isVisibleHistory) {
        this.router.navigate(['/history']);
      }
    } else {
      this.onWarning('Alerta', 'Ainda não há nenhum endereço favoritado!');
    }
  }

  createNewAddress(): void {
    this.modalService.openAddressForm();
  }

  getHistoricalConsultations(): HistoryProps[] {
    return this.httpService.fetchHistory();
  }

  favoriteAddress(): void {
    const favoritedSuccessfully = this.favoriteCepService.addToFavorites(
      this.cepRetrieved
    );

    if (favoritedSuccessfully) {
      this.onSuccess('Sucesso', 'Endereço favoritado com sucesso!');
    } else {
      this.onWarning('Aviso', 'Este endereço já foi favoritado anteriormente.');
    }
  }

  onError(title: string, message: string): void {
    this.cepRetrieved = null;

    this.cep?.reset();
    Swal.fire(title, message, 'error');
  }

  onWarning(title: string, message: string): void {
    Swal.fire(title, message, 'warning');
  }

  onSuccess(title: string, message: string): void {
    Swal.fire(title, message, 'success');
  }

  get cep() {
    return this.form?.get('cep');
  }
}
