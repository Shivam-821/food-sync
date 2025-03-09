import React, { useState } from "react";
import HeroSection from "../HeroSection/HeroSection";
import Footer from "../Footer/Footer";

const categories = [
  "All Types",
  "Main Courses",
  "Salads & Sides",
  "Vegetarian Delights",
  "International",
  "Desserts & Sweets",
  "Healthy Eats",
  "Quick & Easy",
  "Breakfast",
  "Snacks",
  "Pasta",
];

const recipes = [
  {
    id: 1,
    title: "Rice with Vegetables",
    image:
      "https://veenaazmanov.com/wp-content/uploads/2018/06/One-Pot-Vegetable-Rice-2.jpg",
    category: "Healthy Eats",
    likes: 250,
    url: "https://www.bunsinmyoven.com/rice-with-vegetables/",
  },
  {
    id: 2,
    title: "From left over Food",
    image:
      "https://www.eatsmartproducts.com/cdn/shop/articles/cleanplate.jpg?v=1633260734&width=2048",
    category: "Main Courses",
    likes: 150,
    url: "https://www.tarladalal.com/article-left-over-recipes-for-the-indian-kitchen-46",
  },
  {
    id: 3,
    title: "Spicy Noodles Salad",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ryeOidcFFYSQEMqRgBrGFLmMc7BgkSyjKA&s",
    category: "Vegetarian Delights",
    likes: 100,
    url: "https://www.food.com/recipe/asian-noodle-salad-39439",
  },
  {
    id: 4,
    title: "Pasta",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSldYnrUyen9irxOrvBlEVm7TpdU6kbjhyZAQ&s",
    category: "Pasta",
    likes: 250,
    url: "https://www.indianhealthyrecipes.com/masala-pasta/",
  },
  {
    id: 5,
    title: "Spicy Chili with Beans",
    image:
      "https://www.tastesoflizzyt.com/wp-content/uploads/2024/08/sweet-spicy-chili-1200-3.jpg",
    category: "Main Courses",
    likes: 180,
    url: "https://www.allrecipes.com/recipe/223390/spicy-slow-cooked-chili/",
  },
  {
    id: 6,
    title: "Flat Noodles",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzEFEi4ZDSm8i-XjDFyg_1dcOqJOKi_KAoGQ&s",
    category: "Seafood",
    likes: 140,
  },
  {
    id: 7,
    title: "Cauliflower Meal",
    image:
      "https://chocolatecoveredkatie.com/wp-content/uploads/2020/05/Baked-Sesame-Cauliflower-Plant-Based-Dinner-Recipe.jpg",
    category: "Vegetarian Delights",
    likes: 200,
  },
  {
    id: 8,
    title: "Egg",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGziKsv6kr54qx4UMBzrV5UQOEyRE8ZgiJPg&s",
    category: "Breakfast",
    likes: 300,
  },
  {
    id: 9,
    title: "Grilled Salmon with Lemon",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtqXNHKTM2-xR4H1lEz4ijNbyNAOKlKPMEQg&s",
    category: "Seafood",
    likes: 270,
  },
  {
    id: 10,
    title: "Kheer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgLss255oTBYWS4wQf-LdkQ8xuwIgosnGXrA&s",
    category: "Desserts & Sweets",
    likes: 320,
  },
  {
    id: 11,
    title: "Pancakes",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFcGOfa4R2Qy7ezxDwc1geT29WF_0DvY8lVQ&s",
    category: "Breakfast",
    likes: 190,
  },
  {
    id: 12,
    title: "Vegan Rolls",
    image:
      "https://sixhungryfeet.com/wp-content/uploads/2023/03/Crispy-Vegan-Spring-Rolls-4-500x500.jpg",
    category: "International Flavors",
    likes: 260,
  },
  {
    id: 13,
    title: "juices",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq8LgNlZZkub0xHEFBi4I6cNi01G-qkm1ZdQ&s",
    category: "Desserts & Sweets",
    likes: 180,
  },
  {
    id: 14,
    title: "Onion Soup",
    image:
      "https://kristineskitchenblog.com/wp-content/uploads/2021/05/french-onion-soup-1200-square-122.jpg",
    category: "Appetizers",
    likes: 230,
  },
  {
    id: 15,
    title: "Garlic Butter Lobster",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxZcONLsXCdQwFSS1dqAjuODZgJoEq4BwaTw&s",
    category: "Seafood",
    likes: 290,
  },
  {
    id: 16,
    title: "Pizza",
    image:
      "https://www.allrecipes.com/thmb/aefJMDXKqs42oAP71dQuYf_-Qdc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6776_Pizza-Dough_ddmfs_4x3_1724-fd91f26e0bd6400a9e89c6866336532b.jpg",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredRecipes.slice(0, 16).map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{recipe.title}</h3>
                <p className="text-gray-500 text-sm">{recipe.category}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-600">
                    {recipe.likes}+ Likes
                  </span>
                  <a href={recipe.url}>
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
                      See Complete Recipe
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

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
