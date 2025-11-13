// components/settings.jsx
import React from "react";

const Settings = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Paramètres</h2>
      <p>Gérez vos paramètres administrateur ici.</p>
      <button
        style={{
          marginTop: "1rem",
          padding: "10px 15px",
          borderRadius: "8px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Changer le mot de passe
      </button>
    </div>
  );
};

export default Settings;
