export const FETCH_USERS = "fetch_users";
//api is injected from applyMiddleware(thunk.withExtraArgument(axiosInstance))

export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get("/users");

  //Dispatch actions with payload to store with corresponding reducer sepecified from type.
  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};

export const FETCH_CURRENT_USER = "fetch_current_user";
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get("/current_user");

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res,
  });
};

export const FETCH_ADMINS = "fetch_admins";
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get("/admins");

  dispatch({
    type: FETCH_ADMINS,
    payload: res,
  });
};
