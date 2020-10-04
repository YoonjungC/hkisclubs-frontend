import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { ADMIN_URL } from "../constants/api";

// const Header = ({ auth }) => (
  // auth.user.role
// )

const Header = ({ auth, logout }) => (
  <div id="header">
    <a href="/">
      <img id="hkislogo" src={require("../media/hkissdltlogo.png")} alt="top" width="300px;" />
    </a>
    <div className="links">
        <Link to="/">
            <p id="link-button">Home</p>
        </Link> 
        <Link to="/clubs">
            <p id="link-button">Clubs</p>
        </Link> 
        <Link to="/faq">
            <p id="link-button">FAQ</p>
        </Link>  
        {
          auth.user.role && auth.user.role !== 'user'
            ? <a href={ADMIN_URL}><p id="emulate-link">Admin</p></a>
            : null
        }
        {
          !auth.loggedIn
            ? (
              <Link to="/login">
                <p id="link-button">Login</p>
              </Link> 
            )
            : (
                <p id="emulate-link" onClick={logout}>Logout</p>
            )
        }
    </div>
  </div>
)

export default Header;