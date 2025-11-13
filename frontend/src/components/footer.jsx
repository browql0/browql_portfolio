import React from "react";
import { FaGithub, FaDiscord, FaInstagram } from "react-icons/fa";
import "../css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-brand">
          <div className="header-logo-box">
          <span className="header-logo-text">BROWQL</span>
        </div>
          
          <p>© {new Date().getFullYear()} Tous droits réservés.</p>
        </div>

        <div className="footer-socials">
          <a
            href="https://github.com/browql0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://discord.com/browql"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
          >
            <FaDiscord />
          </a>
          <a
            href="https://instagram.com/browql"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}