import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/Logo/logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="pixel-header">
      <nav className="pixel-nav">
        <h1 className="pixel-logo">
          <img src={Logo} alt="Logo" className="logo-img" />
          <span>BookRank</span>
        </h1>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#5b3e2b" className="bi bi-list" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </div>

        <ul className={`pixel-nav-links ${menuOpen ? 'open' : ''}`}>
  <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
  <li><Link to="/library" onClick={() => setMenuOpen(false)}>Library</Link></li>
  <li><Link to="/favorites" onClick={() => setMenuOpen(false)}>My Favorites</Link></li>
  <li><Link to="/top-rated" onClick={() => setMenuOpen(false)}>Top Rated</Link></li> {/* <-- NUEVO LINK */}
  <li><Link to="/add" onClick={() => setMenuOpen(false)}>Add a Book</Link></li>
  <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
</ul>
      </nav>
    </header>
  );
}