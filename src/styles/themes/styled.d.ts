import 'styled-components';

interface TextColors {
  heading: string;
  default: string;
  complement: string;
  inColors: string;
}

interface ItemsColors {
  complement: string;
  background: string;
}

interface PrimaryColors {
  lighter: string;
  light: string;
  default: string;
  dark: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    title: 'light' | 'dark';
    text: TextColors;
    item: ItemsColors;
    background: string;
    primary: PrimaryColors;
    secondary: string;
  }
}
