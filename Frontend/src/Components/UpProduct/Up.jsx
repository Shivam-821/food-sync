"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import FilterSection from "./FilterSection";
import CartDrawer from "./CartDrawer";
import axios from "axios";
import "./Blocks.css";
import { FaShoppingCart } from "react-icons/fa";

const Up = () => {
  return (
    <div>
      <BlockList />
    </div>
  );
};

export default Up;

function BlockList() {
  const [blocks, setBlocks] = useState([]);
  const [sampleProducts, setSampleProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartBouncing, setIsCartBouncing] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 6000]); // Adjusted price range
  const [productType, setProductType] = useState("all");
  const [expiryDateFilter, setExpiryDateFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch data from the backend
  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/items/getallitem`
        );
        const data = response.data.data || [];


        // Transform fetched data to match the expected structure
        const transformedData = data.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          image: item.avatar, // Use 'avatar' from fetched data
          quantity: item.quantity,
          unit: item.unit,
          type: item.category, // Use 'category' as 'type'
          expiryDate: item.expiryDate,
          description: item.description,
          manufacturingDate: item.mfDate,
        }));

        setBlocks(transformedData);
        setSampleProducts(transformedData);
        setProducts(transformedData);
        setFilteredProducts(transformedData); // Initialize filteredProducts with fetched data
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchBlocks();
  }, []);

  // Update products when sampleProducts changes
  useEffect(() => {
    setProducts(sampleProducts);
  }, [sampleProducts]);

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

  // Log the updated filteredProducts whenever it changes
  useEffect(() => {
  }, [filteredProducts]);

  // Handle product selection for detailed view
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  // Close detailed view
  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  // Add to cart functionality
  const addToCart = async (product, quantity = 1) => {
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/cart/add-to-cart`,
        {
          itemId: product.id,
          quantity: 1,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }

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
    <div className="blocks-container">
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
