"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./ScrollingText.css";

const ScrollingText = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);

  const phrases = [
    t("Save food save planet"),
    t("Think before throw"),
    t("Waste less feed more"),
    t("Love food hate waste"),
    t("Every bite counts"),
    t("Be smart waste apart"),
    t("Eat take"),
    t("Reduce food waste"),
    t("Stop wasting start saving"),
    t("Respect food respect nature"),
    t("plate it don't waste it"),
    t("Leftovers are treasures"),
    t("Plan smart waste apart"),
    t("Food is precious"),
    t("Finish your plate"),
    t("Waste less taste more"),
    t("Dont let good food go bad"),
    t("Shop wise store right"),
    t("Food is for eating"),
    t("Use it up dont throw it out"),
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (scrollContainerRef.current) {
        const speed = (e.clientX / window.innerWidth - 0.5) * 10;
        scrollContainerRef.current.style.animationDuration = `${60 - speed}s`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="scrolling-text-container">
      <div className="scrolling-text-wrapper">
        <div ref={scrollContainerRef} className="scrolling-text-content">
          {phrases.map((phrase, index) => (
            <div key={index} className="phrase-item">
              {phrase}
            </div>
          ))}
          {/* Duplicate phrases for seamless looping */}
          {phrases.map((phrase, index) => (
            <div key={`dup-${index}`} className="phrase-item">
              {phrase}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;
