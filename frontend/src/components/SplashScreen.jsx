import React from 'react';
import { FaGithub, FaInstagram, FaDiscord } from 'react-icons/fa';
import '../css/SplashScreen.css';
import DotGrid from './DotGrid'; // Assure-toi que ton composant DotGrid existe
import TextType from './Text';
import BlurText from './blur';
const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
export default function SplashScreen({ onClickContinue, fadeOut }) {
  return (
<div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`} onClick={onClickContinue}>
      <DotGrid />

      <div className="splash-inner">

        <BlurText
          text="Welcome to my portfolio"
          delay={100}
          animateBy="letters"
          direction="top"
          className="blur-text"
        />



        <div className="splash-icons animate-slide-left">
          <FaGithub className="icon" />
          <FaInstagram className="icon" />
          <FaDiscord className="icon" />
        </div>

        <div className="typed-box animate-slide-right">
          <TextType
            text={["www.browql.com", "www.browql.com", "Happy coding!"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            deletingSpeed={50}
            loop={true}
            cursorCharacter="_"
          />
        </div>


      </div>
    </div>

  );
}
