const guidelinesData = [
    {
      title: "Be Mindful of Food Waste",
      points: [
        "Plan your meals in advance to avoid buying excess groceries.",
        "Store food properly by using airtight containers and keeping perishable items refrigerated.",
        'Use a "first in, first out" approach to consume older food items before newer ones.',
        "Learn creative recipes to repurpose leftovers instead of discarding them.",
      ],
    },
    {
      title: "Donate Excess Food",
      points: [
        "If you have surplus food from parties, functions, or daily meals, consider donating it through FoodSync.",
        "Ensure that the food is still fresh, properly packed, and hygienic before donating.",
        "Coordinate with NGOs through the platform for efficient food collection and distribution.",
      ],
    },
    {
      title: "Segregate Waste Properly",
      points: [
        "Separate edible food waste (which can be donated) from non-edible waste (which can be composted or sent to upcycling industries).",
        "Use color-coded bins to differentiate between recyclable waste, organic waste, and general trash.",
        "Reduce packaging waste by opting for reusable or biodegradable materials.",
      ],
    },
    {
      title: "Support Sustainable Brands",
      points: [
        "Choose restaurants, grocery stores, and brands that actively participate in food waste reduction programs.",
        "Support businesses that use sustainable packaging and food donation initiatives.",
        "Spread awareness about sustainable businesses and encourage others to adopt responsible consumption habits.",
      ],
    },
    {
      title: "Spread Awareness",
      points: [
        "Educate friends and family about the impact of food waste on the environment and global hunger.",
        "Participate in community-driven programs and initiatives that focus on food redistribution and sustainability.",
        "Share success stories and food-saving tips on social media to inspire others.",
      ],
    },
  ];
  
export default function UserGuidelines () {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Guidelines for Users/Consumers
        </h2>
  
        {/* Mapping through guidelinesData */}
        {guidelinesData.map((guideline, index) => (
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
