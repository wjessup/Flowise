/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function getColor(theme, colorPath) {
  const path = colorPath.split(".");
  return path.reduce((obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : null), theme);
}

function setColors(colors, isDarkMode) {
  const colorSettings = [
    { key: "primary", mode: "Light", default: "primaryLight", dark: "darkPrimaryLight" },
    { key: "primary", mode: "Main", default: "primaryMain" },
    { key: "primary", mode: "Dark", default: "primaryDark", dark: "darkPrimaryDark" },
    { key: "primary", mode: "200", default: "primary200", dark: "darkPrimary200" },
    { key: "primary", mode: "800", default: "primary800", dark: "darkPrimary800" },
    { key: "secondary", mode: "Light", default: "secondaryLight", dark: "darkSecondaryLight" },
    { key: "secondary", mode: "Main", default: "secondaryMain", dark: "darkSecondaryMain" },
    { key: "secondary", mode: "Dark", default: "secondaryDark", dark: "darkSecondaryDark" },
    { key: "grey", mode: "50", default: "grey50" },
    { key: "grey", mode: "100", default: "grey100" },
    { key: "grey", mode: "200", default: "grey200" },
    { key: "grey", mode: "300", default: "grey300" },
    { key: "codeEditor", mode: "Main", default: "primaryLight" }
  ];
  const result = colorSettings.reduce((acc, setting) => {
    const { key, mode, default: defaultValue, dark } = setting;
    const darkModeColorKey = dark ? dark : defaultValue;
    const lightModeColorKey = defaultValue;
    const colorKey = isDarkMode ? darkModeColorKey : lightModeColorKey;
    return { ...acc, [key]: { ...acc[key], [mode.toLowerCase()]: getColor(colors, `${colorKey}`)}};
  }, {});
  return result;
}

function themePalette(theme) {
  const colors = getColor(theme, "colors") || {};
  const isDarkMode = theme.customization?.isDarkMode;
  const grey = setColors(colors, isDarkMode);

  return {
    mode: getColor(theme, "customization.navType"),
    common: {
      black: getColor(colors, "darkPaper"),
    },
    primary: {
      ...setColors(colors, isDarkMode).primary
    },
    secondary: {
      ...setColors(colors, isDarkMode).secondary
    },
    error: {
      light: getColor(colors, "errorLight"),
      main: getColor(colors, "errorMain"),
      dark: getColor(colors, "errorDark"),
    },
    orange: {
      light: getColor(colors, "orangeLight"),
      main: getColor(colors, "orangeMain"),
      dark: getColor(colors, "orangeDark"),
    },
    warning: {
      light: getColor(colors, "warningLight"),
      main: getColor(colors, "warningMain"),
      dark: getColor(colors, "warningDark"),
    },
    success: {
      light: getColor(colors, "successLight"),
      200: getColor(colors, "success200"),
      main: getColor(colors, "successMain"),
      dark: getColor(colors, "successDark"),
    },
    grey,
    dark: {
      light: getColor(colors, "darkTextPrimary"),
      main: getColor(colors, "darkLevel1"),
      dark: getColor(colors, "darkLevel2"),
      800: getColor(colors, "darkBackground"),
      900: getColor(colors, "darkPaper"),
    },
    text: {
      primary: getColor(theme, "darkTextPrimary"),
      secondary: getColor(theme, "darkTextSecondary"),
      dark: getColor(theme, "textDark"),
      hint: getColor(colors, "grey100"),
    },
    background: {
      paper: getColor(theme, "paper"),
      default: getColor(theme, "backgroundDefault"),
    },
    card: {
      main: setColors(colors, isDarkMode).primary.main,
      light: setColors(colors, isDarkMode).primary.light,
      hover: setColors(colors, isDarkMode).primary[800],
    },
    asyncSelect: {
      main: getColor(colors, isDarkMode ? "darkPrimary800" : "grey50"),
    },
    canvasHeader: {
      executionLight: getColor(colors, "successLight"),
      executionDark: getColor(colors, "successDark"),
      deployLight: getColor(colors, "primaryLight"),
      deployDark: getColor(colors, "primaryDark"),
      saveLight: getColor(colors, "secondaryLight"),
      saveDark: getColor(colors, "secondaryDark"),
      settingsLight: getColor(colors, "grey300"),
      settingsDark: getColor(colors, "grey700"),
    },
    codeEditor: {
      main: setColors(colors, isDarkMode).codeEditor.main,
    },
  };
}
