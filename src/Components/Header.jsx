import React, { useState } from "react";
import { Container, Navbar, Nav, Button, NavLink } from "react-bootstrap";
import LogoNav from "../assets/images/icon.png";
import ModalRegister from "./Auth/ModalRegister";
import ModalLogin from "./Auth/ModalLogin";
import "../css/header.css";
import userPhoto from "../assets/images/profile.png";
import { Dropdown } from "react-bootstrap";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Header = () => {
  const [loginShow, setLoginShow] = useState(false);
  const [registShow, setRegistShow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();

  const switchRegister = (e) => {
    e.preventDefault();
    setLoginShow(false);
    setRegistShow(true);
  };

  const switchLogin = (e) => {
    e.preventDefault();
    setRegistShow(false);
    setLoginShow(true);
  };

  const handleLogout = () => {
    console.log("ini state header", state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <>
      <Navbar className="header" variant="light" sticky="top" expand="lg">
        <Container className="d-flex">
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src={LogoNav} alt="" />
          </Navbar.Brand>
          <Nav className="d-flex">
            {state.isLogin ? (
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <img
                    src={userPhoto}
                    width={45}
                    alt="user"
                    className="rounded-pill"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu variant="light">
                  <Dropdown.Item onClick={() => navigate("/profile")}>
                    <FaRegUser className="text-black ms-2" />
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => navigate("/raisefund")}>
                    <GiReceiveMoney className="text-black ms-2" /> Raise Fund
                  </Dropdown.Item>
                  <Dropdown.Divider className="bg-light dropDivid" />
                  <Dropdown.Item href="#" onClick={handleLogout}>
                    <FaSignOutAlt className="text-black ms-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button
                  variant=""
                  className="bg-transparent me-5 fw-bold px-3 text-light"
                  onClick={() => setLoginShow(true)}
                >
                  Login
                </Button>
                <Button
                  variant="light"
                  className="bg-white me-5 fw-bold px-3 text-danger"
                  onClick={() => setRegistShow(true)}
                >
                  Register
                </Button>
              </>
            )}
            <ModalLogin
              loginShow={loginShow}
              setLoginShow={setLoginShow}
              switchRegister={switchRegister}
            />
            <ModalRegister
              registShow={registShow}
              setRegistShow={setRegistShow}
              switchLogin={switchLogin}
            />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
