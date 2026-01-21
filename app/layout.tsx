import type { Metadata } from 'next';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/app/theme';

export const metadata: Metadata = {
  title: 'Crystal GPS',
  description: 'Just to show GPS positions',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
      <html lang="en">
      <body>
      <AppRouterCacheProvider>
        <ThemeProvider theme={ theme }>
          <CssBaseline/>
          { children }
        </ThemeProvider>
      </AppRouterCacheProvider>
      </body>
      </html>
  );
}
