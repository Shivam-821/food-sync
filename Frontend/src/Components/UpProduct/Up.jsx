"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import FilterSection from "./FilterSection";
import CartDrawer from "./CartDrawer";
import axios from "axios";
import "./Blocks.css";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
  const [data, setData] = useState({});

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 6000]); // Adjusted price range
  const [productType, setProductType] = useState("all");
  const [expiryDateFilter, setExpiryDateFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Fetch data from the backend
  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/upcyclingItem/get-upcycled-items`
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

        // Apply filters immediately after fetching data
        let filtered = [...transformedData];

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
            (product) =>
              new Date(product.expiryDate) <= new Date(expiryDateFilter)
          );
        }

        setFilteredProducts(filtered); // Set filteredProducts after filtering
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchBlocks();
  }, [priceRange, productType, expiryDateFilter]); // Add filter dependencies

  // Handle product selection for detailed view
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  // Close detailed view
  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const addToCart = async (product, quantity = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if(!token){
        navigate('/login')
        console.error("No token found");
        return;
      }

      // Add item to cart in the backend
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/cart/addtocart`,
        {
          params: {
            itemId: product.id,
            quantity: quantity,
            price: product.price,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Item added to cart successfully!");

      // Fetch updated cart data from the backend
      const cartResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/cart/getcart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setData(cartResponse.data.data);
      setCartItems(cartResponse.data.data.items || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }

    // Trigger cart bounce animation
    setIsCartBouncing(true);
    setTimeout(() => setIsCartBouncing(false), 1000);
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      // Remove item from cart in the backend
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/cart/removeitem`,
        {
          params: {
            itemId: productId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Item removed from cart successfully!");

      // Fetch updated cart data from the backend
      const cartResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/cart/getcart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setData(cartResponse.data.data);
      setCartItems(cartResponse.data.data.items || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove from cart");
    } finally {
      setLoading(false);
    }
  };

  // Update cart quantity
  const updateCartQuantity = async (productId, quantity, action) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
  
      // Update item quantity in the backend
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/cart/addtocart`,
        {
          params: {
            itemId: productId,
            quantity: quantity,
            price: data.totalAmount,
            addOne: action === "add" ? "add" : undefined, // Add one if action is "add"
            deleteOne: action === "delete" ? "delete" : undefined, // Delete one if action is "delete"
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      toast.success("Cart quantity updated successfully!");
  
      // Fetch updated cart data from the backend
      const cartResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/cart/getcart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setData(cartResponse.data.data);
      setCartItems(cartResponse.data.data.items || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cart quantity");
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart data
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/cart/getcart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        // Use optional chaining and default values
        const cartData = response.data.data || { items: [] };
        setData(cartData);
        setCartItems(cartData.items || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchCart();
  }, []);

  return (
    <div className="blocks-container">
      {/* Toast Container */}
      <ToastContainer
        position="top-center" // Set position to top-center
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Cart button with animation */}
      <div className="cart-button-container">
        <button
          className={`btn btn-primary cart-button ${
            isCartBouncing ? "animate-bounce" : ""
          }`}
          onClick={() => setIsCartOpen(true)}
        >
          <FaShoppingCart className="cart-icon" />
          <span>Cart {cartItems.length}</span>
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
        updateQuantity={updateCartQuantity} // Pass the updateCartQuantity function
        data={data}
      />
    </div>
  );
}
