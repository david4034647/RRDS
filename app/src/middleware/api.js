import 'isomorphic-fetch';
import assign from 'lodash/assign';
import queryString from 'query-string';
// import frog from '@cfp/frog';

import {API_ROOT} from '../config';

export const CALL_API = 'Call API';

function callApi({
  endpoint,
  params,
  method = 'POST',
  json = false,
  customHeaders = {}
}) {
  const fullUrl = /^https?:\/\//.test(endpoint) ? endpoint : `${API_ROOT}${endpoint}`;
  //console.log("URL[" + fullUrl + "]");

  const headers = new Headers();
  if (json) {
    headers.append('Content-Type', 'application/json');
  } else {
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  Object.keys(customHeaders).forEach((k) => {
    headers.append(k, customHeaders[k]);
  });

  let devicePromise = Promise.resolve();
  // if (frog.ua.browser.CFP) {
  //   devicePromise = frog.getDeviceInfo().then(({UDID}) => {
  //     if (UDID) {
  //       headers.append('UDID', UDID);
  //     }
  //   });
  // }

  const body = json ? JSON.stringify(params) : queryString.stringify(params);
  return devicePromise.then(() => {
    return fetch(fullUrl, {
      method,
      headers,
      body
    }).then(response => {
      //console.log(response);
      if (!response.ok) {
        return Promise.reject({
          retCode: response.status,
          retMsg: response.statusText
        });
      }

      return response.json();
    }).then(json => {
      //console.log("json:" + json);
      if (json.retCode) {
        return Promise.reject(json);
      }

      return json;
    }).catch((err) => {
      //console.log("err:" + err);
      return Promise.reject({
        retCode: err.retCode,
        retMsg: err.retMsg
      });
    });
  });
}

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  let {endpoint} = callAPI;
  const {types, params = {}, schema, showLoading, method, json, customHeaders} = callAPI;
  const state = store.getState();
  // const {csrf: {name, value}} = state;
  //
  // if (name && value) {
  //   customHeaders[name] = value;
  // }

  if (typeof endpoint === 'function') {
    endpoint = endpoint(state);
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  function actionWith(data) {
    const finalAction = assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({
    type: requestType,
    showLoading
  }));

  return callApi({
    endpoint,
    params,
    schema,
    method,
    json,
    customHeaders
  }).then((response) => {
    //console.log(response);
    next(actionWith({
      response,
      type: successType,
      showLoading: false
    }));

    return {
      retCode: 0,
      retMsg: ''
    };
  }, ({retCode, retMsg}) => {
    console.log("retCode:" + retCode);
    next(actionWith({
      type: failureType,
      error: retMsg,
      code: retCode,
      showLoading: false
    }));

    return {
      retCode,
      retMsg
    };
  });
};
