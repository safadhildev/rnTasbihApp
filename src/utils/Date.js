import moment from 'moment';
import momentHijri from 'moment-hijri';

const hijriMonths = [
  'Muharram',
  'Safar',
  'Rabiulawal',
  'Rabiulakhir',
  'Jamadilawal',
  'Jamadilakhir',
  'Rejab',
  'Syaaban',
  'Ramadan',
  'Syawal',
  'Zulkaedah',
  'Zulhijah',
];

const numLatinToAr = n =>
  n.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]).replace(/\./g, '٫');

const date = {
  getTodayDate: format => {
    return moment().format(format ?? 'DD/MM/YYYY');
  },

  getHijriDateRoman: () => {
    return momentHijri().format('YYYY/MMMM/DD');
  },
  getHijriDate: () => {
    // const date = momentHijri().format('iYYYY/iMM/iDD');
    const date = momentHijri().format('iDD/iMMMM/iYYYY');
    return numLatinToAr(date);
  },
  getHijriMonth: () => {
    const mth = momentHijri().format('iMMMM');
    return numLatinToAr(mth);
  },
  getTodayDateAndTime: () => {
    return moment().format('DD/MM/YYYY HH:mm:ss');
  },
  getCurrentTime: () => {
    return moment().format('HH:mm:ss');
  },
  getDate: val => {
    const formattedDate = moment(val).format();
    // const formattedDate = valueDate.date();
    return formattedDate;
  },
};

export default date;
