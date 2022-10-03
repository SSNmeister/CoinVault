import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-box">
      <div className="Navbar">
        <div className="icon-box">
          <Link className="navBar-links" id="navBar-links-icon" to="/">
            Coin<span className="span1">Vault</span>
          </Link>
        </div>
        <div className="link-box">
          <Link className="navBar-links" to="/favourites">
            Favourites
          </Link>
          <Link className="navBar-links" to="/about">
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
