'use client';

import { createTheme } from '@mui/material';

export const theme = createTheme({
  shape: { borderRadius: 16 },
  typography: {
    h4: { fontWeight: 800 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 700, borderRadius: 12 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
  },
})