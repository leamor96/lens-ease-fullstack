import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { GiMicroscopeLens, GiSpectacleLenses } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import "./Navbar.css"


const Navabar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate= useNavigate()
  const handleLogout = async () => {
    try {
      // Call the logout function from the AuthContext
      await logout();
      navigate(`/`)
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
            LensEase
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
            <NavLink to="/lenses" className="nav-link text-light">
              <GiSpectacleLenses className="lensesIcon" />
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink to="/favorites" className="nav-link text-light">
              <MdFavorite className="favIcon" />
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
