import { InputData } from '../models/input.model';

export const inputMock: InputData = {
  cep: {
    inputProps: {
      id: 'cep',
      description: 'CEP',
    },
    controlName: 'cep',
  },
  logradouro: {
    inputProps: {
      id: 'logradouro',
      placeholder: 'Logradouro',
      description: 'Logradouro',
    },
    controlName: 'logradouro',
  },
  bairro: {
    inputProps: {
      id: 'bairro',
      placeholder: 'Bairro',
      description: 'Bairro',
    },
    controlName: 'bairro',
  },
  localidade: {
    inputProps: {
      id: 'localidade',
      placeholder: 'Cidade',
      description: 'Cidade',
    },
    controlName: 'localidade',
  },
  uf: {
    inputProps: {
      id: 'uf',
      placeholder: 'UF',
      description: 'UF',
    },
    controlName: 'uf',
  },
  unidade: {
    inputProps: {
      id: 'unidade',
      placeholder: 'Unidade',
      description: 'Unidade',
    },
    controlName: 'unidade',
  },
  ibge: {
    inputProps: {
      id: 'ibge',
      placeholder: 'IBGE',
      description: 'IBGE',
    },
    controlName: 'ibge',
  },
  gia: {
    inputProps: {
      id: 'gia',
      placeholder: 'GIA',
      description: 'GIA',
    },
    controlName: 'gia',
  },
};
