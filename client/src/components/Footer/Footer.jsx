import React from 'react';
import './Footer.css';
import githubLink from '../../assets/githubLogo/githubLogo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://github.com/Daniel01101000"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={githubLink}
          alt="GitHub logo"
          className="github-logo"
        />
      </a>
    </footer>
  );
}