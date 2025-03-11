import React, { useState } from "react";
import f1 from "../assets/f1.jpg";
import f2 from "../assets/f2.jpg";
import f3 from "../assets/f3.jpg";
import f4 from "../assets/f4.jpg";
import f5 from "../assets/f5.jpeg";
import f6 from "../assets/f6.webp";
import { useTranslation } from "react-i18next";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

const products = [
  {
    id: 1,
    image: f1,
    name: "Apple",
    price: 200,
    quantity: "5kg",
    type: "Perishable",
    expiryDate: "2025-05-20",
    discount: 10,
  },
  {
    id: 2,
    image: f2,
    name: "Rice",
    price: 300,
    quantity: "10kg",
    type: "Non-Perishable",
    expiryDate: "2025-05-20",
    discount: 13,
  },
  {
    id: 3,
    image: f3,
    name: "Milk",
    price: 100,
    quantity: "2L",
    type: "Perishable",
    expiryDate: "2025-05-20",
    discount: 15,
  },
  {
    id: 4,
    image: f4,
    name: "Tomato",
    price: 150,
    quantity: "4kg",
    type: "Perishable",
    expiryDate: "2025-05-20",
  },
  {
    id: 5,
    image: f5,
    name: "Wheat Flour",
    price: 250,
    quantity: "8kg",
    type: "Non-Perishable",
    expiryDate: "2025-05-20",
  },
  {
    id: 6,
    image: f6,
    name: "Potato",
    price: 180,
    quantity: "6kg",
    type: "Perishable",
    expiryDate: "2025-05-20",
  },
  {
    id: 6,
    image: f6,
    name: "Potato",
    price: 180,
    quantity: "6kg",
    type: "Perishable",
    expiryDate: "2025-05-20",
  },
  {
    id: 7,
    image: f1,
    name: "Orange",
    price: 120,
    quantity: "3kg",
    type: "Perishable",
    expiryDate: "2025-05-20",
  },
  {
    id: 8,
    image: f2,
    name: "Pulses",
    price: 220,
    quantity: "5kg",
    type: "Non-Perishable",
    expiryDate: "2025-07-15",
  },
  {
    id: 9,
    image: f3,
    name: "Cheese",
    price: 350,
    quantity: "1kg",
    type: "Perishable",
    expiryDate: "2025-05-20",
  },
  {
    id: 10,
    image: f4,
    name: "Carrot",
    price: 90,
    quantity: "2kg",
    type: "Perishable",
    expiryDate: "2025-05-20",
  },
  {
    id: 11,
    image: f5,
    name: "Sugar",
    price: 110,
    quantity: "4kg",
    type: "Non-Perishable",
    expiryDate: "2025-08-20",
  },
  {
    id: 12,
    image: f6,
    name: "Onion",
    price: 140,
    quantity: "3kg",
    type: "Perishable",
    expiryDate: "2024-04-02",
  },
];

const Blocks = ({ addToCart }) => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Handle Wishlist Toggle
  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Handle Add to Cart with Quantity Selector
  const handleAddToCart = (product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: (prevCart[product.id] || 0) + 1,
    }));
    addToCart(product);
  };

  // Filtered Products
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || product.type === filterType) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  return (
    <div>
      {/* Title */}
      <div className="text-center mt-10 text-5xl font-bold font-serif">
        {t("Food You Should Purchase")}
      </div>
      <div className="text-center mt-4 text-5xl font-bold font-serif">
        {t("Before it Wastes")}
      </div>

      {/* Search & Filters */}
      <div className="flex justify-center mt-6 space-x-4">
        <input
          type="text"
          placeholder="Search for products..."
          className="border px-4 py-2 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-lg"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All</option>
          <option value="Perishable">Perishable</option>
          <option value="Non-Perishable">Non-Perishable</option>
        </select>

        <input
          type="range"
          min="0"
          max="500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="cursor-pointer"
        />
        <span>₹{priceRange[1]}</span>
      </div>

      {/* Product Grid */}
      <div className="ml-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-sm p-4 border-2 border-gray-200 rounded-lg hover:shadow-lg transition-transform duration-500"
          >
            <img
              className="w-full h-65 object-cover rounded-lg cursor-pointer"
              src={product.image}
              alt={product.name}
              onClick={() => setSelectedProduct(product)}
            />

            <div className="mt-4">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.quantity}</p>
              <div className="flex justify-between mt-2">
                <div className="font-bold">₹{product.price}</div>
              </div>
            </div>

            {/* Discount Tag */}
            {new Date(product.expiryDate) < new Date() ? (
              <div className="text-red-600 font-bold mt-2">Expired</div>
            ) : (
              <div className="text-green-600 font-bold mt-2">
                Offer: {product.discount}% Off
              </div>
            )}

            {/* Wishlist & Add to Cart */}
            <div className="flex justify-between items-center mt-4">
              <button onClick={() => toggleWishlist(product)}>
                {wishlist.includes(product.id) ? (
                  <AiFillHeart className="text-red-500 text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-gray-500 text-2xl" />
                )}
              </button>

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                onClick={() => handleAddToCart(product)}
              >
                <FaShoppingCart className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-600">{selectedProduct.quantity}</p>
            <p className="text-sm font-semibold">
              Price: ₹{selectedProduct.price}
            </p>
            <p className="text-sm">Type: {selectedProduct.type}</p>
            <p className="text-sm">Expiry Date: {selectedProduct.expiryDate}</p>
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blocks;
