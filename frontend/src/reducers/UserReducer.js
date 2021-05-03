import { SET_USER } from "../actions/UserActions";

const initState = null;

const userReducer = (state = initState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
