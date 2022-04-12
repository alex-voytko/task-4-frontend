import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserBar from "./UserBar";
import authOperations from "../redux/auth-redux/auth-operations";

function AppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getName = useSelector(state => state.auth.loginedUser.user);
  const isLogined = useSelector(state => state.auth.loginedUser.token);
  const userId = useSelector(state => state.auth.loginedUser.userId);

  const onLogOutHandler = () => {
    dispatch(authOperations.logOut({ _id: userId, isOnline: false }));
    try {
      navigate("/");
    } catch (error) {}
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navigation-container">
            {isLogined && (
              <Nav.Link className="mr-3" href="/user">
                View users
              </Nav.Link>
            )}
            {!isLogined && (
              <>
                <Nav.Link href="/sign-in">Sign In</Nav.Link>
                <Nav.Link href="/sign-up">Sign Up</Nav.Link>
              </>
            )}
            {isLogined && <UserBar onLogOut={onLogOutHandler} user={getName} />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppBar;
