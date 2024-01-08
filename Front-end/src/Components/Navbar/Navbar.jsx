import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

const NavBar = (props) => {
    const darkMode = () =>{
        props.setDark(!props.dark);
    }
    let navigate = useNavigate()
    const handleLogout = () =>{
      localStorage.removeItem("token");
      navigate('/login')
    }
return (
  <Navbar
    expand="lg"
    className={`bg-body-${props.dark ? "dark" : "light"} text-light`}
    bg={`${props.dark ? "dark" : "light"}`}
    data-bs-theme={`${props.dark ? "dark" : "light"}`}
  >
    <Container>
      <Navbar.Brand href="/">INotebook</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
        </Nav>
        <Form inline="true">
          <Row className="align-items-center">
            <Col
              xs="auto"
              className={`bg-${props.dark ? "dark" : "light"} text-${
                props.dark ? "light" : "dark"
              } px-4 rounded`}
            >
              <div
                className={`bg-${props.dark ? "dark" : "light"} text-${
                  props.dark ? "light" : "dark"
                } p-2 `}
              >
                {props.dark ? "Light Mode" : "Dark Mode"}
              </div>
            </Col>
            <Col xs='auto'>
              <Form.Check
                type="switch"
                id="switch"
                // label={`${
                //   props.dark ? "Switch to Light Mode" : "Switch to Dark Mode"
                // }`}
                // custom="true"
                className={`bg-${props.dark ? "dark" : "light"} text-${
                  props.dark ? "light" : "dark"
                } p-2 rounded`}
                checked={props.dark}
                onChange={darkMode}
                style={{ color: props.dark ? "white" : "black" }}
              />
            </Col>
            {!localStorage.getItem("token") ? (
              <>
                <Col xs="auto">
                  <Link to="/login">
                    <Button variant="primary">Login</Button>
                  </Link>
                </Col>
                <Col xs="auto">
                  <Link to="/signup">
                    <Button variant="outline-primary">Signup</Button>
                  </Link>
                </Col>
              </>
            ) : (
              <Col>
                <Link to="/login">
                  <Button variant="primary" onClick={handleLogout}>
                    Logout
                  </Button>
                </Link>
              </Col>
            )}
          </Row>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
};

export default NavBar;
