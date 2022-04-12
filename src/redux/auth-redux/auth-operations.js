import * as authActions from "./auth-actions";
import axios from "axios";

axios.defaults.baseURL = "https://task-4-itransition.herokuapp.com/app";

const signUp = data => async dispatch => {
  dispatch(authActions.signUpUserRequest());
  try {
    const response = await axios.post("/signup", data);
    dispatch(authActions.signUpUserSuccess(response.data));
  } catch (error) {
    dispatch(authActions.signUpUserError(error.message));
  }
};

const signIn = data => async dispatch => {
  dispatch(authActions.signInUserRequest());
  try {
    const response = await axios.post("/signin", data);
    dispatch(authActions.signInUserSuccess(response.data));
  } catch (error) {
    dispatch(authActions.signInUserError(error.message));
  }
};

const logOut = currentUser => async dispatch => {
  dispatch(authActions.logOutUserRequest());
  try {
    await axios.put("/users", currentUser);
    dispatch(authActions.logOutUserSuccess());
  } catch (error) {
    dispatch(authActions.logOutUserError(error.message));
  }
};

export default { signUp, signIn, logOut };
