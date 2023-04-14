/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  const { customization, colors } = theme;
  const isDarkMode = customization.isDarkMode;
  const common = {
    black: colors?.darkPaper
  };
  const primary = {
    light: isDarkMode ? colors?.darkPrimaryLight : colors?.primaryLight,
    main: colors?.primaryMain,
    dark: isDarkMode ? colors?.darkPrimaryDark : colors?.primaryDark,
    200: isDarkMode ? colors?.darkPrimary200 : colors?.primary200,
    800: isDarkMode ? colors?.darkPrimary800 : colors?.primary800
  };
  const secondary = {
    light: isDarkMode ? colors?.darkSecondaryLight : colors?.secondaryLight,
    main: isDarkMode ? colors?.darkSecondaryMain : colors?.secondaryMain,
    dark: isDarkMode ? colors?.darkSecondaryDark : colors?.secondaryDark,
    200: colors?.secondary200,
    800: colors?.secondary800
  };
  const error = {
    light: colors?.errorLight,
    main: colors?.errorMain,
    dark: colors?.errorDark
  };
  const orange = {
    light: colors?.orangeLight,
    main: colors?.orangeMain,
    dark: colors?.orangeDark
  };
  const warning = {
    light: colors?.warningLight,
    main: colors?.warningMain,
    dark: colors?.warningDark
  };
  const success = {
    light: colors?.successLight,
    200: colors?.success200,
    main: colors?.successMain,
    dark: isDarkMode ? colors?.darkSuccessDark : colors?.successDark
  };
  const grey = {
    50: colors?.grey50,
    100: colors?.grey100,
    200: colors?.grey200,
    300: colors?.grey300,
    500: theme.darkTextSecondary,
    600: theme.heading,
    700: theme.darkTextPrimary,
    900: theme.textDark
  };
  const dark = {
    light: colors?.darkTextPrimary,
    main: colors?.darkLevel1,
    dark: colors?.darkLevel2,
    800: colors?.darkBackground,
    900: colors?.darkPaper
  };
  const text = {
    primary: theme.darkTextPrimary,
    secondary: theme.darkTextSecondary,
    dark: theme.textDark,
    hint: colors?.grey100
  };
  const background = {
    paper: theme.paper,
    default: theme.backgroundDefault
  };
  const card = {
    main: isDarkMode ? colors?.darkPrimaryMain : colors?.paper,
    light: isDarkMode ? colors?.darkPrimary200 : colors?.paper,
    hover: isDarkMode ? colors?.darkPrimary800 : colors?.paper
  };
  const asyncSelect = {
    main: isDarkMode ? colors?.darkPrimary800 : colors?.grey50
  };
  const canvasHeader = {
    executionLight: colors?.successLight,
    executionDark: colors?.successDark,
    deployLight: colors?.primaryLight,
    deployDark: colors?.primaryDark,
    saveLight: colors?.secondaryLight,
    saveDark: colors?.secondaryDark,
    settingsLight: colors?.grey300,
    settingsDark: colors?.grey700
  };
  const codeEditor = {
    main: isDarkMode ? colors?.darkPrimary800 : colors?.primaryLight
  };
  return {
    mode: customization?.navType,
    common,
    primary,
    secondary,
    error,
    orange,
    warning,
    success,
    grey,
    dark,
    text,
    background,
    card,
    asyncSelect,
    canvasHeader,
    codeEditor
  };
}
