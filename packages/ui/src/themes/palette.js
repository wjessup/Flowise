/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
    const colors = {
        primaryLight: 'light',
        primaryMain: 'main',
        primaryDark: 'dark',
        primary200: 200,
        primary800: 800,
        secondaryLight: 'light',
        secondaryMain: 'main',
        secondaryDark: 'dark',
        secondary200: 200,
        secondary800: 800,
        errorLight: 'light',
        errorMain: 'main',
        errorDark: 'dark',
        orangeLight: 'light',
        orangeMain: 'main',
        orangeDark: 'dark',
        warningLight: 'light',
        warningMain: 'main',
        warningDark: 'dark',
        successLight: 'light',
        success200: 200,
        successMain: 'main',
        successDark: 'dark',
        grey50: 50,
        grey100: 100,
        grey200: 200,
        grey300: 300,
        darkTextSecondary: 500,
        heading: 600,
        darkTextPrimary: 700,
        textDark: 900,
        darkTextPrimary: 'light',
        darkLevel1: 'main',
        darkLevel2: 'dark',
        darkBackground: 800,
        darkPaper: 900,
        paper: 'paper',
        backgroundDefault: 'backgroundDefault'
    };
    
    const getColor = (colorName) => {
        const color = colors[colorName];
        
        if (color === undefined) {
            return undefined;
        }
        
        if (typeof color === 'string') {
            return theme?.customization?.isDarkMode ?
                theme?.colors?.[`dark${colorName}${color.charAt(0).toUpperCase()}${color.slice(1)}`] :
                theme?.colors?.[`${colorName}${color.charAt(0).toUpperCase()}${color.slice(1)}`];
        }
        
        return theme?.customization?.isDarkMode ?
            theme?.colors?.[`dark${colorName}${color}`] :
            theme?.colors?.[`${colorName}${color}`];
    };
    
    return {
        mode: theme?.customization?.navType,
        common: {
            black: getColor('darkPaper')
        },
        primary: {
            light: getColor('primary'+'Light'),
            main: getColor('primary'+'Main'),
            dark: getColor('primary'+'Dark'),
            200: getColor('primary'+200),
            800: getColor('primary'+800)
        },
        secondary: {
            light: getColor('secondary'+'Light'),
            main: getColor('secondary'+'Main'),
            dark: getColor('secondary'+'Dark'),
            200: getColor('secondary'+200),
            800: getColor('secondary'+800)
        },
        error: {
            light: getColor('error'+'Light'),
            main: getColor('error'+'Main'),
            dark: getColor('error'+'Dark')
        },
        orange: {
            light: getColor('orange'+'Light'),
            main: getColor('orange'+'Main'),
            dark: getColor('orange'+'Dark')
        },
        warning: {
            light: getColor('warning'+'Light'),
            main: getColor('warning'+'Main'),
            dark: getColor('warning'+'Dark')
        },
        success: {
            light: getColor('success'+'Light'),
            200: getColor('success'+200),
            main: getColor('success'+'Main'),
            dark: getColor('success'+'Dark')
        },
        grey: {
            50: getColor('grey'+50),
            100: getColor('grey'+100),
            200: getColor('grey'+200),
            300: getColor('grey'+300),
            500: getColor('darkText'+'Secondary'),
            600: getColor('heading'),
            700: getColor('darkText'+'Primary'),
            900: getColor('textDark')
        },
        dark: {
            light: getColor('darkText'+'Primary'),
            main: getColor('dark'+'Level1'),
            dark: getColor('dark'+'Level2'),
            800: getColor('dark'+'Background'),
            900: getColor('dark'+'Paper')
        },
        text: {
            primary: getColor('darkText'+'Primary'),
            secondary: getColor('darkText'+'Secondary'),
            dark: getColor('textDark'),
            hint: getColor('grey'+100)
        },
        background: {
            paper: getColor('paper'),
            default: getColor('backgroundDefault')
        },
        card: {
            main: getColor('paper'),
            light: getColor('primary'+200),
            hover: getColor('primary'+800)
        },
        asyncSelect: {
            main: getColor('darkPrimary'+800) || getColor('grey'+50)
        },
        canvasHeader: {
            executionLight: getColor('success'+'Light'),
            executionDark: getColor('success'+'Dark'),
            deployLight: getColor('primary'+'Light'),
            deployDark: getColor('primary'+'Dark'),
            saveLight: getColor('secondary'+'Light'),
            saveDark: getColor('secondary'+'Dark'),
            settingsLight: getColor('grey'+300),
            settingsDark: getColor('grey'+700)
        },
        codeEditor: {
            main: getColor('primary'+'Light')
        }
    };
}
