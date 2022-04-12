import { Form, Button } from "react-bootstrap";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authOperations from "../redux/auth-redux/auth-operations";

function SignUpView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", name: "", password: "" });

  const onChangeHandler = useCallback(e =>
    setData({ ...data, [e.target.name]: e.target.value }),
  );
  const onSubmitHandler = useCallback(e => {
    e.preventDefault();
    dispatch(
      authOperations.signUp({
        isBlocked: false,
        isOnline: false,
        ...data,
      }),
    );
    setData({ email: "", name: "", password: "" });
    alert("Successfully registered!");
    return navigate("/sign-in");
  });
  return (
    <>
      <h2 className="mb-4">Sign Up, Please</h2>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={onChangeHandler}
            type="name"
            name="name"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={onChangeHandler}
            name="email"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={onChangeHandler}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
export default SignUpView;
