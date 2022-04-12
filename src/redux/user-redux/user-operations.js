import * as userActions from "./user-actions";
import axios from "axios";

axios.defaults.baseURL = "https://task-4-itransition.herokuapp.com/app";

const fetchUsers = () => dispatch => {
  dispatch(userActions.fetchUserRequest());
  axios
    .get("/users")
    .then(({ data }) => dispatch(userActions.fetchUserSuccess(data)))
    .catch(error => dispatch(userActions.fetchUserError(error.message)));
};

const updateBlockData = users => dispatch => {
  dispatch(userActions.updateBlockDataRequest());
  users.forEach(user => {
    axios
      .put(`/users/`, user)
      .then(({ data }) => dispatch(userActions.updateBlockDataSuccess(data)))
      .catch(error =>
        dispatch(userActions.updateBlockDataError(error.message)),
      );
  });
};

const deleteUsers = ids => dispatch => {
  dispatch(userActions.deleteUsersRequest());
  ids.forEach(id => {
    axios
      .delete(`/users/${id}`)
      .then(({ data }) => dispatch(userActions.deleteUsersSuccess(data)))
      .catch(error => dispatch(userActions.deleteUsersError(error.message)));
  });
};

export default { fetchUsers, updateBlockData, deleteUsers };
