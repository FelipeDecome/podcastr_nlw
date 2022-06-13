import { ReactNode } from 'react';

import { PlayerProvider } from '../hooks/usePlayer';

import { AppThemeProvider } from './useAppTheme';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AppThemeProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </AppThemeProvider>
  );
}
