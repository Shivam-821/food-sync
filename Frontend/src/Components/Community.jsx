import React,{useState} from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import male from '../assets/male.jpg'

const Community = () => {
  return (
    <div className="flex flex-row">
      <div className="flex-grow">
        <CommunityActivity />
      </div>
      <Sidebar />
    </div>
  )
}

const CommunityActivity = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  // Filtering posts based on category
  const filteredPosts = communityPosts.filter((post) => 
    filter === "all" ? true : post.category === filter
  );

  // Sorting posts based on likes or comments
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "likes") return b.likes - a.likes;
    if (sortBy === "comments") return b.comments - a.comments;
    return 0;
  });

  return (
    <div className="flex flex-col w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Community Activity</h1>

      {/* Filter Dropdown */}
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 pr-3 border rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Awareness">Awareness</option>
          <option value="Tips">Tips</option>
          <option value="Recipes">Recipes</option>
          <option value="Sustainability">Sustainability</option>
        </select>

        {/* Sort Dropdown */}
        <select
          className="p-2  border rounded-md"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="none">Sort By</option>
          <option value="likes">Most Liked</option>
          <option value="comments">Most Commented</option>
        </select>
      </div>

      {/* Render Filtered & Sorted Posts */}
      {sortedPosts.length > 0 ? (
        sortedPosts.map((post, index) => (
          <div key={index} className="border cursor-default border-gray-300 p-4 mb-4 rounded-md shadow-md hover:shadow-2xl hover:border-gray-500 transition duration-300">
            <div className='flex items-center pb-2'>
            <img className='h-10' src={male} />
            <span className='text-lg pl-4 '>{post.sender}</span>
            <span className='text-gray-500 pl-4'>{post.timestamp}</span>
            </div>
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            <div className="flex justify-between text-sm mt-2">
              <span className='flex'><span className='flex  items-center text-lg cursor-pointer'><AiOutlineLike /></span>{post.likes} Likes</span>
              <span className='flex cursor-pointer'><span className='flex  items-center text-lg pr-1'><TfiCommentAlt /></span>{post.comments} Comments</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No posts found for the selected filter.</p>
      )}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="w-80 flex-shrink-0 p-4">
      <div className='mb-4 border-gray-300 border rounded-md shadow-md '>
      <h2 className="text-lg font-semibold rounded-md flex justify-center items-center h-13 bg-gray-100">Good to know information</h2>
      <ul className="list-none p-4">
        <li className='text-blue-500 cursor-pointer'>New Here? Start Here!</li>
        <li className='text-blue-500 cursor-pointer'>Welcome to Community</li>
        <li className='text-blue-500 cursor-pointer'>General Guidelines</li>
        <li className='text-blue-500 cursor-pointer'>FoodSync Support</li>
        <li className='text-blue-500 cursor-pointer'>Acknowledgement</li>
      </ul>
      </div>
      <div className='mb-4 border border-gray-300 rounded-md shadow-md '>
      <h2 className="text-lg font-semibold rounded-md flex justify-center items-center h-13 bg-gray-100">Leaderboard</h2>
      <ul className="list-none p-4 ">
        <li className='mb-2 flex justify-around'><div>Robin621k</div> <div className='text-right'>❤  120</div></li>
        <hr className='p-1 text-gray-300' />
        <li className='mb-2 flex justify-around'><div>meself</div> ❤ 91</li>
        <hr className='p-1 text-gray-300' />
        <li className='mb-2 flex justify-around'><div>realud</div> ❤ 81</li>
        <hr className='p-1 text-gray-300' />
        <li className='mb-2 flex justify-around'><div>Tidbitty</div>  ❤ 57</li>
        <hr className='p-1 text-gray-300' />
        <li className='mb-2 flex justify-around'><div>3Fees</div> ❤ 57</li>
      </ul>
      </div>
    </div>
  );
}

const communityPosts = [
  {
    title: "The Shocking Reality of Food Waste",
    content: "Did you know that nearly one-third of all food produced globally ends up in the trash? This is not just a waste of food, but also a waste of all the resources—water, labor, and energy—that go into producing it. Food waste contributes significantly to climate change by producing methane gas in landfills. If food waste were a country, it would be the third-largest emitter of greenhouse gases! We need urgent action to reduce this problem, starting with smarter consumption and better food distribution. Every small effort, like proper storage and mindful buying, can make a huge difference.",
    sender: "Alice Johnson",
    timestamp: "2025-03-09 10:30 AM",
    likes: 120,
    comments: 40,
    category: "Awareness",
  },
  {
    title: "Smart Storage: Keep Your Food Fresh",
    content: "Storing food properly is one of the easiest ways to prevent waste. For example, keeping bananas away from other fruits slows down ripening. Storing herbs in water keeps them fresh longer, and using airtight containers prevents dry goods from going stale. Refrigeration is crucial, but not all foods belong in the fridge! Tomatoes, onions, and potatoes last longer when stored at room temperature. By following these simple tricks, we can extend the life of our food and reduce unnecessary waste.",
    sender: "Michael Lee",
    timestamp: "2025-03-09 09:45 AM",
    likes: 85,
    comments: 30,
    category: "Tips",
  },
  {
    title: "Leftovers Reimagined: Transforming Extra Food",
    content: "Leftovers don’t have to be boring! With a little creativity, you can transform last night’s meal into something new and exciting. For example, extra rice can become delicious fried rice, stale bread can turn into croutons, and leftover roasted vegetables can be blended into a hearty soup. Reusing food creatively not only reduces waste but also saves money and time in the kitchen. Small efforts like these can significantly cut down on food waste while making mealtime more interesting.",
    sender: "Emma Carter",
    timestamp: "2025-03-08 08:15 PM",
    likes: 95,
    comments: 45,
    category: "Recipes",
  },
  {
    title: "Composting 101: Turning Waste into Gold",
    content: "Food scraps don’t belong in landfills – they belong in compost! Composting helps break down organic waste naturally, turning it into rich soil that can be used for gardening and farming. Even if you live in an apartment, there are small composting bins available that don’t produce bad odors. Eggshells, coffee grounds, fruit peels, and vegetable scraps are all great for composting. By composting, we reduce landfill waste, improve soil health, and contribute to a greener planet.",
    sender: "Daniel Smith",
    timestamp: "2025-03-08 06:30 PM",
    likes: 75,
    comments: 20,
    category: "Sustainability",
  },
  {
    title: "How Restaurants Can Reduce Food Waste",
    content: "Restaurants generate tons of food waste daily, but there are many ways they can help combat this issue. One solution is to donate excess food to local shelters or food banks instead of throwing it away. Another method is offering smaller portion sizes or allowing customers to take leftovers home. Some restaurants are even partnering with food waste apps to sell unsold meals at discounted prices. Businesses that adopt sustainable practices not only reduce waste but also attract environmentally conscious customers.",
    sender: "Sophia Patel",
    timestamp: "2025-03-07 02:00 PM",
    likes: 110,
    comments: 55,
    category: "Industry",
  },
  {
    title: "The Role of Technology in Reducing Food Waste",
    content: "Did you know that technology is helping fight food waste? AI-driven apps track expiration dates, grocery lists, and suggest recipes based on available ingredients. Smart fridges can notify users when food is about to go bad. Some companies are also using blockchain to improve supply chain efficiency and minimize losses. By integrating technology into our daily lives, we can make smarter decisions about food consumption and waste reduction.",
    sender: "Liam Garcia",
    timestamp: "2025-03-07 10:45 AM",
    likes: 65,
    comments: 25,
    category: "Technology",
  },
  {
    title: "Buy ‘Ugly’ Produce and Reduce Waste",
    content: "A significant portion of food waste comes from fruits and vegetables that don’t meet aesthetic standards. Supermarkets reject perfectly edible produce just because they’re oddly shaped or slightly discolored. Many companies and farmers are now selling ‘ugly’ produce at discounted rates to reduce waste. By embracing imperfect-looking food, we can help cut down on unnecessary food disposal while saving money on groceries.",
    sender: "Olivia Adams",
    timestamp: "2025-03-06 07:20 PM",
    likes: 80,
    comments: 35,
    category: "Awareness",
  },
  {
    title: "Food Waste and Climate Change: The Connection",
    content: "When we waste food, we’re also wasting the water, energy, and labor that went into producing it. This results in higher carbon emissions, contributing to climate change. Food waste in landfills releases methane, a greenhouse gas that’s 25 times more potent than carbon dioxide. Reducing food waste is one of the simplest ways we can lower our environmental impact and fight climate change.",
    sender: "Ethan Brown",
    timestamp: "2025-03-06 05:10 PM",
    likes: 95,
    comments: 40,
    category: "Awareness",
  },
  {
    title: "Community Fridges: A Simple Solution to Food Waste",
    content: "Community fridges are a great way to combat food waste while helping those in need. These public refrigerators allow people to donate excess food, which is then available for free to those who need it. Many communities have successfully implemented this concept, reducing both waste and hunger. If you’re interested in starting a community fridge in your area, check out organizations that support these initiatives.",
    sender: "Ava Martinez",
    timestamp: "2025-03-05 01:30 PM",
    likes: 90,
    comments: 50,
    category: "Community",
  },
  {
    title: "Bulk Buying vs. Food Waste: Finding a Balance",
    content: "Buying in bulk can save money, but it can also lead to more food waste if not managed correctly. The key is to plan your meals in advance and store bulk items properly. Dry goods like rice, pasta, and lentils can last for months if kept in airtight containers. Perishables should be portioned and frozen if not used quickly. Smart shopping habits prevent food from going bad and help reduce household waste.",
    sender: "Noah Wilson",
    timestamp: "2025-03-05 09:10 AM",
    likes: 70,
    comments: 30,
    category: "Tips",
  }
];

export default Community