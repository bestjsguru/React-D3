import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import allReducers from './reducers';
import App from './App';

const loggerMiddleware = createLogger();

const store = createStore(
  allReducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )
);

describe('Home testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  });
});
