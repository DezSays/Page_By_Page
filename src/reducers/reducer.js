const reducer = (state, action) => {
    if (state === undefined) {
      state = {
        favorites: [],
        read: [],
        tbr: []
      };
    }
  
    switch (action.type) {
      case "ADD_FAV_BOOK":
        return state.concat(action.payload);
  
      case "ADD_COMPLETED_BOOK":
        return state.concat(action.payload);
  
      case "ADD_TBR_BOOK":
        return state.concat(action.payload);
  
      default:
        return state;
    }
  };
  
  export default reducer;
  