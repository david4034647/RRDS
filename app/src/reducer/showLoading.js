import isBoolean from 'lodash/isBoolean';

export default (state = false, action) => {
  if (isBoolean(action.showLoading)) {
    return action.showLoading;
  }

  return state;
};
