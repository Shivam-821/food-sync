import React from "react";

const upcyclingGuidelines = [
  {
    title: "Utilize Food Scraps Efficiently",
    points: [
      "Convert food waste into high-quality compost that can be used for agricultural purposes.",
      "Develop new food products using upcycled ingredients, such as fruit peels for jams or surplus grains for energy bars.",
      "Invest in technology to extract nutrients from food waste for use in supplements or pet food.",
    ],
  },
  {
    title: "Collaborate with Producers & NGOs",
    points: [
      "Build strong partnerships with restaurants, farms, and food distributors to collect organic waste.",
      "Set up collection centers where businesses can easily drop off their food waste.",
      "Work with NGOs to repurpose any food that is still edible but not fit for retail sale.",
    ],
  },
  {
    title: "Maintain Hygiene & Safety Standards",
    points: [
      "Ensure that all upcycled food products meet health and safety regulations.",
      "Use proper sterilization and processing techniques to eliminate contamination risks.",
      "Educate suppliers about the importance of delivering clean and uncontaminated food waste.",
    ],
  },
  {
    title: "Promote Circular Economy",
    points: [
      "Raise awareness about the benefits of upcycling food waste and how it contributes to sustainability.",
      "Launch educational campaigns to encourage consumers and businesses to participate in food waste reduction.",
      "Develop innovative ways to reuse food waste in new industries, such as biodegradable packaging or biofuel production.",
    ],
  },
  {
    title: "Innovate & Scale",
    points: [
      "Invest in research to discover new methods for upcycling food waste.",
      "Expand operations by collaborating with international organizations and sustainability initiatives.",
      "Encourage startups and entrepreneurs to explore new business models based on food waste reduction.",
    ],
  },
];

const UpcyclingGuidelines = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
        Guidelines for Upcycling Industries
      </h2>

      {/* Mapping through upcyclingGuidelines */}
      {upcyclingGuidelines.map((guideline, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">{guideline.title}</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            {guideline.points.map((point, i) => (
              <li key={i} className="mt-1">{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UpcyclingGuidelines;


