export const THEME_CONSTANT = {
  midnight: 'midnight',
  lime: 'lime',
  forest: 'forest',
};

export const getThemes = () => {
  const themes = Object.keys(THEME_CONSTANT);
  return themes.map(theme => ({label: theme, value: theme}));
};

const themes = {
  [THEME_CONSTANT.midnight]: {
    barStyle: 'light-content',
    background: '#22303d',
    infoText: '#95A5A6',
    primaryButtonBackground: '#34495E',
    primaryButtonText: '#ECF0F1',
    secondaryButtonBackground: '#C0392B',
    secondaryButtontext: '#E74C3C',
    counterText: '#95A5A6',
    error: '#E74C3C',
    success: '#2ECC71',
    listItemBackground: '#2C3E50',
    listItemTextPrimary: '#ECF0F1',
    listItemTextSecondary: '#BDC3C7',
    cardBackground: '#22303d',
    inputBackground: '#2C3E50',
    inputBorder: '#7F8C8D',
    inputPlacholder: '#BDC3C7',
    inputText: '#ECF0F1',
  },
  [THEME_CONSTANT.lime]: {
    barStyle: 'dark-content',
    background: '#FAFAFA',
    infoText: '#4CAF50',
    primaryButtonBackground: '#66BB6A',
    primaryButtonText: '#FAFAFA',
    secondaryButtonBackground: '#C0392B',
    secondaryButtontext: '#E74C3C',
    counterText: '#A5D6A7',
    error: '#E74C3C',
    success: '#2ECC71',
    listItemBackground: '#E8F5E9',
    listItemTextPrimary: '#43A047',
    listItemTextSecondary: '#66BB6A',
    cardBackground: '#FAFAFA',
    inputBackground: '#FAFAFA',
    inputBorder: '#A5D6A7',
    inputPlacholder: '#66BB6A',
    inputText: '#388E3C',
  },
  [THEME_CONSTANT.forest]: {
    barStyle: 'dark-content',
    background: '#f0ead2',
    primaryButtonText: '#f0ead2',
    cardBackground: '#f0ead2',
    inputBackground: '#f0ead2',
    listItemBackground: '#dde5b6',
    infoText: '#a98467',
    primaryButtonBackground: '#7b8f4b',
    listItemTextSecondary: '#7b8f4b',
    inputPlacholder: '#a98467',
    counterText: '#79675c',
    inputBorder: '#79675c',
    success: '#2ECC71',
    listItemTextPrimary: '#79675c',
    inputText: '#6c584c',
    secondaryButtonBackground: '#C0392B',
    secondaryButtontext: '#E74C3C',
    error: '#E74C3C',
  },
};

export default themes;
