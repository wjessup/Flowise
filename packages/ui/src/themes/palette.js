/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function getColor(theme, colorName, shade) {
  const definedColor = theme.colors[colorName];

  if (!definedColor) {
    return '';
  }

  const shadeValue = definedColor[shade];
  if (!shadeValue) {
    return '';
  }

  return shadeValue;
}

function themePalette(theme) {
  const palette = {
    modes: theme?.customization?.navType,
    general: {
      black: getColor(theme, 'darkPaper', 'default'),
      greyLight: getColor(theme, 'grey', '50'),
      greyLighter: getColor(theme, 'grey', '100'),
      greyLightest: getColor(theme, 'grey', '200'),
      greyDark: getColor(theme, 'grey', '300'),
      greyDarker: getColor(theme, 'grey', '500'),
      greyDarkest: getColor(theme, 'grey', '700'),
      blackest: getColor(theme, 'textDark', 'default'),
    },
    primary: {
      light: getColor(theme, 'primary', 'light-mode'),
      main: getColor(theme, 'primary', 'main'),
      dark: getColor(theme, 'primary', 'dark-mode'),
      darker: getColor(theme, 'primary', 'darker'),
      lightest: getColor(theme, 'primary', 'lightest'),
      darkest: getColor(theme, 'primary', 'darkest'),
    },
    secondary: {
      light: getColor(theme, 'secondary', 'light-mode'),
      main: getColor(theme, 'secondary', 'main'),
      dark: getColor(theme, 'secondary', 'dark-mode'),
      darker: getColor(theme, 'secondary', 'darker'),
      lightest: getColor(theme, 'secondary', 'lightest'),
      darkest: getColor(theme, 'secondary', 'darkest'),
    },
    error: {
      light: getColor(theme, 'error', 'light'),
      main: getColor(theme, 'error', 'main'),
      dark: getColor(theme, 'error', 'dark'),
    },
    orange: {
      light: getColor(theme, 'orange', 'light'),
      main: getColor(theme, 'orange', 'main'),
      dark: getColor(theme, 'orange', 'dark'),
    },
    success: {
      light: getColor(theme, 'success', 'light'),
      main: getColor(theme, 'success', 'main'),
      dark: getColor(theme, 'success', 'dark'),
    },
    warning: {
      light: getColor(theme, 'warning', 'light-mode'),
      main: getColor(theme, 'warning', 'main'),
      dark: getColor(theme, 'warning', 'dark-mode'),
    },
    text: {
      primary: palette.general.blackest,
      secondary: palette.general.greyDarker,
      light: palette.general.greyDarkest,
      lighter: palette.general.greyLighter,
    },
    states: {
      normal: getColor(theme, 'neutral', 'darkest'),
      active: getColor(theme, 'primary', 'darker'),
      alert: getColor(theme, 'error', 'main'),
      disable: getColor(theme, 'grey', '200'),
      focus: getColor(theme, 'primary', 'light-mode'),
    },
  };
  return palette;
}
