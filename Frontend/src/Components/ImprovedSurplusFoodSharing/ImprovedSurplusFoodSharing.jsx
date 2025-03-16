"use client";

import { useEffect, useState, useRef } from "react";
import "./ImprovedSurplusFoodSharing.css";

const ImprovedSurplusFoodSharing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeGoal, setActiveGoal] = useState(null);
  const statsRef = useRef(null);
  const goalsRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      // Check if stats section is visible
      if (statsRef.current) {
        const statsRect = statsRef.current.getBoundingClientRect();
        if (statsRect.top < window.innerHeight * 0.8 && statsRect.bottom > 0) {
          statsRef.current.classList.add("animate");
        }
      }

      // Check if goals section is visible
      if (goalsRef.current) {
        const goalsRect = goalsRef.current.getBoundingClientRect();
        if (goalsRect.top < window.innerHeight * 0.8 && goalsRect.bottom > 0) {
          // Activate all goals at once to prevent blinking
          setActiveGoal(6);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on load
    setTimeout(() => handleScroll(), 500);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const statsData = [
    {
      icon: "🍽️",
      text: "With 10.04% of world's total food production, India is the second largest food producer after China.",
      color: "#e67e22",
    },
    {
      icon: "👥",
      text: "Inspite of this, India has 196 million under-nourished people, second highest in the world.",
      color: "#27ae60",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      text: "25% of hungry people worldwide live in India.",
      color: "#f1c40f",
    },
    {
      icon: "👶",
      text: "Children under the age of 5 are under-weight and about 33% of them stunted.",
      color: "#3498db",
    },
    {
      icon: "📊",
      text: "With a score of 31.1, in Global Hunger Index, India suffers from a level of hunger that is serious",
      color: "#2ecc71",
    },
    {
      icon: "🗑️",
      text: "FoodSync aims to reduce food waste and provide nutritious food to those in need.",
      color: "#e74c3c",
    },
    {
      icon: "🌱",
      text: "Sustainable farming practices can reduce food waste at the production level by up to 30%.",
      color: "#9b59b6",
    },
    {
      icon: "🏫",
      text: "Educational programs on food waste reduction can change consumer behavior significantly.",
      color: "#16a085",
    },
    {
      icon: "🔄",
      text: "Circular economy approaches can transform food waste into valuable resources and new products.",
      color: "#2c3e50",
    },
  ];

  const goalsData = [
    {
      number: 1,
      title: "REDUCE",
      subtitle: "THE AMOUNT OF FOOD WASTE GENERATED",
      description:
        "An estimated 25-40% of food grown, processed and transported in the U.S. will never be consumed.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%20104907-f6BGPhC1t6DI2A1UZmuiwQVLG2idTv.png",
      color: "#c0392b",
    },
    {
      number: 2,
      title: "DONATE",
      subtitle: "MORE SAFE, NUTRITIOUS FOOD TO PEOPLE IN NEED",
      description:
        "Some generated food waste is safe to eat, and can be donated to food banks and anti-hunger organizations, providing nutrition to those in need.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%20104907-f6BGPhC1t6DI2A1UZmuiwQVLG2idTv.png",
      color: "#7f8c8d",
    },
    {
      number: 3,
      title: "RECYCLE",
      subtitle: "UNAVOIDABLE FOOD WASTE, DIVERTING IT FROM LANDFILLS",
      description:
        "For food waste, a landfill is the end of the line; but when composted, it can be recycled into soil or energy.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%20104907-f6BGPhC1t6DI2A1UZmuiwQVLG2idTv.png",
      color: "#2980b9",
    },
    {
      number: 4,
      title: "EDUCATE",
      subtitle: "COMMUNITIES ABOUT FOOD WASTE IMPACT",
      description:
        "Raising awareness about the environmental and social impacts of food waste can drive behavioral change at individual and community levels.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%20104907-f6BGPhC1t6DI2A1UZmuiwQVLG2idTv.png",
      color: "#8e44ad",
    },
    {
      number: 5,
      title: "INNOVATE",
      subtitle: "TECHNOLOGIES FOR FOOD PRESERVATION",
      description:
        "Developing and implementing new technologies can extend food shelf life and reduce waste throughout the supply chain.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%20104907-f6BGPhC1t6DI2A1UZmuiwQVLG2idTv.png",
      color: "#16a085",
    },
    {
      number: 6,
      title: "COLLABORATE",
      subtitle: "ACROSS SECTORS TO MAXIMIZE IMPACT",
      description:
        "Partnerships between businesses, governments, and non-profits can create systemic solutions to address food waste at scale.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%20104907-f6BGPhC1t6DI2A1UZmuiwQVLG2idTv.png",
      color: "#d35400",
    },
  ];

  return (
    <div className="improved-surplus-food-container">
      {/* Header Section */}
      <div className={`improved-header-section ${isVisible ? "fade-in" : ""}`}>
        <h1 className="improved-main-title">SURPLUS FOOD SHARING</h1>
        <h2 className="improved-subtitle">
          Coalition of Partners To Prevent Food Waste And Food Loss
        </h2>
      </div>

      {/* Stats Circles Section */}
      <div className="improved-stats-circles-wrapper">
        <div ref={statsRef} className="improved-stats-circles-container">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="improved-stat-circle"
              style={{
                backgroundColor: stat.color,
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <div className="improved-stat-icon">{stat.icon}</div>
              <p className="improved-stat-text">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className={`improved-info-box ${isVisible ? "slide-up" : ""}`}>
        <p>
          India's primary issue is lack of cold chains and adequate storage
          facilities leading to a large amount of loss along the supply chain.
          This, coupled with rising incomes and lack of awareness on the issue
          of food waste, plays an important role in India's contribution to
          environmental degradation today.
        </p>
        <p>
          Not only do we need to put surplus food back into the food chain but
          we also need to secure food for future generations at a low
          environmental cost.
        </p>
      </div>

      {/* Goals Section */}
      <div ref={goalsRef} className="improved-goals-container">
        {goalsData.map((goal) => (
          <div
            key={goal.number}
            className={`improved-goal-card ${
              activeGoal >= goal.number ? "active" : ""
            }`}
          >
            <div className="improved-goal-image-container">
              <img
                src={
                  goal.number === 1
                    ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%20104907-f6BGPhC1t6DI2A1UZmuiwQVLG2idTv.png"
                    : goal.number === 2
                    ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%20104907-f6BGPhC1t6DI2A1UZmuiwQVLG2idTv.png"
                    : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%20104907-f6BGPhC1t6DI2A1UZmuiwQVLG2idTv.png"
                }
                alt={`Goal ${goal.number}`}
                className="improved-goal-image"
              />
            </div>
            <h3 className="improved-goal-number" style={{ color: goal.color }}>
              Goal #{goal.number}
            </h3>
            <div className="improved-goal-dots">•••••••••</div>
            <h4 className="improved-goal-title">
              <span style={{ color: goal.color }}>{goal.title}</span>{" "}
              {goal.subtitle}
            </h4>
            <p className="improved-goal-description">{goal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImprovedSurplusFoodSharing;
