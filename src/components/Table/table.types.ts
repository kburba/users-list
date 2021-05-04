export type SortByType = {
  by: string;
  asc: boolean;
};

export enum TableValueTypes {
  DATE = 'DATE',
}

export enum TableButtonTypes {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export type TableColumn = {
  title: string;
  valueKey: string;
  type?: 'buttons';
  buttons?: TableButtonTypes[];
  valueType?: TableValueTypes.DATE;
  onClick?: TableClickSettings;
};

export type TableClickSettings = {
  type: 'link';
  linkPrefix: string;
  linkKey: string;
};
export type TableAction = {
  key: string;
  action: (item: any) => void;
};
