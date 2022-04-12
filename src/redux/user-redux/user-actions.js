import { createAction } from "@reduxjs/toolkit";

export const fetchUserRequest = createAction("users/fetchUserRequest");
export const fetchUserSuccess = createAction("users/fetchUserSuccess");
export const fetchUserError = createAction("users/fetchUserError");

export const deleteUsersRequest = createAction("users/deleteUsersRequest");
export const deleteUsersSuccess = createAction("users/deleteUsersSuccess");
export const deleteUsersError = createAction("users/deleteUsersError");

export const updateBlockDataRequest = createAction(
  "users/updateBlockDataRequest",
);
export const updateBlockDataSuccess = createAction(
  "users/updateBlockDataSuccess",
);
export const updateBlockDataError = createAction("users/updateBlockDataError");
