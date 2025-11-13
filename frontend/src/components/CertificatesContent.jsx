import { useState } from 'react';
import '../css/tabs.css'; // ou un fichier css spécifique si tu préfères

function CertificatesContent() {
  const certificates = [
    {
      src: "/certificate/cert1.jpg",
      title: "Responsive Web Design",
      description: "Mastered responsive layouts using HTML and CSS – FreeCodeCamp"
    },
    {
      src: "/certificate/cert2.jpg",
      title: "Scientific Computing with Python",
      description: "Built Python skills for scientific and numerical tasks – FreeCodeCamp"
    },
    {
      src: "/certificate/cert3.jpg",
      title: "Python for Beginners",
      description: "Completed foundational training in Python programming – Mind Luster"
    },
    {
      src: "/certificate/cert4.jpg",
      title: "Video Editing (Adobe Premiere)",
      description: "Learned video editing techniques using Adobe Premiere – Mind Luster"
    },
    {
      src: "/certificate/cert5.jpg",
      title: "Cryptography Basics",
      description: "Introduction to basic cryptographic concepts and tools – Mind Luster"
    },
    {
      src: "/certificate/cert6.jpg",
      title: "Adobe Photoshop",
      description: "Learned basic photo editing and composition – Mind Luster"
    }
  ];

  const [selectedCert, setSelectedCert] = useState(null);

  const openModal = (cert) => setSelectedCert(cert);
  const closeModal = () => setSelectedCert(null);

  return (
    <>
      <div className="certificates-container">
        {certificates.map((cert, index) => (
          <div className="certificate-card" key={index} onClick={() => openModal(cert)}>
            <div className="certificate-image">
              <img src={cert.src} alt={cert.title} />
            </div>
            <div className="certificate-info">
              <h4>{cert.title}</h4>
              <p>{cert.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedCert && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <img src={selectedCert.src} alt={selectedCert.title} className="modal-image" />
            <h4>{selectedCert.title}</h4>
            <p>{selectedCert.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
