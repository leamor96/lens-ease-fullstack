import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { GiMicroscopeLens, GiSpectacleLenses } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import "./Navbar.css";

const Navabar = () => {
  const { isLoggedIn, logout, username } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/`);
    } catch (error) {
      console.error("Logout failed", error);
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
            <NavDropdown
              title={username}
              id="user-dropdown"
              className="nav-link text-light"
            >
              <NavDropdown.Item
                onClick={handleLogout}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
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
        </Container>
      </Navbar>
    </>
  );
};

export default Navabar;
