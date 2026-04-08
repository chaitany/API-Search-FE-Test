import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';
import SearchApp from './components/SearchApp';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}> 
        <CssBaseline />
        <SearchApp />
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;