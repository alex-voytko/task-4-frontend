import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import userOperations from "../redux/user-redux/user-operations";
import authOperations from "../redux/auth-redux/auth-operations";
import Title from "../components/Title";
import Toolbar from "../components/Toolbar";
import UserTable from "../components/UserTable";

function UserView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [markedItems, setMarkedItems] = useState([]);
  const getItems = useSelector(state => state.users.items);
  const isLogined = useSelector(state => state.auth.loginedUser.token);
  const currentUserId = useSelector(state => state.auth.loginedUser.userId);

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
      <Title text="User List" />
      <Toolbar
        onBlockClick={onBlockClick}
        onDeleteClick={onDeleteClick}
        disabled={!markedItems.length ? true : false}
      />
      <UserTable
        handleChange={handleChange}
        handleChangeAll={handleChangeAll}
        users={users}
      />
    </>
  );
}

export default UserView;
