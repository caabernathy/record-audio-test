import React from 'react';
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
export const mainBlue = '#46AFB7';
export const pink = '#F7957E';
export const dark = '#393E46';
export const greenDark = '#256065';
export const darkGreen = '#1A4346';
export const blueLight = '#ECF7F8';
export const blueLight2 = '#F8FCFC';
export const greyLight = '#D3DFE0';
export const greenGrey = '#5F7B7E';
export const error = '#EB5757';
declare module '@material-ui/core/styles' {
  interface Theme {
    mainBlue: React.CSSProperties['color'];
    pink: React.CSSProperties['color'];
    dark: React.CSSProperties['color'];
    greenDark: React.CSSProperties['color'];
    darkGreen: React.CSSProperties['color'];
    blueLight: React.CSSProperties['color'];
    blueLight2: React.CSSProperties['color'];
    greyLight: React.CSSProperties['color'];
    greenGrey: React.CSSProperties['color'];
    error: React.CSSProperties['color'];
    black: React.CSSProperties['color'];
    white: React.CSSProperties['color'];
  }
  interface ThemeOptions {
    mainBlue: React.CSSProperties['color'];
    pink: React.CSSProperties['color'];
    dark: React.CSSProperties['color'];
    greenDark: React.CSSProperties['color'];
    darkGreen: React.CSSProperties['color'];
    blueLight: React.CSSProperties['color'];
    blueLight2: React.CSSProperties['color'];
    greyLight: React.CSSProperties['color'];
    greenGrey: React.CSSProperties['color'];
    error: React.CSSProperties['color'];
    black: React.CSSProperties['color'];
    white: React.CSSProperties['color'];
  }
}
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    pink: Palette['primary'];
  }
  interface PaletteOptions {
    pink: PaletteOptions['primary'];
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: mainBlue,
      contrastText: 'white',
    },
    secondary: {
      main: darkGreen,
      contrastText: greenDark,
    },
    pink: {
      main: pink,
    },
  },
  mainBlue,
  error,
  pink,
  dark,
  greenDark,
  darkGreen,
  blueLight,
  blueLight2,
  greyLight,
  greenGrey,
  black: '#000',
  white: '#fff',
  typography: {
    fontFamily: [
      'Open Sans',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(', '),
    fontSize: 16,
    h1: {
      fontSize: 36,
      color: darkGreen,
    },
    h2: {
      fontSize: 36,
      color: greenDark,
    },
    subtitle1: {
      textTransform: 'uppercase',
      fontSize: 48,
      fontWeight: 600,
      color: greenDark,
    },
    subtitle2: {
      fontWeight: 600,
      textTransform: 'uppercase',
      fontSize: 36,
      color: greenDark,
    },
    body1: {
      fontSize: 24,
      color: darkGreen,
    },
    body2: {
      fontSize: 20,
      color: darkGreen,
    },
    caption: {
      fontSize: 18,
      color: greenGrey,
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        '&$disabled': {
          color: greyLight,
          backgroundColor: blueLight,
        },
      },
    },
    MuiFormControlLabel: {
      root: {
        '& span': {
          color: greenDark,
        },
        '& .MuiTypography-root': {
          cursor: 'initial',
          color: greenGrey,
          fontSize: 16,
          lineHeight: '16px',
          '& a': {
            fontSize: 16,
            color: greenGrey,
          },
        },
      },
    },
    MuiFormControl: {
      root: {
        '& .MuiInput-underline::before': {
          borderBottomColor: greyLight,
        },
        '& input': {
          fontSize: 18,
          lineHeight: '18px',
          paddingBottom: 8,
          color: darkGreen,
        },
        '& label': {
          color: greenGrey,
          fontSize: 18,
          fontWeight: 400,
          lineHeight: '18px',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
