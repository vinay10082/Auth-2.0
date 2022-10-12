import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Reducers from './reducers'
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const store = createStore( Reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
