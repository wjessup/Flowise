/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  
  const {
    colors,
    customization: {
      isDarkMode,
      navType,
    },
    darkTextPrimary,
    darkTextSecondary,
    darkPaper,
    heading,
    paper,
    textDark,
    backgroundDefault,
  } = theme;

  const brandColors = {
    primary: {
      light: colors.primaryLight,
      main: colors.primaryMain,
      dark: colors.primaryDark,
      200: colors.primary200,
      800: colors.primary800,
    },
    secondary: {
      light: colors.secondaryLight,
      main: colors.secondaryMain,
      dark: colors.secondaryDark,
      200: colors.secondary200,
      800: colors.secondary800,
    },
    error: {
      light: colors.errorLight,
      main: colors.errorMain,
      dark: colors.errorDark,
    },
    orange: {
      light: colors.orangeLight,
      main: colors.orangeMain,
      dark: colors.orangeDark,
    },
    warning: {
      light: colors.warningLight,
      main: colors.warningMain,
      dark: colors.warningDark,
    },
    success: {
      light: colors.successLight,
      200: colors.success200,
      main: colors.successMain,
      dark: colors.successDark,
    },
    asyncSelect: {
      main: colors.grey50,
    },
  };

  const backgroundColors = {
    default: backgroundDefault,
    paper,
  };

  const textColors = {
    primary: darkTextPrimary,
    secondary: darkTextSecondary,
    dark: textDark,
    hint: colors.grey100,
  };

  const card = {
    main: isDarkMode ? colors.darkPrimaryMain ?? paper : paper,
    light: isDarkMode ? colors.darkPrimary200 ?? paper : paper,
    hover: isDarkMode ? colors.darkPrimary800 ?? paper : paper,
  };

  const canvasHeader = {
    executionLight: colors.successLight,
    executionDark: colors.successDark,
    deployLight: colors.primaryLight,
    deployDark: colors.primaryDark,
    saveLight: colors.secondaryLight,
    saveDark: colors.secondaryDark,
    settingsLight: colors.grey300,
    settingsDark: colors.grey700,
  };

  const codeEditor = {
    main: isDarkMode ? colors.darkPrimary800 ?? colors.primaryLight : colors.primaryLight,
  };

  const grey = {
    50: colors.grey50,
    100: colors.grey100,
    200: colors.grey200,
    300: colors.grey300,
    500: darkTextSecondary,
    600: heading,
    700: darkTextPrimary,
    900: textDark,
  };

  const darkColors = {
    light: colors.darkTextPrimary,
    main: colors.darkLevel1,
    dark: colors.darkLevel2,
    800: colors.darkBackground,
    900: darkPaper,
  };

  return {
    mode: navType,
    common: {
      black: darkPaper,
    },
    primary: isDarkMode
      ? { ...brandColors.primary, light: colors.darkPrimaryLight, dark: colors.darkPrimaryDark, 200: colors.darkPrimary200, 800: colors.darkPrimary800 }
      : brandColors.primary,
    secondary: isDarkMode
      ? { ...brandColors.secondary, light: colors.darkSecondaryLight, dark: colors.darkSecondaryDark }
      : brandColors.secondary,
    error: brandColors.error,
    orange: brandColors.orange,
    warning: brandColors.warning,
    success: brandColors.success,
    asyncSelect: brandColors.asyncSelect,
    background: backgroundColors,
    text: textColors,
    card,
    canvasHeader,
    grey,
    dark: darkColors,
    codeEditor
  };
}
