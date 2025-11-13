import React, { useEffect, useState } from 'react';
import '../css/CustomCursor.css'; // ou un fichier css spécifique si tu préfères

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mouseEnter = () => setIsHovering(true);
    const mouseLeave = () => setIsHovering(false);

    // Ajouter events hover sur tous les éléments interactifs
    const hoverElements = document.querySelectorAll("a, button, .btn");

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", mouseEnter);
      el.addEventListener("mouseleave", mouseLeave);
    });

    window.addEventListener("mousemove", move);
    return () => {
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", mouseEnter);
        el.removeEventListener("mouseleave", mouseLeave);
      });
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? "cursor-hover" : ""}`}
      style={{ left: position.x, top: position.y }}
    />
  );
};

export default CustomCursor;