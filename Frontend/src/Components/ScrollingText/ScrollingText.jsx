import React from 'react';
import './ScrollingText.css'; // Import the CSS file for scrolling effect

const ScrollingText = () => {
  const phrases = [
    "Save food, save the planet!",
    "Think before you throw!",
    "Waste less, feed more.",
    "Love food, hate waste.",
    "Every bite counts—don’t let it go to waste!",
    "Be smart, waste apart!",
    "Eat what you take, take what you eat.",
    "Reduce food waste, nourish the future!",
    "Stop wasting, start saving!",
    "Respect food, respect nature.",
    "Plate it, don’t waste it!",
    "Leftovers are treasures, not trash!",
    "Plan smart, waste apart!",
    "Food is precious, don’t be reckless!",
    "Finish your plate, don’t let food meet its fate!",
    "Waste less, taste more!",
    "Don’t let good food go bad!",
    "Shop wise, store right, waste none!",
    "Food is for eating, not for trash!",
    "Use it up, don’t throw it out!",
  ];

  return (
    <div className="mt-6 cursor-default pt-20 mb-20 font-light  overflow-hidden whitespace-nowrap py-2">
      <div className="flex animate-scroll">
        {phrases.map((phrase, index) => (
          <div key={index} className="px-6 text-3xl text-teal-900">
            {phrase}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingText;