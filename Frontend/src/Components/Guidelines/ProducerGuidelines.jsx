import React from "react";

const producersGuidelines = [
  {
    title: "Track Food Inventory",
    points: [
      "Implement inventory management software to monitor food stock levels and prevent over-purchasing.",
      "Use predictive analytics to anticipate demand and adjust production accordingly.",
      "Reduce portion sizes where necessary to minimize food waste without compromising customer satisfaction.",
    ],
  },
  {
    title: "Offer Surplus at Discounts",
    points: [
      "Provide discounts on food that is nearing its expiry but still safe for consumption.",
      "Partner with food delivery services and apps to sell surplus food at lower prices.",
      "Promote special offers on slightly imperfect fruits, vegetables, and other perishable items.",
    ],
  },
  {
    title: "Partner with NGOs & Upcyclers",
    points: [
      "Establish regular donation schedules with local NGOs to redistribute surplus food efficiently.",
      "Work with upcycling industries to turn organic waste into compost, animal feed, or biofuel.",
      "Educate employees about the importance of food waste reduction and sustainability.",
    ],
  },
  {
    title: "Use Smart Packaging",
    points: [
      "Opt for biodegradable, compostable, or recyclable packaging to reduce environmental impact.",
      "Introduce reusable containers and incentivize customers to bring their own packaging.",
      "Clearly label expiration dates and storage instructions to help consumers reduce waste.",
    ],
  },
  {
    title: "Train Staff on Waste Management",
    points: [
      "Conduct regular training sessions for employees on food waste reduction practices.",
      "Encourage kitchen staff to repurpose food scraps creatively in new dishes.",
      "Implement a food waste tracking system to monitor and reduce daily wastage.",
    ],
  },
];

const ProducersGuidelines = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
        Guidelines for Producers (Restaurants, Hotels, Farmers, etc.)
      </h2>

      {/* Mapping through producersGuidelines */}
      {producersGuidelines.map((guideline, index) => (
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

export default ProducersGuidelines;



