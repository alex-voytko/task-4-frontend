import { Button } from "react-bootstrap";

function UserBar({ onLogOut, user }) {
  return (
    <div className="user-bar-container d-flex justify-content-end">
      <h4>Hello, {user}</h4>
      <Button onClick={onLogOut} type="button" className="ml-4 logout-btn">
        Log Out
      </Button>
    </div>
  );
}

export default UserBar;
