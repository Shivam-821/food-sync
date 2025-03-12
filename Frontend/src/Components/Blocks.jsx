"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import FilterSection from "./FilterSection";
import CartDrawer from "./CartDrawer";
import "./Blocks.css";
import { FaShoppingCart } from "react-icons/fa";
import f1 from "../assets/f1.jpg";
import f2 from "../assets/f2.jpg";
import f3 from "../assets/f3.jpg";
import f4 from "../assets/f4.jpg";
import f5 from "../assets/f5.jpeg";
import f6 from "../assets/f6.webp";

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Fresh Apples",
    price: 2.99,
    image: f1,
    quantity: "1 kg",
    offers: "Buy 1 Get 1 Free",
    type: "perishable",
    manufacturingDate: "2023-03-01",
    expiryDate: "2023-03-15",
    description:
      "Fresh and juicy apples from local farms. Rich in vitamins and fiber.",
    color: "#f87171",
  },
  {
    id: 2,
    name: "Canned Beans",
    price: 1.49,
    image: f2,
    quantity: "400g",
    offers: "20% Off",
    type: "non-perishable",
    manufacturingDate: "2023-01-10",
    expiryDate: "2024-01-10",
    description:
      "Premium quality canned beans. High in protein and ready to use.",
    color: "#b45309",
  },
  {
    id: 3,
    name: "Organic Milk",
    price: 3.99,
    image: f3,
    quantity: "1 L",
    offers: "",
    type: "perishable",
    manufacturingDate: "2023-03-05",
    expiryDate: "2023-03-12",
    description:
      "Organic whole milk from grass-fed cows. No hormones or antibiotics.",
    color: "#93c5fd",
  },
  {
    id: 4,
    name: "Rice",
    price: 5.99,
    image: f4,
    quantity: "2 kg",
    offers: "10% Off",
    type: "non-perishable",
    manufacturingDate: "2023-01-15",
    expiryDate: "2024-01-15",
    description: "Premium basmati rice. Perfect for all your rice dishes.",
    color: "#fde68a",
  },
  {
    id: 5,
    name: "Fresh Chicken",
    price: 7.99,
    image: f5,
    quantity: "500g",
    offers: "",
    type: "perishable",
    manufacturingDate: "2023-03-06",
    expiryDate: "2023-03-10",
    description: "Farm-raised chicken with no antibiotics. High in protein.",
    color: "#fdba74",
  },
  {
    id: 6,
    name: "Pasta",
    price: 1.99,
    image: f6,
    quantity: "500g",
    offers: "Buy 2 Get 1 Free",
    type: "non-perishable",
    manufacturingDate: "2023-02-01",
    expiryDate: "2024-02-01",
    description: "Italian durum wheat pasta. Perfect for all pasta recipes.",
    color: "#fef3c7",
  },
];

function Blocks() {
  const [products] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartBouncing, setIsCartBouncing] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [productType, setProductType] = useState("all");
  const [expiryDateFilter, setExpiryDateFilter] = useState("");

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Filter by price
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by type
    if (productType !== "all") {
      filtered = filtered.filter((product) => product.type === productType);
    }

    // Filter by expiry date
    if (expiryDateFilter) {
      filtered = filtered.filter(
        (product) => new Date(product.expiryDate) <= new Date(expiryDateFilter)
      );
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, productType, expiryDateFilter]);

  // Handle product selection for detailed view
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  // Close detailed view
  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  // Add to cart functionality with animation
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, cartQuantity: quantity }];
      }
    });

    // Trigger cart bounce animation
    setIsCartBouncing(true);
    setTimeout(() => setIsCartBouncing(false), 1000);
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Update cart quantity
  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  return (
    <div className="blocks-container ">
      {/* Cart button with animation */}
      <div className="cart-button-container">
        <button
          className={`btn btn-primary cart-button ${
            isCartBouncing ? "animate-bounce" : ""
          }`}
          onClick={() => setIsCartOpen(true)}
        >
          <FaShoppingCart className="cart-icon" />
          <span>
            Cart ({cartItems.reduce((acc, item) => acc + item.cartQuantity, 0)})
          </span>
        </button>
      </div>

      {/* Filters */}
      <FilterSection
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        productType={productType}
        setProductType={setProductType}
        expiryDateFilter={expiryDateFilter}
        setExpiryDateFilter={setExpiryDateFilter}
      />

      {/* Product grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onImageClick={() => handleProductSelect(product)}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>

      {/* Product detail modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleCloseDetail}
          onAddToCart={addToCart}
        />
      )}

      {/* Cart drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateCartQuantity}
      />
    </div>
  );
}

export default Blocks;
