
import "./css/commands.css";
import React, { useState, useMemo } from "react";


const ORDERS_PER_PAGE = 6; // Pagination

const Commands = () => {
  const [orders, setOrders] = useState([
    { id: 1, clientName: "Ali Beginet", email: "ali@example.com", service: "Portfolio", status: "En cours", date: "2025-09-15", amount: 250 },
    { id: 2, clientName: "Sarah Doe", email: "sarah@example.com", service: "E-commerce", status: "Terminé", date: "2025-09-10", amount: 450 },
    { id: 3, clientName: "John Smith", email: "john@example.com", service: "Blog", status: "Annulé", date: "2025-09-12", amount: 150 },
    // ... ajouter d'autres commandes pour tester la pagination
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [sortField, setSortField] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter(o => o.id !== id));
    closeModal();
  };

  const handleStatusChange = (status) => {
    setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status } : o));
    closeModal();
  };

  // Filtre + recherche
  const filteredOrders = useMemo(() => {
    return orders.filter(o => 
      (o.clientName.toLowerCase().includes(search.toLowerCase()) ||
       o.email.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus === "Tous" || o.status === filterStatus)
    ).sort((a, b) => {
      if (sortField === "date") return new Date(b.date) - new Date(a.date);
      if (sortField === "amount") return b.amount - a.amount;
      return 0;
    });
  }, [orders, search, filterStatus, sortField]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  return (
    <div className="orders-dashboard">
      <div className="orders-header">
        <h1>📦 Commandes</h1>
        <div className="controls">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          />
          <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
            <option>Tous</option>
            <option>En cours</option>
            <option>Terminé</option>
            <option>Annulé</option>
          </select>
          <select value={sortField} onChange={e => setSortField(e.target.value)}>
            <option value="date">Trier par date</option>
            <option value="amount">Trier par montant</option>
          </select>
        </div>
      </div>

      <div className="orders-list">
        {paginatedOrders.length ? paginatedOrders.map(order => (
          <div key={order.id} className={`order-card status-${order.status.replace(" ", "-")}`} onClick={() => openModal(order)}>
            <h3>{order.clientName}</h3>
            <p>{order.service}</p>
            <p>{order.date} - ${order.amount}</p>
            <span className="order-status">{order.status}</span>
          </div>
        )) : (
          <p className="no-orders">Aucune commande trouvée.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-btn ${currentPage === i+1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i+1)}
            >
              {i+1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Commande de {selectedOrder.clientName}</h2>
            <p><strong>Email :</strong> {selectedOrder.email}</p>
            <p><strong>Service :</strong> {selectedOrder.service}</p>
            <p><strong>Date :</strong> {selectedOrder.date}</p>
            <p><strong>Montant :</strong> ${selectedOrder.amount}</p>
            <p><strong>Statut :</strong> {selectedOrder.status}</p>

            <div className="modal-actions">
              <button className="delete-btn" onClick={() => handleDelete(selectedOrder.id)}>Supprimer</button>
              <select onChange={e => handleStatusChange(e.target.value)} value={selectedOrder.status}>
                <option>En cours</option>
                <option>Terminé</option>
                <option>Annulé</option>
              </select>
              <button className="cancel-btn" onClick={closeModal}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Commands;
