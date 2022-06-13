import { ReactNode, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { dark, light } from '../../styles/themes';

import { AppThemeContext } from './context';

import { Theme } from './types';

const themes = {
  light,
  dark,
};

interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(state => (state !== 'light' ? 'light' : 'dark'));
  };

  return (
    <AppThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
}
