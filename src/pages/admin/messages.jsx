import React, { useState } from "react";
import { FaEnvelope, FaShoppingCart } from "react-icons/fa"; // icônes react
import "./css/messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "general",
      name: "John Doe",
      email: "john@example.com",
      message: "Bonjour, je suis intéressé par vos services.",
      date: "2025-09-16",
      read: false,
    },
    {
      id: 2,
      type: "quote",
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Pouvez-vous me faire un devis pour un site e-commerce ?",
      date: "2025-09-15",
      read: true,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [search, setSearch] = useState("");

  const openModal = (msg) => {
    if (!msg.read) {
      setMessages(messages.map((m) => m.id === msg.id ? { ...m, read: true } : m));
    }
    setSelectedMessage(msg);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMessage(null);
  };

  const handleDelete = (id) => {
    setMessages(messages.filter((m) => m.id !== id));
    closeModal();
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase())
  );

  const getMessageIcon = (type) => {
    switch(type) {
      case "quote": return <FaShoppingCart className="msg-icon quote"/>;
      default: return <FaEnvelope className="msg-icon general"/>;
    }
  };

  const isRecent = (date) => {
    const msgDate = new Date(date);
    const now = new Date();
    const diffDays = (now - msgDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 2; // messages des 2 derniers jours
  };

  return (
    <div className="messages-dashboard">
      <div className="messages-header">
        <h1>📬 Messages</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher par nom ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="messages-list">
        {filteredMessages.length ? (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`message-card ${msg.read ? "read" : "unread"} ${isRecent(msg.date) ? "recent" : ""}`}
              onClick={() => openModal(msg)}
            >
              <div className="message-header">
                <h3>{msg.name}</h3>
                <span className="message-date">{msg.date}</span>
              </div>
              <div className="message-preview">
                {getMessageIcon(msg.type)}
                <span>{msg.message.slice(0, 60)}...</span>
              </div>
              {!msg.read && <span className="unread-badge"></span>}
            </div>
          ))
        ) : (
          <p className="no-messages">Aucun message trouvé.</p>
        )}
      </div>

      {modalOpen && selectedMessage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Message de {selectedMessage.name}</h2>
            <p><strong>Email :</strong> {selectedMessage.email}</p>
            <p><strong>Date :</strong> {selectedMessage.date}</p>
            <div className="modal-message">{selectedMessage.message}</div>
            <div className="modal-actions">
              <button className="delete-btn" onClick={() => handleDelete(selectedMessage.id)}>
                Supprimer
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
