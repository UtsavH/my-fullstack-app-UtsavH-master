import React, { useState, useEffect } from 'react';
import authService from '../services/authService'; // Import authService

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // This function will check the login status when the component mounts
  const checkLoginStatus = () => {
    if (authService.isSignedIn()) {
      const email = sessionStorage.getItem('userEmail');
      console.log('Email from sessionStorage:', email); // Log email to verify it's correct
      if (email) {
        setUserEmail(email);
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status initially

    // Optionally, listen to session storage changes (you can use custom events for this if needed)
    window.addEventListener('storage', checkLoginStatus);

    // Clean up event listener on unmount
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const handleLogout = () => {
    authService.signOut((success) => {
      if (success) {
        setIsLoggedIn(false);
        setUserEmail('');
        sessionStorage.removeItem('userEmail'); // Remove email from sessionStorage
        console.log('Logged out successfully');
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a href="/#" className="navbar-brand d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            aria-hidden="true"
            className="mr-2"
            viewBox="0 0 24 24"
            focusable="false"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          <strong>My Fullstack App</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample07"
          aria-controls="navbarsExample07"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">Welcome, {userEmail}</span>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#" onClick={handleLogout}>
                    Sign Out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/signin">
                    Sign In
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;