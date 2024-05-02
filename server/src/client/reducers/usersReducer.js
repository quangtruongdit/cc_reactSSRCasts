import { FETCH_USERS } from "../actions";

//This is reducer of fetching users, then response state with data from payload.
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload.data;
    default:
      return state;
  }
};
