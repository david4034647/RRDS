require('es6-promise').polyfill();
require('raf').polyfill();
require('fastclick').attach(document.body);

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import api from './middleware/api';
import Root from './container/Root';

import {version} from '../../package.json';

export default (reducer, Page) => {
  const store = createStore(reducer, compose(
    applyMiddleware(thunk, api),
    window.devToolsExtension ? window.devToolsExtension() : devTools({
      name: location.href,
      hostname: process.env.REMOTEDEV_HOSTNAME,
      port: process.env.REMOTEDEV_PORT
    })
  ));

  render(
    <Provider store={store}>
      <Root>
        <Page />
      </Root>
    </Provider>,
    document.querySelector('#app')
  );

  window.HYBRID_VERSION = version;
};
