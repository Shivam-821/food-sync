"use client";

import { useState } from "react";
import "./ProductCard.css";
import { FaShoppingCart, FaTag } from "react-icons/fa";

function ProductCard({ product, onImageClick, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`product-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container" onClick={onImageClick}>
        <div
          className="product-color-overlay"
          style={{ backgroundColor: product.color, opacity: 0.2 }}
        ></div>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className={`product-image ${isHovered ? "zoomed" : ""}`}
        />
        {product.offers && (
          <div className="product-offer animate-pulse">
            <FaTag className="offer-icon" />
            {product.offers}
          </div>
        )}
        <div
          className={`product-detail-hint ${isHovered ? "visible" : ""}`}
          style={{ backgroundColor: product.color }}
        >
          Click for details
        </div>
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price-container">
          <span className="product-price">₹{product.price.toFixed(2)}</span>
          <span className="product-quantity">{product.quantity}</span>
        </div>
        <div className="product-type">
          Type:{" "}
          {product.type === "perishable" ? "Perishable" : "Non-perishable"}
        </div>
      </div>
      <div className="product-footer">
        <button
          className="btn btn-primary btn-full add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          <FaShoppingCart className="cart-icon" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
