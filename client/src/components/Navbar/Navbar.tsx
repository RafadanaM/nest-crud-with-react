import React from "react";
import classes from "./Navbar.module.css";
import Logo from "../../assets/icon.svg";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  let location = useLocation();

  const renderItem = () => {
    return currentUser ? (
      <>
        <li className={classes.navbarItem}>
          <Link to="/profile" className={classes.navbarLinks}>
            <span className={classes.linkText}>Profile</span>
          </Link>
        </li>
        <li
          className={`${classes.navbarItem} ${classes.navbarLinks}`}
          onClick={() => logout()}
        >
          <span className={classes.linkText}>Logout</span>
        </li>
      </>
    ) : (
      <>
        <li className={classes.navbarItem}>
          <Link to="/" className={classes.navbarLinks}>
            <span className={classes.linkText}>Register</span>
          </Link>
        </li>
        <li className={classes.navbarItem}>
          <Link
            to={{ pathname: "/login", state: { from: location.pathname } }}
            className={classes.navbarLinks}
          >
            <span className={classes.linkText}>Login</span>
          </Link>
        </li>
      </>
    );
  };
  return (
    <nav className={classes.navbar}>
      <ul className={classes.navbarNav}>
        <li
          className={`${classes.navbarItem} ${classes.navbarLinks} `}
          onClick={() => (window.location.href = "/")}
        >
          <img src={Logo} alt="Logo" />
        </li>

        {renderItem()}
      </ul>
    </nav>
  );
};

export default Navbar;
