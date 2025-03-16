import React from "react";
import blog1 from "../../assets/blog1.jpeg";
import blog2 from "../../assets/blog2.jpeg";
import blog3 from "../../assets/blog3.jpeg";
import blog4 from "../../assets/blog4.jpeg";
import blog5 from "../../assets/blog5.jpeg";
import blog6 from "../../assets/blog6.jpeg";
import blog7 from "../../assets/blog7.jpeg";
import blog8 from "../../assets/blog8.jpeg";
import blog9 from "../../assets/blog9.jpeg";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Understanding the Impact of Food Waste on the Environment",
      image: blog1,
      excerpt:
        "Explore how food waste contributes to environmental issues such as greenhouse gas emissions, deforestation, and water wastage.",
      link: "https://pubs.rsc.org/en/content/articlelanding/2024/fb/d3fb00141e",
      linkText:
        "Food waste: environmental impact and possible solutions - Sustainable Food Technology (RSC Publishing)",
    },
    {
      id: 2,
      title: "Simple Ways Households Can Reduce Food Waste",
      image: blog2,
      excerpt:
        "Discover practical tips for households to minimize food waste, including proper storage, meal planning, and creative use of leftovers.",
      link: "https://www.rsc.org/",
      linkText: "I spent a day only eating food waste. It didn't go well",
    },
    {
      id: 3,
      title: "How Restaurants and Cafés Can Minimize Food Waste",
      image: blog3,
      excerpt:
        "Learn strategies for the food service industry to reduce waste through portion control, inventory management, and donation programs.",
      link: "https://www.rsc.org/",
      linkText: "Opinion: Greenwich generators take bite out of food waste",
    },
    {
      id: 4,
      title: " The Role of Technology in Food Waste Management",
      image: blog4,
      excerpt:
        "Examine how technological innovations like AI, blockchain, and mobile apps are being utilized to track, redistribute, and minimize food waste.",
      link: "https://foodchemistryjournal.com/2020/10/16/the-utilization-of-food-waste-challenges-and-opportunities/",
      linkText:
        "The Utilization of Food Waste: Challenges and Opportunities - Journal of Food Chemistry & Nanotechnology",
    },
    {
      id: 5,
      title: " How Supermarkets Can Help in Reducing Food Waste",
      image: blog5,
      excerpt: `Understand the role of supermarkets in reducing food waste through initiatives like selling "ugly" produce, offering discounted food bins, and improving labeling.`,
      link: "https://www.rsc.org/",
      linkText:
        "I haven't done a food shop in 4 years, I just eat out of the bin - it's saved me £16k & I even serve it to my friends",
    },
    {
      id: 6,
      title: "The Importance of Food Donation and Redistribution",
      image: blog6,
      excerpt:
        "Highlight the significance of food donation and redistribution in combating hunger and reducing waste, along with ways individuals and businesses can contribute.",
      link: "https://foodchemistryjournal.com/2020/10/16/the-utilization-of-food-waste-challenges-and-opportunities/",
      linkText:
        "The Utilization of Food Waste: Challenges and Opportunities - Journal of Food Chemistry & Nanotechnology",
    },
    {
      id: 7,
      title: "Composting 101: Turning Food Waste into Black Gold",
      image: blog7,
      excerpt:
        "Provide a comprehensive guide on composting, including methods, benefits, and how to get started at home or in urban settings.",
      link: "https://www.rsc.org/",
      linkText:
        "Compostable Cups Are Great, but the US Has No Place to Compost Them",
    },
    {
      id: 8,
      title: "Creative Recipes to Use Up Leftover Food",
      image: blog8,
      excerpt:
        "Offer inventive recipes and ideas to transform leftovers and food scraps into delicious meals, reducing household food waste.",
      link: "https://www.rsc.org/",
      linkText: "I spent a day only eating food waste. It didn't go well",
    },
    {
      id: 9,
      title: "Government Policies and Initiatives for Food Waste Reduction",
      image: blog9,
      excerpt:
        "Explore various government policies and initiatives aimed at reducing food waste, including case studies from different countries.",
      link: "https://www.rsc.org/",
      linkText: "Opinion: Greenwich generators take bite out of food waste",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {posts.map((post) => (
          <div className="bg-white m-3 shadow-md rounded-lg p-4 border-2 border-gray-200  hover:shadow-lg hover:border-gray-400 hover:transition-transform hover:duration-500">
            <img
              src={post.image}
              className="w-full h-60 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
            <p className="mt-2 font-light font-stretch-semi-condensed">
              {post.excerpt}
            </p>
            <a href={post.link}className="mt-4 inline-block font-semibold">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
