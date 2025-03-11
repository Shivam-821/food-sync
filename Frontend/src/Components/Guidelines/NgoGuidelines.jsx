import React from "react";
import { FaRegSquare } from "react-icons/fa";

const guidelines = [
  {
    title: "Register and Verify Your NGO",
    contents: [
      "Sign up using official NGO credentials.",
      "Provide necessary verification documents.",
      "Get approval from the FoodSync team."
    ],
    icon: "✅"
  },
  {
    title: "Managing Large-Scale Donations",
    contents: [
      "Coordinate with food donors for bulk contributions.",
      "Ensure proper storage and transportation of food.",
      "Keep records of received and distributed food."
    ],
    icon: "📦"
  },
  {
    title: "Partnering with Restaurants & Businesses",
    contents: [
      "Connect with local restaurants and grocery stores.",
      "Encourage them to donate surplus food regularly.",
      "Establish a scheduled pickup system."
    ],
    icon: "🏢"
  },
  {
    title: "Distributing Food to the Needy",
    contents: [
      "Identify target beneficiaries and communities.",
      "Ensure fair and equal distribution practices.",
      "Monitor and document food deliveries."
    ],
    icon: "🤝"
  },
  {
    title: "Ensuring Food Safety & Quality",
    contents: [
      "Accept only fresh and consumable food donations.",
      "Train staff on safe food handling procedures.",
      "Follow government food safety regulations."
    ],
    icon: "🛡️"
  },
  {
    title: "Engaging Volunteers",
    contents: [
      "Recruit and onboard volunteers effectively.",
      "Assign clear roles for food collection and distribution.",
      "Recognize and appreciate volunteer contributions."
    ],
    icon: "🚀"
  },
  {
    title: "Tracking & Reporting Impact",
    contents: [
      "Use FoodSync’s dashboard to track donations.",
      "Generate reports on food distribution impact.",
      "Share success stories with the community."
    ],
    icon: "📊"
  },
  {
    title: "Raising Awareness About Food Waste",
    contents: [
      "Educate communities on food waste reduction.",
      "Organize events to spread awareness.",
      "Advocate for sustainable food practices."
    ],
    icon: "🌱"
  },
  {
    title: "Compliance & Legal Considerations",
    contents: [
      "Ensure compliance with local food donation laws.",
      "Maintain transparency in food distribution records.",
      "Report any legal concerns to FoodSync."
    ],
    icon: "⚖️"
  },
  {
    title: "Reporting Issues & Misconduct",
    contents: [
      "Report fraudulent food donations or misuse.",
      "Ensure ethical donation and receiving practices.",
      "Work with FoodSync to resolve community issues."
    ],
    icon: "🚨"
  },
  {
    title: "Collaborating with Other NGOs",
    contents: [
      "Join hands with other NGOs for better outreach.",
      "Share logistics and distribution responsibilities.",
      "Strengthen the food donation network."
    ],
    icon: "🤲"
  },
  {
    title: "Leveraging Technology for Better Coordination",
    contents: [
      "Use FoodSync’s digital tools for efficient tracking.",
      "Communicate with donors and volunteers seamlessly.",
      "Optimize donation routes using platform insights."
    ],
    icon: "💡"
  }
];


const NGOGuidelines = () => {
  return (
    <div className="container mx-auto px-4 py-10 pt-4">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
           Guidelines for NGOs
         </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guidelines.map((guideline, index) => (
          <GuidelineCard key={index} {...guideline} />
        ))}
      </div>
    </div>
  );
};

export default NGOGuidelines;



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


