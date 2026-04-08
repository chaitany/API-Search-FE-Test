import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
    },
    background: {
      default: 'transparent',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #f0f4fd 0%, #ffeef2 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
  },
});

export default theme;