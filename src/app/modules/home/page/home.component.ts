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
import { ModalService } from '../components/modal/modal.service';

// Services
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  cepRetrieved!: CodeProps;
  openModal: boolean = true;
  isVisibleHistory: boolean = false;

  isOpen$: Observable<boolean> = this.modalService.isOpen$;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
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

  closeCepModal() {
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
      `Não foi possível localizar o CEP informado (${cepValue})`
    );
  }

  reproduzirConsulta(historico: HistoryProps): void {
    this.cep?.setValue(historico.cep);
    this.searchCep();
  }

  showHistory(): void {
    if (this.getHistoricalConsultations().length > 0) {
      this.isVisibleHistory = !this.isVisibleHistory;
      if (this.isVisibleHistory) {
        this.router.navigate(['/history']);
      }
    } else {
      this.onWarning('Alerta', 'Ainda não há nenhum endereço favoritado!');
    }
  }

  clearHistory(): void {
    this.httpService.clearHistoryFetch();
    this.onSuccess('Sucesso', 'Histórico de favoritos removido com sucesso!');
    this.isVisibleHistory = false;
  }

  getHistoricalConsultations(): HistoryProps[] {
    return this.httpService.fetchHistory();
  }

  onError(title: string, message: string): void {
    this.cepRetrieved.erro = true;
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
