import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import pour redirection
import { Shield } from "lucide-react";
import AdminLoginModal from "./AdminLoginModal";
import "../css/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate(); // ✅ Hook de navigation

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={`main-header ${menuOpen ? "blurred" : ""}`}>
      <div className="header-inner">
        {/* LOGO */}
        <div className="header-logo-box">
          <span className="header-logo-text">BROWQL</span>
        </div>

        {/* NAV */}
        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="header-actions">
          <button
            className="admin-icon-btn"
            onClick={() => setShowAdminModal(true)}
            aria-label="Connexion Admin"
          >
            <Shield size={22} />
            {isAdmin && <span className="admin-badge"></span>}
          </button>
        </div>

        {/* BURGER MENU */}
        <button
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
      </div>

      {/* OVERLAY */}
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}

      {/* MODAL ADMIN */}
      <AdminLoginModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSuccess={() => {
          setIsAdmin(true); // ✅ Active le badge
          setShowAdminModal(false); // ✅ Ferme le modal
          console.log("✅ Admin connecté !");
          navigate("/admin"); // ✅ Redirection automatique
        }}
      />
    </header>
  );
};

export default Header;
