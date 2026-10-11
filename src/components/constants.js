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
  COUNTER_TYPE: 'counterType',
  LAST_INTERSTITIAL_AT: 'lastInterstitialAt',
};

export const HEADER_CTA = {
  EDIT: 'edit',
  DELETE: 'delete',
  CANCEL: 'cancel',
  MORE: 'MORE',
  SAVE: 'SAVE',
};

export const COUNTER_TYPE = {
  TAP: 'tap',
  SWIPE_UP: 'swipeUp',
  SWIPE_DOWN: 'swipeDown',
  SWIPE_RIGHT: 'swipeRight',
  SWIPE_LEFT: 'swipeLeft',
};

export const COUNTER_TYPE_ARRAY = [
  {
    value: COUNTER_TYPE.TAP,
    label: 'Tap',
  },
  {
    value: COUNTER_TYPE.SWIPE_UP,
    label: 'Swipe Up',
  },
  {
    value: COUNTER_TYPE.SWIPE_DOWN,
    label: 'Swipe Down',
  },
  {
    value: COUNTER_TYPE.SWIPE_RIGHT,
    label: 'Swipe Right',
  },
  {
    value: COUNTER_TYPE.SWIPE_LEFT,
    label: 'Swipe Left',
  },
];

export const SWIPER_TYPES = [
  COUNTER_TYPE.SWIPE_UP,
  COUNTER_TYPE.SWIPE_DOWN,
  COUNTER_TYPE.SWIPE_RIGHT,
  COUNTER_TYPE.SWIPE_LEFT,
];

export const Z_INDEX = {
  UNDER_FLOOR: -1,
  FLOOR: 0,
  COUNTER: 1,
  OVERLAY: 9,
  FLOATING_BUTTON: 11,
  FLOATING_BUTTON_ITEMS: 10,
  DROPDOWN: 20,
  DROPDOWN_ITEMS: 99,
};
