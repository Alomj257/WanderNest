// Navbar.js

import React from 'react';
import './Navbar.css';
import { Dropdown } from 'react-bootstrap';

const Navbar = () => {

  const user = JSON.parse(localStorage.getItem('currentUser'));

  const changeLanguage = (language) => {
    console.log(`Language changed to ${language}`);
  };

  function logout(){
    localStorage.removeItem('currentUser');
    window.location.href='/login';
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={process.env.PUBLIC_URL + '/WanderNest.png'}
          alt="WanderNest Logo"
          className="logo"
        />
        <span className="brand-name">WanderNest</span>
      </div>
      <div className="navbar-right">
        {user ? (<><Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {user.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="#" onClick={logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </>) : (
          <>
            <a href="/register" className="nav-link register-button">
              Register
            </a>
            <a href="/login" className="nav-link login-button">
              Login
            </a>
            {/* <div className="language-switcher">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                className="language-dropdown"
              >
                <option value="en">ENG</option>
                <option value="hi">हिन्दी</option>
                <option value="be">বাংলা</option>
              </select>
            </div> */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
