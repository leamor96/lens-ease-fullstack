import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { GiMicroscopeLens } from "react-icons/gi";
import "./Navbar.css"

const Navabar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      // Call the logout function from the AuthContext
      await logout();

      // Perform any additional actions after logout if needed
    } catch (error) {
      // Handle any errors that occur during the logout process
      console.error("Logout failed", error);
      // Show an error message to the user or handle the error gracefully
    }
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="brand">
            PRICER
            <GiMicroscopeLens className="logo" />
          </Navbar.Brand>
          <div className="spacer"></div>
          <NavLink to="/" className="nav-link text-light">
            Home
          </NavLink>
            <NavLink to="/about" className="nav-link text-light">
              About
            </NavLink>
          {!isLoggedIn && (
            <NavLink to="/register" className="nav-link text-light">
              Register
            </NavLink>
          )}
          {!isLoggedIn && (
            <NavLink to="/login" className="nav-link text-light">
              Login
            </NavLink>
          )}
          {isLoggedIn && (
            <button onClick={handleLogout} className="btn btn-warning logout">
              Logout
            </button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Navabar;
