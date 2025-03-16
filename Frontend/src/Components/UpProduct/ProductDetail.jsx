import { useState, useEffect } from "react";
import "./ProductDetail.css";
import { FaShoppingCart, FaTimes, FaCalendarAlt, FaTag } from "react-icons/fa";

function ProductDetail({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation timing
    setIsVisible(true);

    // Add event listener for escape key
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match transition duration
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={`product-detail-overlay ${isVisible ? "visible" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`product-detail-container ${isVisible ? "visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={handleClose}>
          <FaTimes />
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image-container">
            <div
              className="product-color-overlay"
              style={{ backgroundColor: product.color, opacity: 0.1 }}
            ></div>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="product-detail-image"
            />
          </div>

          <div className="product-detail-info">
            <h2 className="product-detail-title">{product.name}</h2>

            <div className="product-detail-price-container">
              <span className="product-detail-price">
                ₹{product.price.toFixed(2)}
              </span>
              <span className="product-detail-quantity">
                {product.quantity}
              </span>
            </div>

            {product.offers && (
              <div className="product-detail-offer animate-pulse">
                <FaTag className="offer-icon" />
                {product.offers}
              </div>
            )}

            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-attributes">
              <div className="product-attribute">
                <div className="attribute-label">Product Type</div>
                <div className="attribute-value">{product.type}</div>
              </div>

              <div className="product-attribute">
                <div className="attribute-label">
                  <FaCalendarAlt className="attribute-icon" /> Manufacturing
                  Date
                </div>
                <div className="attribute-value">
                  {formatDate(product.manufacturingDate)}
                </div>
              </div>

              <div className="product-attribute">
                <div className="attribute-label">
                  <FaCalendarAlt className="attribute-icon" /> Expiry Date
                </div>
                <div className="attribute-value">
                  {formatDate(product.expiryDate)}
                </div>
              </div>
            </div>

            <div className="product-detail-actions">
              <div className="quantity-selector">
                <div className="quantity-label">Quantity:</div>
                <div className="quantity-controls">
                  <button
                    className="btn btn-outline btn-icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Number.parseInt(e.target.value) || 1)
                    }
                    className="input input-number"
                  />
                  <button
                    className="btn btn-outline btn-icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="btn btn-primary btn-full add-to-cart-btn"
                onClick={() => {
                  onAddToCart(product, quantity);
                  handleClose();
                }}
              >
                <FaShoppingCart className="cart-icon" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
