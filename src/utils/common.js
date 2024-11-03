import {SORT_BY, SORT_ORDER} from '../components/constants';

export const onSearch = (val, arr) => {
  return arr.filter(item => {
    const target = item?.zikir?.label || item?.label;
    return target
      ?.replaceAll(' ', '')
      ?.toLowerCase()
      ?.includes(val?.replaceAll(' ', '')?.toLowerCase());
  });
};

export const onSort = (arr = [], sortBy = null, sortOrder = SORT_ORDER.ASC) => {
  switch (sortBy) {
    case SORT_BY.COUNT:
      return arr.sort((a, b) =>
        sortOrder === SORT_ORDER.ASC ? a.count - b.count : b.count - a.count,
      );
    case SORT_BY.TITLE:
      return arr.sort((a, b) =>
        sortOrder === SORT_ORDER.ASC
          ? a.zikir.label.localeCompare(b.zikir.label)
          : b.zikir.label.localeCompare(a.zikir.label),
      );
    case SORT_BY.DATE:
      return arr.sort((a, b) =>
        sortOrder === SORT_ORDER.ASC ? a.unix - b.unix : b.unix - a.unix,
      );
    default:
      return arr.sort();
  }
};
