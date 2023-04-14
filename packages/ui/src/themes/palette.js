/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
   const generateColor = (prefix, isMain = false) => {
      const darkMode = theme.customization.isDarkMode;    
      const color = {
         light: darkMode ? theme.colors[`dark${prefix}${isMain ? "" : "Light"}`] : theme.colors[`${prefix}${isMain ? "" : "Light"}`],
         main: theme.colors[`${prefix}${isMain ? "" : "Main"}`],
         dark: darkMode ? theme.colors[`dark${prefix}${isMain ? "" : "Dark"}`] : theme.colors[`${prefix}${isMain ? "" : "Dark"}`],
         200: darkMode ? theme.colors[`dark${prefix}200`] : theme.colors[`${prefix}200`],
         800: darkMode ? theme.colors[`dark${prefix}800`] : theme.colors[`${prefix}800`]
      };
      return color;   
   }

   const primaryColor = generateColor('primary', true);
   const secondaryColor = generateColor('secondary', true);

   return {
      mode: theme?.customization?.navType,
      common: {
         black: theme.colors?.darkPaper
      },
      primary: primaryColor,
      secondary: secondaryColor,
      error: generateColor('error'),
      orange: generateColor('orange'),
      warning: generateColor('warning'),
      success: {
         light: theme.colors?.successLight,
         200: theme.colors?.success200,
         main: theme.colors?.successMain,
         dark: theme.colors?.successDark
      },
      grey: {
         50: theme.colors?.grey50,
         100: theme.colors?.grey100,
         200: theme.colors?.grey200,
         300: theme.colors?.grey300,
         500: theme.darkTextSecondary,
         600: theme.heading,
         700: theme.darkTextPrimary,
         900: theme.textDark
      },
      dark: {
         light: theme.colors?.darkTextPrimary,
         main: theme.colors?.darkLevel1,
         dark: theme.colors?.darkLevel2,
         800: theme.colors?.darkBackground,
         900: theme.colors?.darkPaper
      },
      text: {
         primary: theme.darkTextPrimary,
         secondary: theme.darkTextSecondary,
         dark: theme.textDark,
         hint: theme.colors?.grey100
      },
      background: {
         paper: theme.paper,
         default: theme.backgroundDefault
      },
      card: {
         main: primaryColor.main,
         light: generateColor('primary').light,
         hover: primaryColor["800"]
      },
      asyncSelect: {
         main: primaryColor["800"],
      },
      canvasHeader: {
         executionLight: generateColor('success').light,
         executionDark: generateColor('success').dark,
         deployLight: primaryColor.light,
         deployDark: primaryColor.dark,
         saveLight: secondaryColor.light,
         saveDark: secondaryColor.dark,
         settingsLight: generateColor('grey').300,
         settingsDark: generateColor('grey').700
      },
      codeEditor: {
         main: primaryColor.light
      }
   }
}
