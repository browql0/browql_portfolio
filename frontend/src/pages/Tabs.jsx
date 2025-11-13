import { useState, useEffect, useRef } from 'react';
import '../css/tabs.css';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import ReactIcon from '@icons/react.svg?react';
import JavascriptIcon from '@icons/js.svg?react';
import Html5Icon from '@icons/html.svg?react';
import NodeIcon from '@icons/node.svg?react';
import MongoIcon from '@icons/mongo.svg?react';
import GithubIcon from '@icons/github.svg?react';
import CssIcon from '@icons/css.svg?react';
import ExpressIcon from '@icons/express.svg?react';
import NextIcon from '@icons/next.svg?react';
import TailIcon from '@icons/tail.svg?react';
import GitIcon from '@icons/git.svg?react';
import VscIcon from '@icons/vsc.svg?react';

import { Code, Award, Layers } from 'lucide-react';

const tabs = [
  { id: 'projects', label: 'Projects', icon: <Code size={18} /> },
  { id: 'certificates', label: 'Certificates', icon: <Award size={18} /> },
  { id: 'stack', label: 'Tech Stack', icon: <Layers size={18} /> },
];

export default function TabSection() {
  const [activeTab, setActiveTab] = useState('projects');
  const [previousTab, setPreviousTab] = useState('projects');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef({});
  const nodeRef = useRef(null);

  // Calcul direction animation (slide-left ou slide-right)
  const direction =
    tabs.findIndex((tab) => tab.id === activeTab) >
    tabs.findIndex((tab) => tab.id === previousTab)
      ? 'left'
      : 'right';

  // Met à jour la position de l'indicateur (sous le bouton actif)
  const updateIndicator = () => {
    const currentRef = tabRefs.current[activeTab];
    if (currentRef) {
      const rect = currentRef.getBoundingClientRect();
      const parentRect = currentRef.parentNode.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    updateIndicator();
    // Mise à jour au resize fenêtre
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    if (tabId !== activeTab) {
      setPreviousTab(activeTab);
      setActiveTab(tabId);
    }
  };

  // Gestion clavier (flèches) sur les tabs
  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      const nextIndex = (index + 1) % tabs.length;
      setPreviousTab(activeTab);
      setActiveTab(tabs[nextIndex].id);
      tabRefs.current[tabs[nextIndex].id]?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setPreviousTab(activeTab);
      setActiveTab(tabs[prevIndex].id);
      tabRefs.current[tabs[prevIndex].id]?.focus();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsContent />;
      case 'certificates':
        return <CertificatesContent />;
      case 'stack':
        return <TechStackContent />;
      default:
        return null;
    }
  };

  return (
    <section className="tab-section">
      <div className="tab-buttons" role="tablist" aria-label="Sections">
        <div
          className="tab-indicator"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={activeTab}
          classNames={`slide-${direction}`}
          timeout={300}
          unmountOnExit
          nodeRef={nodeRef}
        >
          <div className="tab-content" ref={nodeRef} role="tabpanel" tabIndex={0} aria-labelledby={`tab-${activeTab}`}>
            {renderContent()}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </section>
  );
}

// --- Contents ---

