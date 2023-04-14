/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  const { customization: { navType, isDarkMode }, colors } = theme;
  const darkTheme = isDarkMode ? "dark" : "light";
  
  const common = {
    black: colors?.darkPaper
  };
  
  const palette = {
    primary: {
      main: colors?.primaryMain,
      light: colors?.[`${darkTheme}PrimaryLight`] ?? colors?.primaryLight,
      dark: colors?.[`${darkTheme}PrimaryDark`] ?? colors?.primaryDark,
      200: colors?.[`${darkTheme}Primary200`] ?? colors?.primary200,
      800: colors?.[`${darkTheme}Primary800`] ?? colors?.primary800,
    },
    secondary: {
      main: colors?.secondaryMain,
      light: colors?.[`${darkTheme}SecondaryLight`] ?? colors?.secondaryLight,
      dark: colors?.[`${darkTheme}SecondaryDark`] ?? colors?.secondaryDark,
      200: colors?.secondary200,
      800: colors?.secondary800,
    },
    error: {
      main: colors?.errorMain,
      light: colors?.errorLight,
      dark: colors?.errorDark,
    },
    warning: {
      main: colors?.warningMain,
      light: colors?.warningLight,
      dark: colors?.warningDark,
    },
    success: {
      main: colors?.successMain,
      light: colors?.successLight,
      dark: colors?.successDark,
      200: colors?.success200,
    },
    orange: {
      main: colors?.orangeMain,
      light: colors?.orangeLight,
      dark: colors?.orangeDark,
    },
    grey: {
      50: colors?.grey50,
      100: colors?.grey100,
      200: colors?.grey200,
      300: colors?.grey300,
      500: theme?.darkTextSecondary,
      600: theme?.heading,
      700: theme?.darkTextPrimary,
      900: theme?.textDark,
    },
    dark: {
      main: colors?.darkLevel1,
      dark: colors?.darkLevel2,
      light: colors?.darkTextPrimary,
      800: colors?.darkBackground,
      900: colors?.darkPaper,
    },
    text: {
      primary: theme?.darkTextPrimary,
      secondary: theme?.darkTextSecondary,
      dark: theme?.textDark,
      hint: colors?.grey100,
    },
    background: {
      paper: theme?.paper,
      default: theme?.backgroundDefault,
    },
    card: {
      main: colors?.[`${darkTheme}PrimaryMain`] ?? colors?.paper,
      light: colors?.[`${darkTheme}Primary200`] ?? colors?.paper,
      hover: colors?.[`${darkTheme}Primary800`] ?? colors?.paper,
    },
    asyncSelect: {
      main: colors?.[`${darkTheme}Primary800`] ?? colors?.grey50,
    },
    canvasHeader: {
      executionLight: colors?.successLight,
      executionDark: colors?.successDark,
      deployLight: colors?.[`${darkTheme}PrimaryLight`] ?? colors?.primaryLight,
      deployDark: colors?.[`${darkTheme}PrimaryDark`] ?? colors?.primaryDark,
      saveLight: colors?.[`${darkTheme}SecondaryLight`] ?? colors?.secondaryLight,
      saveDark: colors?.[`${darkTheme}SecondaryDark`] ?? colors?.secondaryDark,
      settingsLight: colors?.grey300,
      settingsDark: colors?.grey700,
    },
    codeEditor: {
      main: colors?.[`${darkTheme}Primary800`] ?? colors?.primaryLight,
    },
  };

  return {
    mode: navType,
    common,
    ...palette,
  };
}
