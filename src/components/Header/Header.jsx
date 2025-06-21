import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/Logo/logo.png';

export default function Header() {
  return (
    <header className="pixel-header">
      <nav className="pixel-nav">
        <h1 className="pixel-logo">
  <img src={Logo} alt="Logo" className="logo-img" />
  <span>BookRank</span>
</h1>
        <ul className="pixel-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/library">Library</Link></li>
          <li><Link to="/favorites">My Favorites</Link></li>
          <li><Link to="/add">Add a Book</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}