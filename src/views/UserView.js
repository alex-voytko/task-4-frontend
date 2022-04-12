import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import _ from "lodash";
import userOperations from "../redux/user-redux/user-operations";
import authOperations from "../redux/auth-redux/auth-operations";

function UserView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [markedItems, setMarkedItems] = useState([]);
  const getItems = useSelector(state => state.users.items);
  const isLogined = useSelector(state => state.auth.loginedUser.token);
  const currentUserId = useSelector(state => state.auth.loginedUser.userId);
  let counter = 1;

  const handleChange = useCallback(e => {
    const { dataset, id } = e.target;
    setMarkedItems(
      !markedItems.map(el => el._id).includes(id)
        ? [...markedItems, users[dataset.id]]
        : markedItems.filter(el => el._id !== id),
    );
  });

  const handleChangeAll = useCallback(e => {
    let { checked } = e.target;
    const listRef = document.querySelectorAll(".render-table");
    listRef.forEach(el => (el.firstChild.firstElementChild.checked = checked));
    setMarkedItems(checked ? [...users] : []);
  });

  const onDeleteClick = () => {
    const ids = markedItems.map(({ _id }) => _id);
    dispatch(userOperations.deleteUsers(ids));
    if (ids.includes(currentUserId)) {
      dispatch(authOperations.logOut({ _id: currentUserId, isOnline: false }));
    }
    const updatedUsers = [...users];
    _.pullAllWith(updatedUsers, markedItems, _.isEqual);
    setMarkedItems([]);
    setUsers([...updatedUsers]);
  };

  const onBlockClick = e => {
    const updateData =
      e.target.textContent === "Block"
        ? markedItems.map(({ _id }) => ({
            _id,
            isBlocked: true,
            isOnline: false,
          }))
        : markedItems.map(({ _id }) => ({ _id, isBlocked: false }));
    setMarkedItems([]);
    dispatch(userOperations.updateBlockData(updateData));
    if (
      e.target.textContent === "Block" &&
      updateData.map(({ _id }) => _id).includes(currentUserId)
    ) {
      dispatch(authOperations.logOut({ _id: currentUserId, isOnline: false }));
    }
    const listRef = document.querySelectorAll(".render-table");
    listRef.forEach(el => (el.firstChild.firstElementChild.checked = false));
  };

  useEffect(() => {
    document.querySelector("#select-all").checked =
      users.length === markedItems.length ? true : false;
  }, [markedItems, users]);

  useEffect(() => {
    dispatch(userOperations.fetchUsers());
    setUsers([...getItems]);
  }, [dispatch]);

  useEffect(() => {
    if (!isLogined) navigate("/sign-in");
  }, [isLogined]);

  return (
    <>
      <>
        <h2 className="mb-4">User List</h2>
        <Button
          variant="dark"
          disabled={!markedItems.length ? true : false}
          type="button"
          onClick={onBlockClick}
        >
          Block
        </Button>
        <Button
          variant="secondary"
          disabled={!markedItems.length ? true : false}
          type="button"
          onClick={onBlockClick}
        >
          Unblock
        </Button>
        <Button
          variant="danger"
          disabled={!markedItems.length ? true : false}
          type="button"
          onClick={onDeleteClick}
        >
          Delete
        </Button>
      </>

      <Table bordered size="sm">
        <thead>
          <tr>
            <th>
              <input
                id="select-all"
                type="checkbox"
                onChange={handleChangeAll}
              />
            </th>
            <th>#</th>
            <th>Name</th>
            <th>E-Mail</th>
            <th>Sign Up Date</th>
            <th>Last Visit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(
            ({ _id, name, email, signUpDate, lastVisit, isOnline }) => (
              <tr key={_id} className="render-table">
                <td className="checkboxes-list">
                  <input
                    data-id={counter - 1}
                    id={_id}
                    type="checkbox"
                    onChange={handleChange}
                  />
                </td>
                <td>{counter++}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{signUpDate}</td>
                <td>{lastVisit}</td>
                <td className={`status-${isOnline ? `online` : `offline`}`}>
                  {isOnline ? "Online" : "Offline"}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    </>
  );
}

export default UserView;
