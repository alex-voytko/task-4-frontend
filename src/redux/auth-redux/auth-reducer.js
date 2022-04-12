import { combineReducers, createReducer } from "@reduxjs/toolkit";
import * as authActions from "./auth-actions";

const loginedUser = createReducer(
  {},
  {
    [authActions.signInUserSuccess]: (_, { payload }) => ({ ...payload }),
    [authActions.logOutUserSuccess]: () => "",
  },
);

const error = createReducer(null, {
  [authActions.signUpUserError]: (_, { payload }) => payload,
  [authActions.signInUserError]: (_, { payload }) => payload,
  [authActions.logOutUserError]: (_, { payload }) => payload,
});

export default combineReducers({ error, loginedUser });
