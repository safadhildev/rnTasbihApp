export const zikir = [
  {
    key: 'tasbih',
    romanized: 'Subhanallah',
    arabic: 'سُبْحَانَ ٱللَّٰهِ‎',
    meaning: 'Maha Suci Allah',
  },
  {
    key: 'tahmid',
    romanized: 'Alhamdulillah',
    arabic: 'اَلْحَمْدُ للَّهِ',
    meaning: 'Segala puji bagi Allah Ta’ala',
  },
  {
    key: 'takbir',
    romanized: 'Allahu Akbar',
    arabic: 'اللهُ أكْبَرُ',
    meaning: 'Maha Suci Allah',
  },
  {
    key: 'tahlil',
    romanized: 'La ilaha illallah',
    arabic: 'لا إله إلاّ الله',
    meaning: 'Tiada Tuhan selain Allah',
  },
  {
    key: 'istighfar',
    romanized: 'Astaghfirullah',
    arabic: 'أَسْتَغْفِرُ ٱللَّٰ',
    meaning: 'Aku memohon ampun kepada Allah',
  },
  {
    key: 'hawqolah',
    romanized: 'La hawla wa la quwwata illa billah',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰ',
    meaning: 'Tidak ada daya dan kekuatan kecuali daya dan kekuatan dari Allah',
  },
];

export const zikirOptions = zikir
  .sort((a, b) => a.romanized.localeCompare(b.romanized))
  .map(({key, romanized}) => ({
    value: key,
    label: romanized,
  }));
