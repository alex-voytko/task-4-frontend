import { Form, Button } from "react-bootstrap";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authOperations from "../redux/auth-redux/auth-operations";
import userOperations from "../redux/user-redux/user-operations";
import Spinner from "../components/Loader";

function SignInView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const isLogined = useSelector(state => state.auth.loginedUser.token);
  const loading = useSelector(state => state.users.loading);
  const redirect = useSelector(state => state.users.redirect);

  const onChangeHandler = useCallback(e =>
    setData({ ...data, [e.target.name]: e.target.value }),
  );

  const onSubmitHandler = useCallback(e => {
    e.preventDefault();
    dispatch(authOperations.signIn(data));
    setData({ email: "", password: "" });
  });

  useEffect(() => {
    if (isLogined) {
      dispatch(userOperations.fetchUsers());
    }
  }, [isLogined]);

  useEffect(() => {
    if (redirect) navigate("/user");
  }, [redirect]);

  if (loading) {
    return <Spinner size="100" />;
  }

  return (
    <>
      <h2 className="mb-4">Sign In, please</h2>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={onChangeHandler}
            name="email"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-4">
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
export default SignInView;
