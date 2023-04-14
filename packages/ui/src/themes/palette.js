/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  // Extracted common colors here
  const common = {
    black: theme.colors?.darkPaper,
  };

  //Extracted the primary colors object here.
  const primary = {
    light: theme.customization.isDarkMode
      ? theme.colors?.darkPrimaryLight
      : theme.colors?.primaryLight,
    main: theme.colors?.primaryMain,
    dark: theme.customization.isDarkMode
      ? theme.colors?.darkPrimaryDark
      : theme.colors?.primaryDark,
    200: theme.customization.isDarkMode
      ? theme.colors?.darkPrimary200
      : theme.colors?.primary200,
    800: theme.customization.isDarkMode
      ? theme.colors?.darkPrimary800
      : theme.colors?.primary800,
  };

  //Extracted the secondary colors object here.
  const secondary = {
    light: theme.customization.isDarkMode
      ? theme.colors?.darkSecondaryLight
      : theme.colors?.secondaryLight,
    main: theme.customization.isDarkMode
      ? theme.colors?.darkSecondaryMain
      : theme.colors?.secondaryMain,
    dark: theme.customization.isDarkMode
      ? theme.colors?.darkSecondaryDark
      : theme.colors?.secondaryDark,
    200: theme.colors?.secondary200,
    800: theme.colors?.secondary800,
  };

  return {
    mode: theme?.customization?.navType,
    common,
    primary,
    secondary,
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
      200: theme.colors?.success200,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark,
    },
    grey: {
      50: theme.colors?.grey50,
      100: theme.colors?.grey100,
      200: theme.colors?.grey200,
      300: theme.colors?.grey300,
      500: theme.darkTextSecondary,
      600: theme.heading,
      700: theme.darkTextPrimary,
      900: theme.textDark,
    },
    dark: {
      light: theme.colors?.darkTextPrimary,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
      800: theme.colors?.darkBackground,
      900: theme.colors?.darkPaper,
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.darkTextSecondary,
      dark: theme.textDark,
      hint: theme.colors?.grey100,
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault,
    },
    card: {
      main: primary.main,
      light: primary[200],
      hover: primary[800],
    },
    asyncSelect: {
      main: theme.customization.isDarkMode ? primary[800] : theme.colors?.grey50,
    },
    // Added object for progress bar.
    progressBar: {
      light: primary.main,
      dark: theme.colors?.grey700,
    },
    canvasHeader: {
      executionLight: theme.colors?.successLight,
      executionDark: theme.colors?.successDark,
      deployLight: primary.light,
      deployDark: primary.dark,
      saveLight: secondary.light,
      saveDark: secondary.dark,
      settingsLight: theme.colors?.grey300,
      settingsDark: theme.colors?.grey700,
    },
    codeEditor: {
      main: theme.customization.isDarkMode ? primary[800] : primary.light,
    },
  };
}
