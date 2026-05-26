import { useEffect } from "react";
import "./CursorTrail.css";

export default function CursorTrail() {
  useEffect(() => {
    const particles = [];

    const createParticle = (x, y) => {
      const particle = document.createElement("div");
      particle.className = "cursor-particle";
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      document.body.appendChild(particle);

      let opacity = 1;
      const fadeInterval = setInterval(() => {
        opacity -= 0.1;
        particle.style.opacity = opacity;
        if (opacity <= 0) {
          clearInterval(fadeInterval);
          particle.remove();
        }
      }, 30);

      particles.push({ element: particle, opacity });
    };

    const handleMouseMove = (e) => {
      if (Math.random() > 0.8) {
        createParticle(e.clientX, e.clientY);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}
