import React from "react";
import "./css/admin.css";
import { LayoutDashboard, FolderKanban, Mail, ShoppingCart, Settings, LogOut } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin</h2>

      <button
        className={activeTab === "overview" ? "active" : ""}
        onClick={() => setActiveTab("overview")}
      >
        <LayoutDashboard size={18} />
        <span style={{ marginLeft: "8px" }}>Overview</span>
      </button>

      <button
        className={activeTab === "projects" ? "active" : ""}
        onClick={() => setActiveTab("projects")}
      >
        <FolderKanban size={18} />
        <span>Projects</span>
      </button>

      <button
        className={activeTab === "messages" ? "active" : ""}
        onClick={() => setActiveTab("messages")}
      >
        <Mail size={18} />
        <span>Messages</span>
      </button>

      <button
        className={activeTab === "commands" ? "active" : ""}
        onClick={() => setActiveTab("commands")}
      >
        <ShoppingCart size={18} />
        <span>Commandes</span>
      </button>

      <button
        className={activeTab === "settings" ? "active" : ""}
        onClick={() => setActiveTab("settings")}
      >
        <Settings size={18} />
        <span>Paramètres</span>
      </button>

      {/* Bouton Déconnexion */}
      <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid #ddd" }}>
        <button onClick={onLogout} className="logout-btn">
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