function ProjectsContent() {
  const projects = [
    {
      title: "Portfolio V1",
      description:
        "A responsive personal website built with HTML, CSS, and JavaScript, featuring an admin dashboard for managing messages and orders.",
      image: "./img/porto.png",
      github: "https://github.com/browql0/portfolio",
      demo: "https://browql.unaux.com",
    },
    {
      title: "Streaming website",
      description:
        "A front-end streaming platform developed with HTML, CSS, and JavaScript. The site includes a modern UI for browsing movies and series, watching trailers, and exploring featured content. Optimized for desktop and mobile.",
      image: "./img/FILM.png",
      github: "https://github.com/browql0/browql_movie",
    },
    {
      title: "Fitness Website",
      description:
        "A fitness website built with HTML, CSS, and JavaScript, featuring workout plans .",
      image: "./img/GYM.png",
      github: "https://github.com/browql0/browql_gym",
    },
    {
      title: "economy Discord BOT",
      description: "A Discord bot for managing economy-related commands and features.",
      image: "./img/eco.png",
      github: "https://github.com/browql0/browql_eco_bot",
    },
    {
      title: " Discord BOT",
      description: "A Discord bot for managing server-related commands and features.",
      image: "./img/help.png",
      github: "https://github.com/browql0/browql_bot",
    },
  ];

  return (
    <div className="projects-container">
      {projects.map((project, index) => (
        <div className="project-card" key={index}>
          <div className="project-image">
            <img src={project.image} alt={project.title} />
          </div>
          <div className="project-info">
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <div className="project-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CertificatesContent() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      src: "/certificate/cert1.jpg",
      title: "Responsive Web Design",
      description: "Mastered responsive layouts using HTML and CSS – FreeCodeCamp",
    },
    {
      src: "/certificate/cert2.jpg",
      title: "Scientific Computing with Python",
      description: "Built Python skills for scientific and numerical tasks – FreeCodeCamp",
    },
    {
      src: "/certificate/cert3.jpg",
      title: "Python for Beginners",
      description: "Completed foundational training in Python programming – Mind Luster",
    },
    {
      src: "/certificate/cert4.jpg",
      title: "Video Editing (Adobe Premiere)",
      description: "Learned video editing techniques using Adobe Premiere – Mind Luster",
    },
    {
      src: "/certificate/cert5.jpg",
      title: "Cryptography Basics",
      description: "Introduction to basic cryptographic concepts and tools – Mind Luster",
    },
    {
      src: "/certificate/cert6.jpg",
      title: "Adobe Photoshop",
      description: "Learned basic photo editing and composition – Mind Luster",
    },
  ];

  return (
    <>
      <div className="certificates-container">
        {certificates.map((cert, index) => (
          <div
            className="certificate-card"
            key={index}
            onClick={() => setSelectedCert(cert)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedCert(cert);
              }
            }}
            role="button"
            aria-pressed={selectedCert === cert}
          >
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
        <div className="cert-modal-overlay" onClick={() => setSelectedCert(null)} role="dialog" aria-modal="true" aria-labelledby="cert-modal-title" tabIndex={-1}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedCert(null)} aria-label="Close modal">✖</button>
            <img src={selectedCert.src} alt={selectedCert.title} />
            <h3 id="cert-modal-title">{selectedCert.title}</h3>
            <p>{selectedCert.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

function TechStackContent() {
  return (
    <div className="stack-container">
      <div className="stack-section">
        <h3>Frontend</h3>
        <div className="stack-grid">
          <Badge label="React" Icon={ReactIcon} />
          <Badge label="JavaScript" Icon={JavascriptIcon} />
          <Badge label="HTML5" Icon={Html5Icon} />
          <Badge label="CSS3" Icon={CssIcon} />
          <Badge label="Tailwind CSS" Icon={TailIcon} />
        </div>
      </div>
      <div className="stack-divider" />
      <div className="stack-section">
        <h3>Backend</h3>
        <div className="stack-grid">
          <Badge label="Node.js" Icon={NodeIcon} />
          <Badge label="Express" Icon={ExpressIcon} />
          <Badge label="Next.js" Icon={NextIcon} />
        </div>
      </div>
      <div className="stack-divider" />
      <div className="stack-section">
        <h3>Database & Tools</h3>
        <div className="stack-grid">
          <Badge label="Visual Studio" Icon={VscIcon} />
          <Badge label="MongoDB" Icon={MongoIcon} />
          <Badge label="Git" Icon={GitIcon} />
          <Badge label="GitHub" Icon={GithubIcon} />
        </div>
      </div>
    </div>
  );
}

function Badge({ label, Icon }) {
  return (
    <div className="stack-badge">
      <Icon className="stack-icon" />
      <span>{label}</span>
    </div>
  );
}
