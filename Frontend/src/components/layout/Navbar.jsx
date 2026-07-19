import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/" },
  { label: "Skincare", to: "/" },
  { label: "Makeup", to: "/" },
  { label: "About", to: "/" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="ge-navbar">
      <div className="ge-navbar-inner">
        <Link to="/" className="ge-navbar-brand" onClick={() => setIsOpen(false)}>
          Glow<span>Essence</span>
        </Link>

        <nav>
          <ul className={`ge-navbar-links ${isOpen ? "open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ge-navbar-actions">
          <button className="ge-icon-btn" aria-label="Search">
            <i className="bi bi-search"></i>
          </button>
          <Link to="/profile" className="ge-icon-btn" aria-label="Account">
            <i className="bi bi-person"></i>
          </Link>
          <button className="ge-icon-btn" aria-label="Cart">
            <i className="bi bi-bag"></i>
            <span className="ge-cart-badge">0</span>
          </button>
          <button
            className="ge-navbar-toggle"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
