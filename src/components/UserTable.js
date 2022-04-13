import { Table } from "react-bootstrap";

function UserTable({ handleChangeAll, handleChange, users }) {
  let counter = 1;
  return (
    <Table bordered size="sm">
      <thead>
        <tr>
          <th>
            <input id="select-all" type="checkbox" onChange={handleChangeAll} />
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
        {users.map(({ _id, name, email, signUpDate, lastVisit, isOnline }) => (
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
        ))}
      </tbody>
    </Table>
  );
}

export default UserTable;
