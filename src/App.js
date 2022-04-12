import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import HomeView from "./views/HomeView";
import SignInView from "./views/SignInView";
import SignUpView from "./views/SignUpView";
import UserView from "./views/UserView";
import ErrorView from "./views/ErrorView";
import "./styles/main.scss";

function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Container>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/sign-in" element={<SignInView />} />
          <Route path="/sign-up" element={<SignUpView />} />
          <Route path="/user" element={<UserView />} />
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
