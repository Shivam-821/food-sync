"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Pay.css";

export function Pay() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Get the total amount from location state
  const totalAmount = location.state?.totalAmount || 0;

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
    navigate("/");
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Checkout</h1>

        {orderPlaced ? (
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase.</p>
            <button className="back-to-home-btn" onClick={handleBackToHome}>
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="amount-row">
                <span>Total Amount:</span>
                <span className="amount">₹{totalAmount.toFixed(2)}</span>
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
                    <h3>Cash on Delivery</h3>
                    <p>Pay when your order is delivered</p>
                  </div>
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
                    <h3>Online Payment</h3>
                    <p>Pay securely with Razorpay</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={isProcessing || !paymentMethod}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
