const reducer = (state, action) => {
  if (state === undefined) {
    state = {
      userID: null,
    };
  }

  switch (action.type) {
    case "ALTERID":
      return {
        ...state,
        userID: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
