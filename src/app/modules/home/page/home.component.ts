import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodeProps } from 'src/app/shared/models/code.model';
import { CepService } from '../services/cep.service';
import { HistoryProps } from 'src/app/shared/models/history.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModalService } from '../components/modal/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  cepRetrieved: CodeProps | undefined;
  openModal: boolean = true;
  isVisibleHistory: boolean = false;

  isOpen$: Observable<boolean> = this.modalService.isOpen$;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.initForm();
  }

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

      this.cepService.search(cepValue).subscribe(
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
    this.cepService.postHistory(this.cep?.value, false);
    this.cepRetrieved = data;
    this.cep?.reset();
  }

  handleSearchError(cepValue: string): void {
    this.cepService.postHistory(cepValue, true);
    this.onError(
      'Erro',
      `Não foi possível localizar o CEP informado (${cepValue})`
    );
  }

  reproduzirConsulta(historico: HistoryProps): void {
    this.cep?.setValue(historico.cep);
    this.searchCep();
  }

  esconderCard(esconder: boolean): void {
    if (esconder) {
      this.cepRetrieved = undefined;
    }
  }

  showHistory(): void {
    if (this.getHistoricoConsultas().length > 0) {
      this.isVisibleHistory = !this.isVisibleHistory;
      this.router.navigate(['/history']);
    } else {
      this.onWarning('Alerta', 'Ainda não há nenhum histórico de consulta');
    }
  }

  clearHistory(): void {
    this.cepService.clearHistoryFetch();
    this.onSuccess('Sucesso', 'Histórico removido com sucesso!');
    this.isVisibleHistory = false;
  }

  getHistoricoConsultas(): HistoryProps[] {
    return this.cepService.fetchHistory();
  }

  hasCep(): boolean {
    return this.cepRetrieved !== null;
  }

  onError(title: string, message: string): void {
    this.cepRetrieved = undefined;
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
