import React, { useState } from "react";
import { User, Lock, Timer, X } from "lucide-react";

import "../css/AdminLoginModal.css";

const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [duration, setDuration] = useState("1h");
  const [errorShake, setErrorShake] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // MOCK LOGIN for frontend only
    console.log("Mock login success (backend removed)");
    localStorage.setItem("adminToken", "mock-token-" + Date.now());
    onSuccess();
  };

  return (
    <div className="admin-modal-overlay">
      <div className={`admin-modal-card ${errorShake ? "shake" : ""}`}>
        <button className="admin-modal-close" onClick={onClose}>
          <X size={22} />
        </button>

        <h2 className="admin-modal-title">🔐 Espace Administrateur</h2>
        <p className="admin-modal-subtitle">
          Connectez-vous pour accéder au tableau de bord.
        </p>

        <form onSubmit={handleSubmit} className="admin-modal-form">
          {/* Champ utilisateur */}
          <div className="admin-input-group">
            <User size={18} className="admin-input-icon" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              required
            />
          </div>

          {/* Champ mot de passe */}
          <div className="admin-input-group">
            <Lock size={18} className="admin-input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
          </div>

          {/* Sélection durée */}
          <div className="admin-input-group">
            <Timer size={18} className="admin-input-icon" />
            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="30m">30 minutes</option>
              <option value="1h">1 heure</option>
              <option value="3h">3 heures</option>
            </select>
          </div>

          <button type="submit" className="admin-modal-submit">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
