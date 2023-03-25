import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
  InputGroup,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { ThemeContext } from "../../App.js";
import logo from "../../assets/imgs/friendly-pc-logo.png";
import { dictionary } from "../../language/language.js";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  //Btn Toggle
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Tiếng Việt", value: "1" },
    { name: "English", value: "2" },
  ];

  //Theme dark mode
  const crrThemeContext = useContext(ThemeContext);

  useEffect(() => {
    const crrTheme = localStorage.getItem("theme");
    if (crrTheme) {
      crrThemeContext.setThemeValue(crrTheme);
    } else {
      localStorage.setItem("theme", crrThemeContext.themeValue);
    }
  }, []);

  const handleDarkMode = (e) => {
    crrThemeContext.setThemeValue(
      crrThemeContext.themeValue === "light" ? "dark" : "light"
    );
  };
  const handleLanguage = (e) => {
    setRadioValue(e.currentTarget.value);
    crrThemeContext.setLanguage(
      crrThemeContext.language === "VI" ? "EN" : "VI"
    );
  };

  const state = useSelector((state) => state.handleCart);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="navbar navbarC d-flex flex-column shadow-lg border-bottom border-dark-subtle"
    >
      <Container className="container">
        <Navbar.Brand className="navbar-brand">
          <NavLink to="/home">
            <img
              src={logo}
              alt="Logo Brand"
              className="logo py-0"
              style={{ width: "7rem" }}
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="items-left d-flex align-content-center">
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-warning" : "outline-danger"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  // onChange={(e) => setRadioValue(e.currentTarget.value)}
                  onChange={handleLanguage}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <Form className="ms-2">
              <Form.Check
                type="switch"
                id="custom-switch"
                label={dictionary[crrThemeContext.language]["H_Mode"]}
                onChange={handleDarkMode}
              />
            </Form>
          </div>
          <div className="items-right">
            <Nav className="me-auto">
              <Nav.Link href="/contact" className="text-light">
                {dictionary[crrThemeContext.language]["H_Location"]}
              </Nav.Link>
              <NavDropdown
                title={dictionary[crrThemeContext.language]["H_Supports"]}
                id="collasible-nav-dropdown"
                className="support-item"
              >
                <NavDropdown.Item href="#action/3.1">
                  {dictionary[crrThemeContext.language]["H_Sps_1"]}
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  {dictionary[crrThemeContext.language]["H_Sps_2"]}
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  {dictionary[crrThemeContext.language]["H_Sps_3"]}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  {dictionary[crrThemeContext.language]["H_Sps_4"]}
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                className="text-light"
                title={dictionary[crrThemeContext.language]["H_Promotions"]}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  {dictionary[crrThemeContext.language]["H_Prs_1"]}
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  {dictionary[crrThemeContext.language]["H_Prs_2"]}
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  {dictionary[crrThemeContext.language]["H_Prs_3"]}
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                className="text-light ab"
                title={dictionary[crrThemeContext.language]["H_Account"]}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item>
                  <NavLink to="/login">
                    {dictionary[crrThemeContext.language]["H_Acc_1"]}
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="/register">
                    {dictionary[crrThemeContext.language]["H_Acc_2"]}
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
      <div className=" bottomItems mt-4 d-flex w-100 justify-content-center ">
        <InputGroup className="mb-3 w-50">
          <Form.Control
            placeholder={dictionary[crrThemeContext.language]["H_Search"]}
            aria-label="enterSearch"
            aria-describedby="basic-addon2"
            autoFocus
          />
          <Button variant="outline-secondary" id="button-addon2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </Button>
        </InputGroup>
        <NavLink to="/cart">
          <Button
            className="btn-cart w-15  ms-3 ms-lg-5"
            variant="warning"
            size="sm"
          >
            <i className="fa fa-shopping-cart me-1 cart-icon ">
              <span className="cart-num">{state.length}</span>
            </i>
          </Button>{" "}
        </NavLink>
      </div>
    </Navbar>
  );
};

export default Header;
