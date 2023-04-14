/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  const { customization, darkTextPrimary, darkTextSecondary, textDark, backgroundDefault } = theme;
  const { navType, isDarkMode } = customization;
  
  const getPrimaryColors = () => {
    const keys = ['light', 'main', 'dark', '200', '800'];
    const primaryColors = keys.reduce((acc, key) => {
      acc[key] = theme.colors?.[
        `primary${key}` as keyof typeof theme.colors
      ] || null;
      acc[key] = acc[key] && isDarkMode ? theme.colors?.[
        `darkPrimary${key}` as keyof typeof theme.colors
      ] : acc[key];
      return acc;
    }, {});
    return primaryColors;
  };

  const getSecondaryColors = () => {
    const keys = ['light', 'main', 'dark', '200', '800'];
    const secondaryColors = keys.reduce((acc, key) => {
      acc[key] = theme.colors?.[
        `secondary${key}` as keyof typeof theme.colors
      ] || null;
      acc[key] = acc[key] && isDarkMode ? theme.colors?.[
        `darkSecondary${key}` as keyof typeof theme.colors
      ] : acc[key];
      return acc;
    }, {});
    return secondaryColors;
  };

  return {
    mode: navType,
    common: { black: theme.colors?.darkPaper },
    primary: getPrimaryColors(),
    secondary: getSecondaryColors(),
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark,
    },
    orange: {
      light: theme.colors?.orangeLight,
      main: theme.colors?.orangeMain,
      dark: theme.colors?.orangeDark,
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark,
    },
    success: {
      light: theme.colors?.successLight,
      main: theme.colors?.successMain,
      '200': theme.colors?.success200,
      dark: theme.colors?.successDark,
    },
    grey: {
      '50': theme.colors?.grey50,
      '100': theme.colors?.grey100,
      '200': theme.colors?.grey200,
      '300': theme.colors?.grey300,
      '500': darkTextSecondary,
      '600': theme.heading,
      '700': darkTextPrimary,
      '900': textDark,
    },
    dark: {
      light: darkTextPrimary,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
      '800': theme.colors?.darkBackground,
      '900': theme.colors?.darkPaper,
    },
    text: {
      primary: darkTextPrimary,
      secondary: darkTextSecondary,
      dark: textDark,
      hint: theme.colors?.grey100,
    },
    background: {
      paper: theme.paper,
      default: backgroundDefault,
    },
    card: {
      main: theme.colors?.paper,
      light: theme.colors?.darkPrimary200 ?? theme.colors?.paper,
      hover: theme.colors?.darkPrimary800 ?? theme.colors?.paper,
    },
    asyncSelect: { main: theme.colors?.grey50 ?? isDarkMode },
    canvasHeader: {
      executionLight: theme.colors?.successLight,
      executionDark: theme.colors?.successDark,
      deployLight: getPrimaryColors()['light'] ?? null || getPrimaryColors()['dark'] ?? null,
      deployDark: getPrimaryColors()['dark'] ?? null,
      saveLight: getSecondaryColors()['light'] ?? null,
      saveDark: getSecondaryColors()['dark'] ?? null,
      settingsLight: theme.colors?.grey300,
      settingsDark: theme.colors?.grey700,
    },
    codeEditor: {
      main: getPrimaryColors()['light'] ?? null || theme.colors?.primaryLight,
    },
  };
}
