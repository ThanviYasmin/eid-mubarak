// Home.js
import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Loading from './loading'; // Import the Loading component

// Import other assets and components...
import nightOverlay from '../assets/images/nightOverlay.8d73d967be2b8afb26bf.png';
import EGA_Logo from '../assets/images/EGA_Logo_Night.a4a935c9fcf0f2de8375.png';
import jugImage from '../assets/images/preparationJug.1698288d79715908e659.png';
import coffeeImage from '../assets/images/33-layer.dacfa914a6d951891f89.png';
import eidMubarakImage from '../assets/images/preparationEnTxtNight.cd6ca912ad87279915ef.png';
import shiningStarImage from '../assets/images/shine01.7705d396efb447290480.png'; 
import shiningStarImage2 from '../assets/images/img15.e41f4ff76c63962447c9.png';
import celebrationImage2 from '../assets/images/flag.e8c36325290517b3d84b.png';
import celebrationImage1 from '../assets/images/flag1.a91fb9aca7cfb61a6585.png';
import morningAudio from '../assets/images/1-morning-with-birds.e3ab105037e40d750f38.mp3';
import celebrationsAudio from '../assets/images/2-people-soud.8e561848ed63943bdf01.mp3';
import takbeerAudio from '../assets/images/3-Takbeerat.3c32a70d52fd1feb49bf.mp3'; // Replace with actual path
import lampImage from '../assets/images/lamp.png';
import waveImage from '../assets/images/wave1.png';
import kiteImage from '../assets/images/kite.png';
import pinkBalloon from '../assets/images/OudPinkBallon.9f7218c3f16278c75f72.png';
import greenBalloon from '../assets/images/OudGreenBallon.3dbb0b434850613a8628.png';
import akbarImage from '../assets/images/TakbeerENDark.cf5fc5b1d3d056560a3b.png';
import redWave from '../assets/images/rideElement04.836127a4e9d1e9c63fa9.png';

