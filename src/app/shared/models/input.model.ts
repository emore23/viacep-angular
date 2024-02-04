export type InputData = {
  [key: string]: {
    inputProps: InputInfos;
    controlName: string;
    columnSize?: string;
  };
};

export type InputInfos = {
  id: string;
  placeholder?: string;
  description: string;
};

export type InputProps = {
  inputProps: InputInfos;
};
