import React from "react";
import { FaRegSquare } from "react-icons/fa";

const guidelines = [
  {
    title: "Register as an Upcycling Industry",
    contents: [
      "Sign up with your company’s credentials.",
      "Provide business verification documents.",
      "Specify the type of upcycling services you offer."
    ],
    icon: "✅"
  },
  {
    title: "Identifying Suitable Surplus Food",
    contents: [
      "Analyze surplus food for upcycling potential.",
      "Ensure only non-consumable but safe food is used.",
      "Sort food into categories like compost, animal feed, or processing."
    ],
    icon: "🔍"
  },
  {
    title: "Collaborating with Food Donors",
    contents: [
      "Partner with restaurants, grocery stores, and food manufacturers.",
      "Establish pickup schedules for collecting surplus food.",
      "Maintain quality control for upcycling purposes."
    ],
    icon: "🤝"
  },
  {
    title: "Ensuring Safe Processing Practices",
    contents: [
      "Follow food safety and handling regulations.",
      "Implement hygiene standards for food transformation.",
      "Use eco-friendly methods in processing and packaging."
    ],
    icon: "🛡️"
  },
  {
    title: "Upcycling into Useful Products",
    contents: [
      "Convert surplus food into compost or biofuel.",
      "Use food waste for animal feed or fertilizers.",
      "Develop innovative food-based products (e.g., dried fruits, sauces)."
    ],
    icon: "🔄"
  },
  {
    title: "Sustainable Packaging & Distribution",
    contents: [
      "Use biodegradable or reusable packaging for upcycled products.",
      "Minimize carbon footprint in transportation.",
      "Distribute upcycled products to relevant industries or communities."
    ],
    icon: "🌍"
  },
  {
    title: "Tracking & Reporting Impact",
    contents: [
      "Monitor the amount of food waste repurposed.",
      "Generate reports on environmental impact.",
      "Showcase sustainability achievements to stakeholders."
    ],
    icon: "📊"
  },
  {
    title: "Compliance with Legal & Environmental Policies",
    contents: [
      "Follow local waste management and recycling laws.",
      "Ensure ethical sourcing and disposal methods.",
      "Maintain transparency in waste transformation processes."
    ],
    icon: "⚖️"
  },
  {
    title: "Engaging the Community",
    contents: [
      "Educate businesses on the benefits of food upcycling.",
      "Conduct workshops on sustainable waste management.",
      "Encourage local participation in upcycling programs."
    ],
    icon: "🏢"
  },
  {
    title: "Innovating for Better Sustainability",
    contents: [
      "Invest in research for better upcycling techniques.",
      "Explore AI and automation for waste sorting.",
      "Develop partnerships for large-scale sustainability projects."
    ],
    icon: "💡"
  },
  {
    title: "Receiving Feedback & Continuous Improvement",
    contents: [
      "Encourage suppliers and industries to provide feedback.",
      "Improve processes based on insights and suggestions.",
      "Adapt upcycling strategies for greater efficiency."
    ],
    icon: "📢"
  },
  {
    title: "Promoting Circular Economy Initiatives",
    contents: [
      "Contribute to a zero-waste food system.",
      "Support policies that encourage food upcycling.",
      "Collaborate with governments and NGOs for sustainable solutions."
    ],
    icon: "♻️"
  }
];


const UpcyclingGuidelines = () => {
  return (
    <div className="container mx-auto px-4 py-10 pt-4">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">
           Guidelines for Upcycling Industries
         </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guidelines.map((guideline, index) => (
          <GuidelineCard key={index} {...guideline} />
        ))}
      </div>
    </div>
  );
};

export default UpcyclingGuidelines;

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