const Home = () => {
  const [isArabic, setIsArabic] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentAudio, setCurrentAudio] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const audioRef = useRef(null);
  const sectionRefs = useRef([]);
  const textBoxRef = useRef(null);
  const textBox2Ref = useRef(null);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Change to desired loading time

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#ffffff" : "#8958c7";
    document.body.style.color = isDarkMode ? "#000000" : "#000000";
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          const target = entry.target;

          if (isVisible) {
            if (target === sectionRefs.current[0]) {
              if (currentAudio !== morningAudio) {
                setCurrentAudio(morningAudio);
              }
            } else if (target === textBoxRef.current) {
              if (currentAudio !== celebrationsAudio) {
                setCurrentAudio(celebrationsAudio);
              }
            } else if (target === textBox2Ref.current) {
              if (currentAudio !== takbeerAudio) {
                setCurrentAudio(takbeerAudio);
              }
            }
          } else {
            // Stop the audio if the corresponding section is no longer visible
            if (target === sectionRefs.current[0] && currentAudio === morningAudio) {
              setCurrentAudio('');
            } else if (target === textBoxRef.current && currentAudio === celebrationsAudio) {
              setCurrentAudio('');
            } else if (target === textBox2Ref.current && currentAudio === takbeerAudio) {
              setCurrentAudio('');
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    if (textBoxRef.current) observer.observe(textBoxRef.current);
    if (textBox2Ref.current) observer.observe(textBox2Ref.current);

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      if (textBoxRef.current) observer.unobserve(textBoxRef.current);
      if (textBox2Ref.current) observer.unobserve(textBox2Ref.current);
    };
  }, [currentAudio]);

  useEffect(() => {
    if (isAudioOn && audioRef.current) {
      if (currentAudio) {
        if (audioRef.current.src !== currentAudio) {
          audioRef.current.pause();
          audioRef.current.src = currentAudio;
          audioRef.current.load();
          audioRef.current.play().catch(error => {
            console.error('Audio play failed:', error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentAudio, isAudioOn]);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const jugTransform = `translate(${scrollPosition * -0.5}px, ${scrollPosition * -0.2}px)`;
  const cupTransform = `translate(${scrollPosition * 0.5}px, ${scrollPosition * 0.2}px)`;
  const eidMubarakTransform = `scale(${1 + scrollPosition * 0.0001})`;
  const shiningStarTransform = `translateY(${scrollPosition * -0.5}px)`;
  const celebrationImage1Transform = `translateY(${scrollPosition * 0.1}px)`;
  const celebrationImage2Transform = `translateY(${scrollPosition * -0.3}px)`;
  const waveTransform = `translateX(${Math.min(scrollPosition * 0.6, 950)}px) rotate(-10deg)`;
  const kiteTransform = `translateY(${Math.sin(scrollPosition / 100) * 20}px)`;
  const akbarImageTransform = `translateY(${scrollPosition * -0.2}px)`;

  const shiningStarStyle = {
    transform: `scale(${1 + (0.2 * Math.sin(Date.now() / 200))})`,
    transition: 'transform 0.2s ease-in-out',
  };

  return (
    <>
      {loading && <Loading />}
      
      <audio ref={audioRef} loop={isAudioOn} />

      <div className="navbar-container">
        <img src={nightOverlay} alt="Background" className="navbar-background" />
        <div className="navbar-content">
          <div className="switch-container">
            <label className="switch">
              <input type="checkbox" onChange={toggleLanguage} />
              <span className="slider"></span>
            </label>
            <span>{isArabic ? "Arabic" : "English"}</span>

            <label className="switch">
              <input type="checkbox" onChange={toggleAudio} checked={isAudioOn} />
              <span className="slider"></span>
            </label>
            <span>{isAudioOn ? "Audio On" : "Audio Off"}</span>
          </div>

          <img src={EGA_Logo} alt="Logo" className="logo" />

          <div className="switch-container">
            <label className="switch">
              <input type="checkbox" onChange={toggleTheme} />
              <span className="slider"></span>
            </label>
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </div>
        </div>
      </div>

      <div className="eid-mubarak-container" ref={(el) => (sectionRefs.current[0] = el)} data-section="eid">
        <img
          src={eidMubarakImage}
          alt="Eid Mubarak"
          className="eid-mubarak"
          style={{ transform: eidMubarakTransform }}
        />
        
        <img
          src={shiningStarImage}
          alt="Shining Star"
          className="shining-star"
          style={shiningStarStyle}
        />

        <div className="jug-cup-container">
          <img
            src={jugImage}
            alt="Jug"
            className="jug"
            style={{ transform: jugTransform }}
          />
          <div className="cup-coffee">
            <img
              src={coffeeImage}
              alt="Coffee Cup"
              className="cup"
              style={{ transform: cupTransform }}
            />
          </div>
        </div>
      </div>

      <div className="celebration-container" ref={(el) => (sectionRefs.current[1] = el)} data-section="celebration">
        <img
          src={celebrationImage1}
          alt="Celebration Image 1"
          className="celebration-image"
          style={{ transform: celebrationImage1Transform }}
        />
        <img
          src={celebrationImage2}
          alt="Celebration Image 2"
          className="celebration-image"
          style={{ transform: celebrationImage2Transform }}
        />

        <div className="second-content">
          <div className="side-images">
              <img src={lampImage} alt="Lamp" className="lamp-image" />
              <img src={waveImage} alt="Wave" className="wave-image" style={{ transform: waveTransform }} />
          </div>

          <div className="text-box" ref={textBoxRef}>
            <div className="shining-star2">
              <img src={shiningStarImage2} alt="Shining Star" className="shining-star-kite" style={shiningStarStyle} />
            </div>
            <p>
              After a whole year of patiently, but <br />
              eagerly waiting, Eid is finally here!<br />
              Hands up everyone who missed the <br />
              incense smells, the outfits and the<br />
              delicious food? But first, let's get<br />
              Eid ready with our outfits.
            </p>
            <button className="submit-button">Eid Identity</button>
          </div>

          <div className="side-images">
            <img src={kiteImage} alt="Kite" className="kite-image" style={{ transform: kiteTransform }} />
          </div>
        </div>
        <img src={pinkBalloon} alt="Pink Balloon" className="pink-balloon" />
        <img src={shiningStarImage2} alt="Shining Star" className="shining-star-kite" style={shiningStarStyle} />
        <div className="akbar-container">
          <img src={akbarImage} alt="Akbar" className="akbar-image" style={{ transform: akbarImageTransform }} />
        </div>
        <div className="text-box2" ref={textBox2Ref} data-section="text-box2">
            <p>
              After a whole year of patiently, but <br />
              eagerly waiting, Eid is finally here!<br />
              Hands up everyone who missed the <br />
              incense smells, the outfits and the<br />
              delicious food? But first, let's get<br />
              Eid ready with our outfits.
            </p>
        </div>
        <img src={greenBalloon} alt="Green Balloon" className="green-balloon" style={{ transform: kiteTransform }} />
        <div className="button-group">
          <button className="submit-button">Eid Identity</button>
          <button className="submit-button">Eid Identity</button>
          <button className="submit-button">Eid Identity</button>
          <button className="submit-button">Eid Identity</button>
        </div>
        <img src={redWave} alt="Red Wave" className="red-wave-image" style={{ transform: waveTransform }} />
      </div>
    </>
  );
};

export default Home;
