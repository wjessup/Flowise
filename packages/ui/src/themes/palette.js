/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme = {}) {
  const { colors = {}, customization: { navType, isDarkMode } = {} } = theme;

  const getColor = (keyPath, defaultVal) => {
    return keyPath.split('.').reduce((obj, key) => obj?.[key], colors) ?? defaultVal;
  }

  return {
    mode: navType,
    common: { black: getColor('darkPaper') },
    primary: {
      light: getColor('customization.isDarkMode.darkPrimaryLight', colors?.primaryLight),
      dark: getColor('customization.isDarkMode.darkPrimaryDark', colors?.primaryDark),
      main: colors?.primaryMain,
      200: getColor('customization.isDarkMode.darkPrimary200', colors?.primary200),
      800: getColor('customization.isDarkMode.darkPrimary800', colors?.primary800)
    },
    secondary: {
      light: getColor('customization.isDarkMode.darkSecondaryLight', colors?.secondaryLight),
      main: getColor('customization.isDarkMode.darkSecondaryMain', colors?.secondaryMain),
      dark: getColor('customization.isDarkMode.darkSecondaryDark', colors?.secondaryDark),
      200: colors?.secondary200,
      800: colors?.secondary800
    },
    error: { light: colors?.errorLight, main: colors?.errorMain, dark: colors?.errorDark },
    orange: { light: colors?.orangeLight, main: colors?.orangeMain, dark: colors?.orangeDark },
    warning: { light: colors?.warningLight, main: colors?.warningMain, dark: colors?.warningDark },
    success: {
      light: colors?.successLight,
      main: colors?.successMain,
      dark: colors?.successDark,
      200: colors?.success200
    },
    grey: {
      50: colors?.grey50,
      100: colors?.grey100,
      200: colors?.grey200,
      300: colors?.grey300,
      500: getColor('darkTextSecondary'),
      600: getColor('heading'),
      700: getColor('darkTextPrimary'),
      900: getColor('textDark')
    },
    dark: {
      light: getColor('darkTextPrimary'),
      main: getColor('darkLevel1'),
      dark: getColor('darkLevel2'),
      800: getColor('darkBackground'),
      900: getColor('darkPaper')
    },
    text: {
      primary: getColor('darkTextPrimary'),
      secondary: getColor('darkTextSecondary'),
      dark: getColor('textDark'),
      hint: colors?.grey100
    },
    background: { paper: theme?.paper, default: theme?.backgroundDefault },
    card: {
      main: getColor('customization.isDarkMode.darkPrimaryMain', colors?.paper),
      light: getColor('customization.isDarkMode.darkPrimary200', colors?.paper),
      hover: getColor('customization.isDarkMode.darkPrimary800', colors?.paper)
    },
    asyncSelect: { main: getColor('customization.isDarkMode.darkPrimary800', colors?.grey50) },
    canvasHeader: {
      executionLight: colors?.successLight,
      executionDark: colors?.successDark,
      deployLight: colors?.primaryLight,
      deployDark: colors?.primaryDark,
      saveLight: colors?.secondaryLight,
      saveDark: colors?.secondaryDark,
      settingsLight: colors?.grey300,
      settingsDark: colors?.grey700
    },
    codeEditor: { main: getColor('customization.isDarkMode.darkPrimary800', colors?.primaryLight) }
  };
}
