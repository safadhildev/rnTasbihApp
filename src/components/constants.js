export const DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

export const SORT_BY = {
  TITLE: 'title',
  DATE: 'date',
  COUNT: 'count',
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const SORT_OPTIONS = [
  {
    label: 'Count',
    value: SORT_BY.COUNT,
  },
  {
    label: 'Date',
    value: SORT_BY.DATE,
  },
  {
    label: 'Title',
    value: SORT_BY.TITLE,
  },
];

export const STORAGE_KEYS = {
  RECORDS: 'records',
  THEME: 'theme',
};

export const HEADER_CTA = {
  EDIT: 'edit',
  DELETE: 'delete',
  CANCEL: 'cancel',
  MORE: 'MORE',
  SAVE: 'SAVE',
};
