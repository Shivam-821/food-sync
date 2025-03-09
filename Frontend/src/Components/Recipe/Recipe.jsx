import React, { useState } from "react";
import HeroSection from "../HeroSection/HeroSection";
import Footer from "../Footer/Footer";
//import "./RecipeSection.css";

const categories = [
  "All Types",
  "Appetizers",
  "Main Courses",
  "Salads & Sides",
  "Vegetarian Delights",
  "International Flavors",
  "Desserts & Sweets",
  "Healthy Eats",
  "Quick & Easy Supper",
  "Breakfast",
  "Seafood",
  "Pasta",
];

const recipes = [
  {
    id: 1,
    title: "Fresh Salad with Tahini Sauce",
    image: "https://source.unsplash.com/400x300/?salad,food",
    category: "Healthy Eats",
    likes: 250,
  },
  {
    id: 2,
    title: "Chili con Carne with Nachos Chips",
    image: "https://source.unsplash.com/400x300/?chili,food",
    category: "Main Courses",
    likes: 150,
  },
  {
    id: 3,
    title: "Spicy Vermicelli Noodles Salad",
    image: "https://source.unsplash.com/400x300/?noodles,food",
    category: "Vegetarian Delights",
    likes: 100,
  },
  {
    id: 4,
    title: "Gnocchi Pasta with Tomato Sauce",
    image: "https://source.unsplash.com/400x300/?pasta,food",
    category: "Pasta",
    likes: 250,
  },
  {
    id: 5,
    title: "Classic Italian Beef Maltagliati",
    image: "https://source.unsplash.com/400x300/?beef,food",
    category: "Main Courses",
    likes: 180,
  },
  {
    id: 6,
    title: "Flat Noodles with Shrimp Veggie",
    image: "https://source.unsplash.com/400x300/?shrimp,food",
    category: "Seafood",
    likes: 140,
  },
  {
    id: 7,
    title: "Cauliflower Steak Chimichurri",
    image: "https://source.unsplash.com/400x300/?cauliflower,food",
    category: "Vegetarian Delights",
    likes: 200,
  },
  {
    id: 8,
    title: "Avocado Toast with Egg",
    image: "https://source.unsplash.com/400x300/?avocado,food",
    category: "Breakfast",
    likes: 300,
  },
  {
    id: 9,
    title: "Grilled Salmon with Lemon",
    image: "https://source.unsplash.com/400x300/?salmon,food",
    category: "Seafood",
    likes: 270,
  },
  {
    id: 10,
    title: "Tiramisu - Italian Dessert",
    image: "https://source.unsplash.com/400x300/?tiramisu,food",
    category: "Desserts & Sweets",
    likes: 320,
  },
  {
    id: 11,
    title: "Blueberry Pancakes",
    image: "https://source.unsplash.com/400x300/?pancakes,food",
    category: "Breakfast",
    likes: 190,
  },
  {
    id: 12,
    title: "Vegan Sushi Rolls",
    image: "https://source.unsplash.com/400x300/?sushi,food",
    category: "International Flavors",
    likes: 260,
  },
  {
    id: 13,
    title: "Mango Sticky Rice",
    image: "https://source.unsplash.com/400x300/?mango,food",
    category: "Desserts & Sweets",
    likes: 180,
  },
  {
    id: 14,
    title: "French Onion Soup",
    image: "https://source.unsplash.com/400x300/?soup,food",
    category: "Appetizers",
    likes: 230,
  },
  {
    id: 15,
    title: "Garlic Butter Lobster",
    image: "https://source.unsplash.com/400x300/?lobster,food",
    category: "Seafood",
    likes: 290,
  },
  {
    id: 16,
    title: "Margherita Pizza",
    image: "https://source.unsplash.com/400x300/?pizza,food",
    category: "International Flavors",
    likes: 400,
  },
];

const RecipeSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Types");

  const filteredRecipes =
    selectedCategory === "All Types"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory);

  return (
    <>
      <HeroSection />
      <div className="recipe-section bg-gray-100 py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          What to <span className="text-yellow-500">Cook?</span>
        </h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Recipe Cards Grid (4x4 layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.slice(0, 16).map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{recipe.title}</h3>
                <p className="text-gray-500 text-sm">{recipe.category}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-600">
                    {recipe.likes}+ Likes
                  </span>
                  <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
                    See Complete Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination (For Future Expansion) */}
        <div className="flex justify-center mt-6">
          <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            1
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg mx-2 hover:bg-gray-300">
            2
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipeSection;
