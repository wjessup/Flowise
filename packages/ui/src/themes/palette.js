/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  const colorsOranges = {
    light: theme.colors?.orangeLight,
    main: theme.colors?.orangeMain,
    dark: theme.colors?.orangeDark,
  };

  const colors = {};
  const extra = {};

  if (theme.customization.isDarkMode) {
    colors.primary = {
      light: theme.colors?.darkPrimaryLight,
      dark: theme.colors?.darkPrimaryDark,
    };
    colors.secondary = {
      light: theme.colors?.darkSecondaryLight,
      dark: theme.colors?.darkSecondaryDark,
    };
    colors.success = {
      light: theme.colors?.successLight,
      dark: theme.colors?.successDark,
    };
    extra.primary = {
      '200': theme.colors?.darkPrimary200,
      '800': theme.colors?.darkPrimary800,
    };
    extra.secondary = {
      '200': theme.colors?.secondary200,
      '800': theme.colors?.secondary800,
    };
    extra.success = {
      '200': theme.colors?.success200,
    };
    colors.grey = {
      '500': theme.colors?.darkTextSecondary,
      '600': theme.heading,
      '700': theme.colors?.darkTextPrimary,
      '900': theme.textDark,
    };
    colors.dark = {
      light: theme.colors?.darkTextPrimary,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
    };
    extra.dark = {
      '800': theme.colors?.darkBackground,
      '900': theme.colors?.darkPaper,
    };
    colors.card = {
      main: theme.colors?.darkPrimaryMain,
      light: theme.colors?.darkPrimary200,
      hover: theme.colors?.darkPrimary800,
    };
    colors.asyncSelect = {
      main: theme.colors?.darkPrimary800,
    };
  } else {
    colors.primary = {
      light: theme.colors?.primaryLight,
      dark: theme.colors?.primaryDark,
    };
    colors.secondary = {
      light: theme.colors?.secondaryLight,
      dark: theme.colors?.secondaryDark,
    };
    colors.success = {
      light: theme.colors?.successLight,
      dark: theme.colors?.successDark,
    };
    extra.primary = {
      '200': theme.colors?.primary200,
      '800': theme.colors?.primary800,
    };
    extra.secondary = {
      '200': theme.colors?.secondary200,
      '800': theme.colors?.secondary800,
    };
    extra.success = {
      '200': theme.colors?.success200,
    };
    colors.grey = {
      '500': theme.darkTextSecondary,
      '600': theme.heading,
      '700': theme.darkTextPrimary,
      '900': theme.textDark,
    };
    colors.dark = {
      light: theme.colors?.darkTextPrimary,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
    };
    extra.dark = {
      '800': theme.colors?.darkBackground,
      '900': theme.colors?.darkPaper,
    };
    colors.card = {
      main: theme.colors?.paper,
      light: theme.colors?.paper,
      hover: theme.colors?.paper,
    };
    colors.asyncSelect = {
      main: theme.colors?.grey50,
    };
  }

  return {
    mode: theme?.customization?.navType,
    common: {
      black: theme.colors?.darkPaper,
    },
    primary: {
      colors: { ...colors.primary, main: theme.colors?.primaryMain },
      extra: { ...extra.primary },
    },
    secondary: {
      colors: { ...colors.secondary, main: theme.colors?.secondaryMain },
      extra: { ...extra.secondary },
    },
    error: {
      colors: {
        light: theme.colors?.errorLight,
        dark: theme.colors?.errorDark,
        main: theme.colors?.errorMain,
      },
    },
    orange: colorsOranges,
    warning: {
      colors: {
        light: theme.colors?.warningLight,
        dark: theme.colors?.warningDark,
        main: theme.colors?.warningMain,
      },
    },
    success: {
      colors: { ...colors.success, main: theme.colors?.successMain },
      extra: { ...extra.success },
    },
    grey: {
      colors: { ...colors.grey },
    },
    dark: {
      colors: { ...colors.dark },
      extra: { ...extra.dark },
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
      colors: { ...colors.card },
    },
    asyncSelect: {
      colors: { ...colors.asyncSelect },
    },
    canvasHeader: {
      execution: {
        light: theme.colors?.successLight,
        dark: theme.colors?.successDark,
      },
      deploy: {
        light: theme.colors?.primaryLight,
        dark: theme.colors?.primaryDark,
      },
      save: {
        light: theme.colors?.secondaryLight,
        dark: theme.colors?.secondaryDark,
      },
      settings: {
        light: theme.colors?.grey300,
        dark: theme.colors?.grey700,
      },
    },
    codeEditor: {
      colors: { ...colors.primary, main: theme.colors?.primaryLight },
    },
  };
}
