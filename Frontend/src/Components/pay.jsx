import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pay.css";
import axios from "axios";

export function Pay() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [amount,setAmount]=useState("0");

  // Get the total amount from location state
  const totalAmount = location.state?.totalAmount || 0;

  //fetch total amount from backend
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
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchAmount();
  }, []);

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

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      if (paymentMethod === "razorpay") {
        // Initialize Razorpay (in a real app)
        handleRazorpayPayment();
      } else {
        // Complete the order for cash on delivery
        setIsProcessing(false);
        setOrderPlaced(true);
      }
    }, 1500);
  };

  const handleRazorpayPayment = () => {
    // This is a simplified example. In a real app, you would:
    // 1. Create an order on your backend
    // 2. Initialize Razorpay with the order details
    // 3. Handle the payment completion

    alert("In a real app, this would open the Razorpay payment window");

    // Simulate successful payment
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
    }, 1000);
  };

  const handleBackToHome = () => {
    setAnimateIn(false);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  // Function to create confetti effect
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

      // Remove confetti after animation completes
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
            <div className="success-icon-container">
              <div className="success-icon">
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
                <span className="amount">₹{totalAmount.toFixed(2)}</span>
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
                <span className="amount">₹{amount}</span>
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

            <form onSubmit={handlePaymentSubmit} className="payment-form">
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
