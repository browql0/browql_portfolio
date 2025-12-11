import React, { useState } from "react";
import "./css/project.css";

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Portfolio Website",
      description: "Site de présentation avec sections modernes",
      image: "https://via.placeholder.com/150",
      link: "https://monportfolio.com",
    },
    {
      id: 2,
      title: "E-commerce Shop",
      description: "Boutique en ligne pour vendre vos produits",
      image: "https://via.placeholder.com/150",
      link: "https://maboutique.com",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [editProject, setEditProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // --- Gestion d'image ---
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const removeImage = () => setFormData({ ...formData, image: "" });

  const openModal = (project = null) => {
    if (project) {
      setEditProject(project);
      setFormData(project);
    } else {
      setEditProject(null);
      setFormData({ title: "", description: "", image: "", link: "" });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProject) {
      setProjects(
        projects.map((p) =>
          p.id === editProject.id ? { ...formData, id: editProject.id } : p
        )
      );
    } else {
      const newProject = { ...formData, id: Date.now() };
      setProjects([...projects, newProject]);
    }
    closeModal();
  };

  // --- Nouvelle gestion de confirmation ---
  const openConfirm = (id) => {
    setProjectToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setProjects(projects.filter((p) => p.id !== projectToDelete));
    setConfirmOpen(false);
    setProjectToDelete(null);
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setProjectToDelete(null);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-dashboard">
      <div className="projects-header">
        <h1>Gestion des Projets</h1>
        <button className="add-project-btn" onClick={() => openModal()}>
          + Ajouter un projet
        </button>
      </div>

      <input
        type="search"
        placeholder="Rechercher des projets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="projects-list">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.title} />
            <div className="project-info">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noreferrer">
                Voir le projet
              </a>
            </div>
            <div className="project-actions">
              <button className="edit-btn" onClick={() => openModal(project)}>
                Modifier
              </button>
              <button
                className="delete-btn"
                onClick={() => openConfirm(project.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Ajout/Modification */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editProject ? "Modifier le projet" : "Ajouter un projet"}</h2>
            <form onSubmit={handleSubmit}>
              {/* Zone de drop */}
              <div
                className="drop-zone"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {formData.image ? (
                  <div className="preview-wrapper">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="preview-img"
                    />
                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={removeImage}
                    >
                      ✖
                    </button>
                  </div>
                ) : (
                  <p>Glissez une image ici ou cliquez pour en choisir une</p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="file-input"
                />
              </div>

              <input
                type="text"
                name="title"
                placeholder="Titre"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="modal-textarea"
              />
              <input
                type="text"
                name="link"
                placeholder="Lien du projet"
                value={formData.link}
                onChange={handleChange}
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirmation */}
      {confirmOpen && (
        <div className="modal-overlay">
          <div className="modal confirm-modal">
            <h2>Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce projet ?</p>
            <div className="modal-actions">
              <button className="delete-btn" onClick={confirmDelete}>
                supprimer
              </button>
              <button className="cancel-btn" onClick={cancelDelete}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
