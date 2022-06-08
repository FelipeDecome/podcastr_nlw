import { DefaultTheme } from 'styled-components';

export const light: DefaultTheme = {
  title: 'light',
  background: '#FAFAFA',
  text: {
    heading: '#262626',
    default: '#525252',
    complement: '#A3A3A3',
    inColors: '#FAFAFA',
  },
  item: {
    background: '#F5F5F5',
    complement: '#D4D4D4',
  },
  primary: {
    lighter: '#8B5CF6',
    light: '#7C3AED',
    default: '#5B21B6',
    dark: '#4C1D95',
  },
  secondary: '#06B6D4',
};

export const dark: DefaultTheme = {
  title: 'dark',
  background: '#262626',
  text: {
    heading: '#F5F5F5',
    default: '#D4D4D4',
    complement: '#737373',
    inColors: '#FAFAFA',
  },
  item: {
    background: '#2D2D2D',
    complement: '#525252',
  },
  primary: {
    lighter: '#8B5CF6',
    light: '#7C3AED',
    default: '#5B21B6',
    dark: '#4C1D95',
  },
  secondary: '#06B6D4',
};
