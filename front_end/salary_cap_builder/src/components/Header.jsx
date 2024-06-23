import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from 'react-bootstrap/Button'
import { useOutletContext, useNavigate } from "react-router-dom";
import { api } from "../utilities";

function Header() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate()

  const logOut = async() => {
    let response = await api.post("users/logout/")
    if (response.status === 204){
      localStorage.removeItem("token")
      delete api.defaults.headers.common["Authorization"]
      setUser(null)
    }
    navigate('/')
  }

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary fixed-top"
    >
      <Container>
        <Navbar.Brand href="/">
          {user ? `Hello ${user}` : "Salary Cap Manager"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {user ? (
              <Nav.Link href="/dashboard/">Manager Dashboard</Nav.Link>
            ) : null}
            {user ? null : <Nav.Link href="/registration/">Sign Up</Nav.Link>}
            {user ? null : <Nav.Link href="/login/">Log In</Nav.Link>}
            {user ? <Button variant="danger" onClick={logOut}>Log Out</Button> : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
