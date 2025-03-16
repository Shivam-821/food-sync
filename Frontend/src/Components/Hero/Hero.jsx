import { useEffect, useRef } from "react";
import "./Hero.css";
import arrow_btn from "../../assets/arrow_btn.png";
import play_icon from "../../assets/play_icon.png";
import pause_icon from "../../assets/pause_icon.png";

const Hero = ({
  heroData,
  setHeroCount,
  heroCount,
  setPlayStatus,
  playStatus,
}) => {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    // Reset animation when heroCount changes
    if (text1Ref.current) {
      text1Ref.current.classList.remove("animate-text");
      void text1Ref.current.offsetWidth; // Trigger reflow
      text1Ref.current.classList.add("animate-text");
    }

    if (text2Ref.current) {
      text2Ref.current.classList.remove("animate-text");
      void text2Ref.current.offsetWidth; // Trigger reflow
      text2Ref.current.classList.add("animate-text");
    }
  }, [heroCount]);

  return (
    <div className="hero pt-28">
      {/* <div className="hero-text">
        <div className="text-wrapper">
          <p ref={text1Ref} className="first animate-text">
            {heroData.text1}
          </p>
          <div className="text-3d-shadow"></div>
        </div>
        <p ref={text2Ref} className="second animate-text">
          {heroData.text2}
        </p>
      </div>

      <div className="hero-explore">
        <p>Explore the features</p>
        <div className="arrow-container">
          <img src={arrow_btn || "/placeholder.svg"} alt="Explore" />
        </div>
      </div>

      <div className="hero-dot-play">
        <ul className="hero-dots">
          <li
            onClick={() => setHeroCount(0)}
            className={heroCount === 0 ? "hero-dot active" : "hero-dot"}
          ></li>
          <li
            onClick={() => setHeroCount(1)}
            className={heroCount === 1 ? "hero-dot active" : "hero-dot"}
          ></li>
          <li
            onClick={() => setHeroCount(2)}
            className={heroCount === 2 ? "hero-dot active" : "hero-dot"}
          ></li>
        </ul>

        <div className="hero-play">
          <div
            className="play-button-wrapper"
            onClick={() => setPlayStatus(!playStatus)}
          >
            <img
              src={playStatus ? pause_icon : play_icon}
              alt={playStatus ? "Pause" : "Play"}
            />
            <div className="play-button-ripple"></div>
          </div>
          <p>See the video</p>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
