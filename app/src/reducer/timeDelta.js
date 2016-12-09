export default (state = 0, action) => {
  if (action.response && action.response.timeDelta) {
    return action.response.timeDelta;
  }

  return state;
};
