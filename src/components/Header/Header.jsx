import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="pixel-header">
      <nav className="pixel-nav">
        <h1 className="pixel-logo">📚 BookRank</h1>
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