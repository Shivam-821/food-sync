import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pay.css";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaRecycle,
} from "react-icons/fa";
import Maps from "../Maps";

export function Pay() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [amount, setAmount] = useState("0");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState();

  const getLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            type: "Point",
            coordinates: [position.coords.longitude, position.coords.latitude],
          });
          setLocationError("");
          setIsLoading(false);
        },
        (error) => {
          setLocationError(
            "Unable to retrieve your location. Please enable location services."
          );
          setIsLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  };

  // Fetch total amount from backend
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchAmount = async () => {
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
        setAmount(response.data.data.totalAmount);
        setMap(response.data.data?.items[0]?.producer.location.coordinates);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAmount();
  }, []);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => {
      setAnimateIn(true);
    }, 100);

    // Add confetti effect when order is placed
    if (orderPlaced) {
      createConfetti();
    }
  }, [orderPlaced]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please log in to place an order");
      navigate("/login");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (!address) {
      alert("Please enter your delivery address");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/order/placeorderfromcart`,
        {
          address: address,
          paymentMethod: paymentMethod,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const orderId = response.data?.data?._id;
      //setting order completed
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/order/${orderId}/completed`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setIsProcessing(false);
      setOrderPlaced(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleRazorpayPayment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    setIsProcessing(true);

    // Validate user input
    if (!token) {
      alert("Please log in to place an order");
      navigate("/login");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      setIsProcessing(false);
      return;
    }

    if (!address) {
      alert("Please enter your delivery address");
      setIsProcessing(false);
      return;
    }

    try {
      // Step 1: Request the backend to create a Razorpay order
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/order/placeorderfromcart`,
        {
          address: address,
          paymentMethod: paymentMethod,
          location: location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Step 2: Load Razorpay script dynamically if not already loaded
      const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };

      const isRazorpayLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!isRazorpayLoaded) {
        alert("Razorpay SDK failed to load. Please check your connection.");
        setIsProcessing(false);
        return;
      }
      // Step 3: Initialize Razorpay payment
      const totalAmount = Math.max(data.data.amount, 100);
      console.log(totalAmount);
      const options = {
        key: data.data.key,
        amount: data.data.amount, // Amount in paise
        currency: "INR",
        order_id: data.data.razorpayOrderId,
        name: "FoodSync",
        description: "Order Payment",
        image: "https://example.com/your_logo",
        handler: async (response) => {
          try {
            // Step 4: Verify payment
            await axios.post(
              `${import.meta.env.VITE_BASE_URL}/api/v1/order/verify-payment`,
              response,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
              }
            );
            alert("Payment Successful!");
            //setting order completed
            await axios.put(
              `${import.meta.env.VITE_BASE_URL}/api/v1/order/${
                data.orderId
              }/completed`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
              }
            );
            setOrderPlaced(true);
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: "utkarsh singh",
          email: "utkarshsingh7104@gmail.com",
          contact: "9889775335",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      if (error.response) {
        alert(
          `Error: ${
            error.response.data.message || "Something went wrong. Try again!"
          }`
        );
      } else if (error.request) {
        alert("Network error. Please check your internet connection.");
      } else {
        alert("Something went wrong. Try again!");
      }
      setIsProcessing(false);
    }
  };

  const handleBackToHome = () => {
    setAnimateIn(false);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const createConfetti = () => {
    const confettiContainer = document.querySelector(".confetti-container");
    if (!confettiContainer) return;

    const colors = ["#FCD34D", "#F59E0B", "#D97706", "#92400E", "#FBBF24"];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDelay = Math.random() * 3 + "s";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      confettiContainer.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 6000);
    }
  };

  return (
    <div className={`payment-page ${animateIn ? "animate-in" : "animate-out"}`}>
      <div className="confetti-container"></div>

      <div className="payment-container">
        <div className="payment-header">
          <h1>Complete Your Order</h1>
          <div className="food-icon-container">
            <div className="food-icon burger"></div>
            <div className="food-icon pizza"></div>
            <div className="food-icon fries"></div>
          </div>
        </div>

        {orderPlaced ? (
          <div className="order-success">
            <div className="success-icon-container pt-2.5">
              <div className="success-icon mt-12">
                <div className="checkmark"></div>
              </div>
              <div className="success-rays"></div>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>
              Thank you for your purchase. Your delicious food is on its way!
            </p>
            <div className="order-details">
              <div className="order-detail-item">
                <span>Order Amount:</span>
                <span className="amount">₹{amount}</span>
              </div>
              <div className="order-detail-item">
                <span>Payment Method:</span>
                <span>
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </span>
              </div>
              <div className="order-detail-item">
                <span>Estimated Delivery:</span>
                <span>30-45 minutes</span>
              </div>
            </div>
            <button className="back-to-home-btn" onClick={handleBackToHome}>
              <span className="btn-icon">🏠</span>
              <span>Back to Home</span>
            </button>
          </div>
        ) : (
          <>
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="amount-row">
                <div className="amount-label">
                  <span className="amount-icon">🛒</span>
                  <span>Total Amount:</span>
                </div>
                {isLoading ? (
                  <div className="loading-spinner">Loading...</div>
                ) : (
                  <span className="amount">₹{amount}</span>
                )}
              </div>
              <div className="payment-progress">
                <div className="progress-step completed">
                  <div className="step-number">1</div>
                  <div className="step-label">Cart</div>
                </div>
                <div className="progress-line"></div>
                <div className="progress-step active">
                  <div className="step-number">2</div>
                  <div className="step-label">Payment</div>
                </div>
                <div className="progress-line"></div>
                <div className="progress-step">
                  <div className="step-number">3</div>
                  <div className="step-label">Confirmation</div>
                </div>
              </div>
            </div>

            <div className="input-group mb-4 mt-4 ml-2 mr-2">
              <input
                type="text"
                placeholder="Enter your delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-white text-gray-700 placeholder-gray-400 shadow-sm"
              />
            </div>
            <motion.div variants={itemVariants} className="mb-4">
              <button
                name="location"
                type="button"
                onClick={getLocation}
                disabled={isLoading}
                className="glass-button location-button"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Getting Location...
                    </>
                  ) : (
                    <>
                      <FaMapMarkerAlt className="mr-2" /> Get My Location
                    </>
                  )}
                </span>
              </button>
              {locationError && (
                <p className="text-red-300 text-sm mb-2">{locationError}</p>
              )}
              {location && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-blue-100 bg-blue-900/30 p-2 rounded-lg border border-blue-500/30 backdrop-blur-sm mt-2"
                >
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="text-blue-300 mr-2" />
                    Location captured: {location.coordinates[1].toFixed(
                      4
                    )}, {location.coordinates[0].toFixed(4)}
                  </p>
                </motion.div>
              )}
            </motion.div>

            <form
              onSubmit={
                paymentMethod === "cod"
                  ? handlePaymentSubmit
                  : handleRazorpayPayment
              }
              className="payment-form"
            >
              <h2>Select Payment Method</h2>

              <div className="payment-options">
                <div
                  className={`payment-option ${
                    paymentMethod === "cod" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodChange("cod")}
                >
                  <div className="option-radio">
                    <div
                      className={`radio-inner ${
                        paymentMethod === "cod" ? "active" : ""
                      }`}
                    ></div>
                  </div>
                  <div className="option-details">
                    <div className="option-icon cod-icon">💵</div>
                    <div className="option-text">
                      <h3>Cash on Delivery</h3>
                      <p>Pay when your order is delivered</p>
                    </div>
                  </div>
                  <div className="option-badge">Popular</div>
                </div>

                <div
                  className={`payment-option ${
                    paymentMethod === "razorpay" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodChange("razorpay")}
                >
                  <div className="option-radio">
                    <div
                      className={`radio-inner ${
                        paymentMethod === "razorpay" ? "active" : ""
                      }`}
                    ></div>
                  </div>
                  <div className="option-details">
                    <div className="option-icon razorpay-icon">💳</div>
                    <div className="option-text">
                      <h3>Online Payment</h3>
                      <p>Pay securely with Razorpay</p>
                    </div>
                  </div>
                  <div className="option-badge secure">Secure</div>
                </div>
              </div>

              <div className="secure-payment-note">
                <div className="secure-icon">🔒</div>
                <p>All payments are secure and encrypted</p>
              </div>

              <button
                type="submit"
                className={`place-order-btn ${
                  isProcessing ? "processing" : ""
                }`}
                disabled={isProcessing || !paymentMethod}
              >
                {isProcessing ? (
                  <>
                    <div className="spinner"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    <span>Place Order Now</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
