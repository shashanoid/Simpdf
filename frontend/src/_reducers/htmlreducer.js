export default (state = {}, action) => {
  switch (action.type) {
    case "HTML_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
