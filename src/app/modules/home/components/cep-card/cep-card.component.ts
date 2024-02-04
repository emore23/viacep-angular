// Dependencies
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { inputMock } from 'src/app/shared/mocks/input.mock';

// Models
import { CodeProps } from 'src/app/shared/models/code.model';
import { InputData } from 'src/app/shared/models/input.model';

@Component({
  selector: 'app-cep-card',
  templateUrl: './cep-card.component.html',
})
export class CepCardComponent implements OnChanges {
  form!: FormGroup;
  @Input() cepRetrieved!: CodeProps;

  inputData: InputData = inputMock;
  inputDataKeys: string[] = [];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cepRetrieved']) {
      this.loadForm(changes['cepRetrieved'].currentValue);
      this.inputDataKeys = Object.keys(this.inputData);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      cep: [{ value: '', disabled: true }],
      logradouro: [{ value: '', disabled: true }],
      bairro: [{ value: '', disabled: true }],
      localidade: [{ value: '', disabled: true }],
      uf: [{ value: '', disabled: true }],
      unidade: [{ value: '', disabled: true }],
      ibge: [{ value: '', disabled: true }],
      gia: [{ value: '', disabled: true }],
    });
  }

  loadForm(cep: CodeProps): void {
    if (cep) {
      this.cep?.setValue(cep.cep);
      this.logradouro?.setValue(cep.logradouro);
      this.bairro?.setValue(cep.bairro);
      this.localidade?.setValue(cep.localidade);
      this.uf?.setValue(cep.uf);
      this.unidade?.setValue(cep.unidade);
      this.ibge?.setValue(cep.ibge);
      this.gia?.setValue(cep.gia);
    }
  }

  get cep() {
    return this.form.get('cep');
  }
  get logradouro() {
    return this.form.get('logradouro');
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
