import { createAction } from "@reduxjs/toolkit";

export const signUpUserRequest = createAction("auth/signUpUserRequest");
export const signUpUserSuccess = createAction("auth/signUpUserSuccess");
export const signUpUserError = createAction("auth/signUpUserError");

export const signInUserRequest = createAction("auth/signInUserRequest");
export const signInUserSuccess = createAction("auth/signInUserSuccess");
export const signInUserError = createAction("auth/signInUserError");

export const logOutUserRequest = createAction("auth/logOutUserRequest");
export const logOutUserSuccess = createAction("auth/logOutUserSuccess");
export const logOutUserError = createAction("auth/logOutUserError");
