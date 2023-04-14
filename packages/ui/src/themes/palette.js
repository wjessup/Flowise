/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
    const customization = theme?.customization || {};
    const colors = theme?.colors || {};

    const palette = {
        mode: customization?.navType,
        common: {
            black: colors?.darkPaper
        },
        primary: {
            light: customization.isDarkMode ? colors?.darkPrimaryLight : colors?.primaryLight,
            main: colors?.primaryMain,
            dark: customization.isDarkMode ? colors?.darkPrimaryDark : colors?.primaryDark,
            200: customization.isDarkMode ? colors?.darkPrimary200 : colors?.primary200,
            800: customization.isDarkMode ? colors?.darkPrimary800 : colors?.primary800
        },
        secondary: {
            light: customization.isDarkMode ? colors?.darkSecondaryLight : colors?.secondaryLight,
            main: customization.isDarkMode ? colors?.darkSecondaryMain : colors?.secondaryMain,
            dark: customization.isDarkMode ? colors?.darkSecondaryDark : colors?.secondaryDark,
            200: colors?.secondary200,
            800: colors?.secondary800
        },
        error: {
            light: colors?.errorLight,
            main: colors?.errorMain,
            dark: colors?.errorDark
        },
        orange: {
            light: colors?.orangeLight,
            main: colors?.orangeMain,
            dark: colors?.orangeDark
        },
        warning: {
            light: colors?.warningLight,
            main: colors?.warningMain,
            dark: colors?.warningDark
        },
        success: {
            light: colors?.successLight,
            200: colors?.success200,
            main: colors?.successMain,
            dark: colors?.successDark
        },
        grey: {
            50: colors?.grey50,
            100: colors?.grey100,
            200: colors?.grey200,
            300: colors?.grey300,
            500: colors?.darkTextSecondary,
            600: theme.heading,
            700: colors?.darkTextPrimary,
            900: theme.textDark
        },
        dark: {
            light: colors?.darkTextPrimary,
            main: colors?.darkLevel1,
            dark: colors?.darkLevel2,
            800: colors?.darkBackground || color?.primaryDark,
            900: colors?.darkPaper || colors?.darkLevel1
        },
        text: {
            primary: colors?.darkTextPrimary,
            secondary: colors?.darkTextSecondary,
            dark: theme.textDark,
            hint: colors?.grey100
        },
        background: {
            paper: theme.paper,
            default: theme.backgroundDefault
        },
        card: {
            main: customization.isDarkMode ? colors?.darkPrimaryMain : colors?.paper,
            light: customization.isDarkMode ? colors?.darkPrimary200 : colors?.paper,
            hover: customization.isDarkMode ? colors?.darkPrimary800 : colors?.paper
        },
        asyncSelect: {
            main: customization.isDarkMode ? colors?.darkPrimary800 : colors?.grey50
        },
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
        codeEditor: {
            main: customization.isDarkMode ? colors?.darkPrimary800 : colors?.primaryLight
        }
    };

    return palette;
}
