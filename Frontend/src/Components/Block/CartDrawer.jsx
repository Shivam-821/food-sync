"use client";

import { useState, useEffect } from "react";
import "./CartDrawer.css";
import { FaShoppingCart, FaTimes, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CartDrawer({
  isOpen,
  setIsOpen,
  cartItems,
  removeFromCart,
  updateQuantity,
  data,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent body scrolling when drawer is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div
      className={`cart-drawer-overlay ${isVisible ? "visible" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`cart-drawer ${isVisible ? "visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            <FaShoppingCart className="cart-icon" />
            Your Cart
          </h2>
          <button
            className="close-button"
            onClick={handleClose}
            aria-label="Close cart"
          >
            <FaTimes />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <FaShoppingCart className="empty-cart-icon animate-bounce" />
            <h3 className="empty-cart-title">Your cart is empty</h3>
            <p className="empty-cart-message">
              Looks like you haven't added any products to your cart yet.
            </p>
            <button className="btn btn-primary" onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.item._id} className="cart-item">
                  <div
                    className="cart-item-image-container"
                    style={{ backgroundColor: item.color + "33" }}
                  >
                    <img
                      src={item.item.avatar || "/placeholder.svg"}
                      alt={item.item.name}
                      className="cart-item-image"
                    />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h3 className="cart-item-title">{item.item.name}</h3>
                      <button
                        className="remove-item-button"
                        onClick={() => removeFromCart(item.item._id)}
                        aria-label="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="cart-item-price">
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </div>
                    <div className="cart-item-quantity">
                      <button
                        className="btn btn-outline btn-icon quantity-btn"
                        onClick={() =>
                          updateQuantity(item.item._id, item.quantity, "delete")
                        }
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.item._id,
                            parseInt(e.target.value, 10),
                            "update"
                          )
                        }
                        className="input input-number"
                        aria-label="Quantity"
                      />
                      <button
                        className="btn btn-outline btn-icon quantity-btn"
                        onClick={() =>
                          updateQuantity(item.item._id, item.quantity, "add")
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>₹{data.totalAmount.toFixed(2)}</span>
              </div>
              <button
                className="btn btn-primary btn-full checkout-btn"
                onClick={() =>
                  navigate("/pay", { state: { totalAmount: totalPrice } })
                }
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
