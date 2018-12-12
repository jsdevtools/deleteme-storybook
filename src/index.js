import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './app/state/store';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

const theme = {
  borderWidth: '2px',
  'button.primary': 'mediumseagreen',
  'button.secondary': 'magenta'
};

render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
registerServiceWorker();
