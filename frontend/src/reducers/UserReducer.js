import { SET_USER, CLEAR_USER, SET_ADDRESS } from "../actions/UserActions";

const initState = null;

const userReducer = (state = initState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case SET_USER:
      return action.user;
    case CLEAR_USER:
      return null;
    case SET_ADDRESS:
      return Object.assign({}, state, { address: action.address });
    default:
      return state;
  }
};

export default userReducer;
