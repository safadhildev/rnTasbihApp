export const zikir = [
  {
    key: 'tasbih',
    romanized: 'Tasbih (Subḥānallāh)',
    arabic: 'سُبْحَانَ ٱللَّٰهِ‎',
    meaning: 'Maha Suci Allah',
  },
  {
    key: 'tahmid',
    romanized: 'Tahmid (Alḥamdulillāh)',
    arabic: 'اَلْحَمْدُ للَّهِ',
    meaning: 'Segala puji bagi Allah.',
  },
  {
    key: 'takbir',
    romanized: 'Takbir (Allāhu akbar)',
    arabic: 'اللهُ أكْبَرُ',
    meaning: 'Maha Suci Allah',
  },
  {
    key: 'istighfar',
    romanized: 'Istighfar (Astaghfirullāh)',
    arabic: 'أَسْتَغْفِرُ ٱللَّٰ',
    meaning: 'Aku memohon ampun kepada Allah',
  },
];

export const zikirOptions = zikir
  .sort((a, b) => a.romanized.localeCompare(b.romanized))
  .map(({key, romanized}) => ({
    value: key,
    label: romanized,
  }));
