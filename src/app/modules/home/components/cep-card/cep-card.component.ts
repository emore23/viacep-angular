import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CepService } from '../../services/cep.service';
import { CodeProps } from 'src/app/shared/models/code.model';

@Component({
  selector: 'app-cep-card',
  templateUrl: './cep-card.component.html',
})
export class CepCardComponent {
  form!: FormGroup;
  @Input() cepRetrieved!: CodeProps;
  @Output() esconderCardEvent = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private cepService: CepService) {
    this.initForm();
  }

  ngOnChanges() {
    this.loadForm(this.cepRetrieved);
  }

  esconderCard(): void {
    this.esconderCardEvent.emit(true);
  }

  initForm(): void {
    this.form = this.fb.group({
      cep: [{ value: '', disabled: true }],
      logradouro: [{ value: '', disabled: true }],
      complemento: [{ value: '', disabled: true }],
      bairro: [{ value: '', disabled: true }],
      localidade: [{ value: '', disabled: true }],
      uf: [{ value: '', disabled: true }],
      unidade: [{ value: '', disabled: true }],
      ibge: [{ value: '', disabled: true }],
      gia: [{ value: '', disabled: true }],
    });
  }

  hasComplemento(): boolean {
    let complemento: string = this.complemento?.value;
    return complemento.trim().length > 0;
  }

  loadForm(cep: CodeProps): void {
    this.cep?.setValue(cep.cep);
    this.logradouro?.setValue(cep.logradouro);
    this.complemento?.setValue(cep.complemento);
    this.bairro?.setValue(cep.bairro);
    this.localidade?.setValue(cep.localidade);
    this.uf?.setValue(cep.uf);
    this.unidade?.setValue(cep.unidade);
    this.ibge?.setValue(cep.ibge);
    this.gia?.setValue(cep.gia);
  }

  get cep() {
    return this.form.get('cep');
  }
  get logradouro() {
    return this.form.get('logradouro');
  }
  get complemento() {
    return this.form.get('complemento');
  }
  get bairro() {
    return this.form.get('bairro');
  }
  get localidade() {
    return this.form.get('localidade');
  }
  get uf() {
    return this.form.get('uf');
  }
  get unidade() {
    return this.form.get('unidade');
  }
  get ibge() {
    return this.form.get('ibge');
  }
  get gia() {
    return this.form.get('gia');
  }
}
