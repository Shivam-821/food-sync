import React from "react";
import { FaRegSquare } from "react-icons/fa";

const guidelines = [
  {
    title: "Register and Set Up Your Profile",
    contents: [
      "Sign up using your email or social media.",
      "Complete your profile with accurate details.",
      "Specify if you are a donor, receiver, or volunteer."
    ],
    icon: "📝"
  },
  {
    title: "How to Donate Food",
    contents: [
      "List surplus food items with clear descriptions.",
      "Ensure food is fresh and meets safety standards.",
      "Set pickup/drop-off locations and times."
    ],
    icon: "🍲"
  },
  {
    title: "Requesting Food Assistance",
    contents: [
      "Browse available donations in your locality.",
      "Submit requests with proper justification.",
      "Ensure timely pickup and provide feedback."
    ],
    icon: "🤝"
  },
  {
    title: "Tracking Food Donations",
    contents: [
      "Use the dashboard to track active donations.",
      "Receive real-time updates on status changes.",
      "Monitor your impact and contribution stats."
    ],
    icon: "📊"
  },
  {
    title: "Safety and Hygiene Guidelines",
    contents: [
      "Only donate food that is safe to eat.",
      "Use proper packaging to maintain freshness.",
      "Follow government regulations for food safety."
    ],
    icon: "🛡️"
  },
  {
    title: "Volunteering Opportunities",
    contents: [
      "Sign up to help in food distribution.",
      "Assist with logistics and coordination.",
      "Spread awareness about reducing food waste."
    ],
    icon: "🚀"
  },
  {
    title: "Sustainability and Food Waste Reduction",
    contents: [
      "Plan your purchases to minimize waste.",
      "Use leftovers creatively to avoid disposal.",
      "Educate others about sustainable food habits."
    ],
    icon: "🌱"
  },
  {
    title: "Review and Rating System",
    contents: [
      "Rate donors and receivers based on experience.",
      "Provide constructive feedback for improvements.",
      "Maintain a trustworthy community with transparency."
    ],
    icon: "⭐"
  },
  {
    title: "Reporting Issues and Misuse",
    contents: [
      "Report expired or unsafe food donations.",
      "Flag inappropriate behavior or misuse.",
      "Help maintain a safe and ethical platform."
    ],
    icon: "🚨"
  },
  {
    title: "Notifications and Alerts",
    contents: [
      "Get notified of new food listings nearby.",
      "Receive reminders for scheduled pickups.",
      "Stay updated on community events."
    ],
    icon: "🔔"
  },
  {
    title: "Collaborations with NGOs and Restaurants",
    contents: [
      "Partner with local NGOs for large-scale donations.",
      "Encourage restaurants to contribute surplus food.",
      "Build a strong network to reduce food wastage."
    ],
    icon: "🏢"
  },
  {
    title: "Terms of Use and Ethical Guidelines",
    contents: [
      "Follow ethical donation and receiving practices.",
      "Adhere to community rules and respect others.",
      "Ensure fair access to food resources."
    ],
    icon: "📜"
  }
];


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

const UserGuidelines = () => {
  return (
    <div className="container mx-auto px-4 py-10 pt-4">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
           Guidelines for Users/Consumers
         </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guidelines.map((guideline, index) => (
          <GuidelineCard key={index} {...guideline} />
        ))}
      </div>
    </div>
  );
};

export default UserGuidelines;