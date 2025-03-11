import React from "react";
import { FaRegSquare } from "react-icons/fa";

const guidelines = [
  {
    title: "Register Your Business",
    contents: [
      "Sign up with your business credentials.",
      "Provide necessary verification documents.",
      "Get approval from the FoodSync team."
    ],
    icon: "✅"
  },
  {
    title: "Identifying Surplus Food",
    contents: [
      "Track surplus food items before they expire.",
      "Categorize food based on type and condition.",
      "Ensure that only safe-to-consume food is donated."
    ],
    icon: "🔍"
  },
  {
    title: "Listing Food for Donation",
    contents: [
      "Create detailed listings with descriptions and expiry dates.",
      "Specify pickup/drop-off locations and available time slots.",
      "Update availability in real-time to avoid confusion."
    ],
    icon: "📋"
  },
  {
    title: "Ensuring Food Safety & Quality",
    contents: [
      "Follow hygiene standards while handling food.",
      "Use proper storage and packaging before donation.",
      "Only donate food that meets food safety regulations."
    ],
    icon: "🛡️"
  },
  {
    title: "Coordinating Logistics with NGOs & Volunteers",
    contents: [
      "Plan efficient pickup schedules with NGOs.",
      "Ensure smooth handovers during food transfers.",
      "Use FoodSync's tracking system for better coordination."
    ],
    icon: "🚚"
  },
  {
    title: "Reducing Food Waste at the Source",
    contents: [
      "Analyze sales patterns to minimize surplus generation.",
      "Implement portion control strategies in restaurants.",
      "Encourage staff to reduce kitchen waste."
    ],
    icon: "🌱"
  },
  {
    title: "Engaging Employees in the Donation Process",
    contents: [
      "Encourage staff participation in food donation efforts.",
      "Educate employees on the impact of food waste.",
      "Foster a culture of sustainability within the workplace."
    ],
    icon: "🤝"
  },
  {
    title: "Tracking & Reporting Donations",
    contents: [
      "Use the dashboard to track donated food quantities.",
      "Monitor impact metrics like meals served and waste reduced.",
      "Generate reports to measure social and environmental impact."
    ],
    icon: "📊"
  },
  {
    title: "Legal & Compliance Guidelines",
    contents: [
      "Ensure compliance with local food donation laws.",
      "Follow tax benefits and incentives for surplus donation.",
      "Maintain transparency in food donation records."
    ],
    icon: "⚖️"
  },
  {
    title: "Building Partnerships with NGOs",
    contents: [
      "Establish long-term relationships with NGOs and food banks.",
      "Work together to improve donation efficiency.",
      "Collaborate on community outreach programs."
    ],
    icon: "🏢"
  },
  {
    title: "Receiving Feedback & Continuous Improvement",
    contents: [
      "Encourage NGOs and receivers to provide feedback.",
      "Improve donation processes based on feedback.",
      "Adapt donation strategies to maximize impact."
    ],
    icon: "💡"
  },
  {
    title: "Promoting Your Sustainability Efforts",
    contents: [
      "Share donation milestones on social media.",
      "Highlight your efforts in corporate sustainability reports.",
      "Encourage other businesses to join the initiative."
    ],
    icon: "📢"
  }
];


const ProducersGuidelines = () => {
  return (
    <div className="container mx-auto px-4 py-10 pt-4">
      <h2 className="text-4xl font-bold text-center text-red-700 mb-12">
           Guidelines for Producers
         </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guidelines.map((guideline, index) => (
          <GuidelineCard key={index} {...guideline} />
        ))}
      </div>
    </div>
  );
};

export default ProducersGuidelines;

const GuidelineCard = ({ title, contents, icon }) => {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200 relative m-2 hover:shadow-lg group hover:border-gray-300">
      <div className="flex items-center space-x-3 mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className="text-3xl absolute ml-80 mb-20 scale-200 group-hover:scale-210 transition-all duration-200">{icon}</span>
      </div>
      <ul className=" pl-5 text-gray-600 ">
        {contents.map((item, index) => (
          <li key={index} className="mb-1 ">
            <div className="flex items-baseline ">
              <div className="scale-115 pr-2">
                <FaRegSquare />
              </div>
              {item}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};




