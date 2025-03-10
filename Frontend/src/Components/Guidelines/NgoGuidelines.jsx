import React from "react";

const ngosGuidelines = [
  {
    title: "Ensure Food Safety",
    points: [
      "Accept only hygienic, properly stored, and freshly prepared food for distribution.",
      "Set guidelines for acceptable food donations, ensuring they meet safety and nutritional standards.",
      "Train volunteers and workers on proper food handling, storage, and transportation.",
    ],
  },
  {
    title: "Efficient Distribution",
    points: [
      "Create an efficient collection and distribution system to minimize food spoilage.",
      "Use real-time tracking and coordination through FoodSync to optimize deliveries.",
      "Prioritize high-need areas and establish fixed distribution points.",
    ],
  },
  {
    title: "Verify Recipients",
    points: [
      "Ensure that donated food reaches those who genuinely need it by maintaining a transparent recipient database.",
      "Partner with local shelters, orphanages, and community centers for efficient food distribution.",
      "Avoid wastage by distributing food to multiple locations if one area already has sufficient supply.",
    ],
  },
  {
    title: "Collaborate with Upcycling Industries",
    points: [
      "Identify food waste that is no longer fit for consumption but can be repurposed for composting, biofuels, or other upcycling solutions.",
      "Build partnerships with industries that specialize in converting food waste into useful products.",
      "Establish a proper channel for disposing of non-edible waste in an eco-friendly manner.",
    ],
  },
  {
    title: "Report & Feedback",
    points: [
      "Keep track of all food donations, distributions, and impact metrics to measure the success of the program.",
      "Share reports with donors and businesses to encourage continued participation.",
      "Collect feedback from beneficiaries to improve the quality and efficiency of food distribution.",
    ],
  },
];

const NGOGuidelines = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        Guidelines for NGOs
      </h2>

      {/* Mapping through ngosGuidelines */}
      {ngosGuidelines.map((guideline, index) => (
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

export default NGOGuidelines;


