import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import './app/index.css';
import App from './app/App';
import registerServiceWorker from './app/registerServiceWorker';
import { store } from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('main-view'),
);
registerServiceWorker();
