import React, { useState, useEffect, useCallback } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Mail, ExternalLink } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../css/home.css';

const WORDS = ["Frontend & Backend Developer", "Tech Enthusiast"];
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <section className="hero-container" id="Home">
              
 
      <div className="hero-content">
        <div className="hero-left" data-aos="fade-right">
          <h1 className="hero-title">
            <span>Full stack</span> <br />
            <span className="highlight">Developer</span>
          </h1>

          <p className="hero-subtitle">
            {text}
            <span className="cursor" />
          </p>

          <p className="hero-description">
            I build innovative, functional and responsive websites.
          </p>

          <div className="hero-buttons">
            <a href="#Projects" className="btn btn-primary">
              <ExternalLink size={16} /> Projects
            </a>
            <a href="#Contact" className="btn btn-secondary">
              <Mail size={16} /> Contact
            </a>
          </div>
        </div>

        <div className="hero-right" data-aos="fade-left">
          <div className="lottie-wrapper">
            <DotLottieReact
              src="https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie"
              autoplay
              loop
  style={{ width: "150%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
