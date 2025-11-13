import React, { useState } from "react";
import Sidebar from "./sidebar";
import Projects from "./project";
import Messages from "./messages";
import Commands from "./commands";
import Overview from "./overview";
import Settings from "./settings"; // at7adi hadi an7wik settings aw9 ba3ad mnum ch9mtili kari katbdlom
import "./css/admin.css";
import axios from "axios";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");

  //  test deconnect 
  const handleLogout = async () => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        await axios.post("http://localhost:5000/logout", {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.log("Erreur logout", err);
      }
    }
    localStorage.removeItem("adminToken");
    window.location.reload();
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />

      {/*  central */}
      <div className="admin-content">
        {activeTab === "overview" && <Overview setActiveTab={setActiveTab} />}
        {activeTab === "projects" && <Projects />}
        {activeTab === "messages" && <Messages />}
        {activeTab === "commands" && <Commands />}
        {activeTab === "settings" && <Settings />} {/* 👈 nouvel onglet */}
      </div>
    </div>
  );
};

export default Admin;
