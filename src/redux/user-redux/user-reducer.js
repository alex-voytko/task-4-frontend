import { combineReducers, createReducer } from "@reduxjs/toolkit";
import * as userActions from "./user-actions";
import * as authActions from "../auth-redux/auth-actions";

const items = createReducer([], {
  [userActions.fetchUserSuccess]: (_, { payload }) => payload,
});

const error = createReducer(null, {
  [userActions.fetchUserError]: (_, { payload }) => payload,
  [userActions.updateBlockDataError]: (_, { payload }) => payload,
  [userActions.deleteUsersError]: (_, { payload }) => payload,
});

const redirect = createReducer(false, {
  [userActions.fetchUserSuccess]: () => true,
  [authActions.logOutUserSuccess]: () => false,
  [userActions.deleteUsersSuccess]: () => true,
});

const loading = createReducer(false, {
  [userActions.fetchUserRequest]: () => true,
  [userActions.fetchUserSuccess]: () => false,
  [userActions.updateBlockDataRequest]: () => true,
  [userActions.updateBlockDataSuccess]: () => false,
  [userActions.deleteUsersRequest]: () => true,
  [userActions.deleteUsersSuccess]: () => false,
});

export default combineReducers({
  items,
  error,
  redirect,
  loading,
});
