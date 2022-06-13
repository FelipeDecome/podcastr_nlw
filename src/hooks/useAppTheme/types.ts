export type Theme = 'light' | 'dark';

export interface AppThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
