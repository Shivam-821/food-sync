"use client";

import { useState } from "react";
import "./FilterSection.css";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";

function FilterSection({
  priceRange,
  setPriceRange,
  productType,
  setProductType,
  expiryDateFilter,
  setExpiryDateFilter,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePriceChange = (e, index) => {
    const newValue = Number.parseFloat(e.target.value);
    const newRange = [...priceRange];
    newRange[index] = newValue;

    // Ensure min <= max
    if (index === 0 && newValue > priceRange[1]) {
      newRange[1] = newValue;
    } else if (index === 1 && newValue < priceRange[0]) {
      newRange[0] = newValue;
    }

    setPriceRange(newRange);
  };

  return (
    <div className={`filter-section ${isExpanded ? "expanded" : ""}`}>
      <div className="filter-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="filter-title">
          <FaSearch className="filter-icon" />
          Filter Products
        </div>
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      <div className="filter-content">
        <div className="filter-grid">
          {/* Price Range Filter */}
          <div className="filter-group">
            <h3 className="filter-group-title">Price Range</h3>
            <div className="price-range-inputs">
              <div className="price-input-group">
                <label>Min (₹)</label>
                <input
                  type="number"
                  className="input"
                  min="0"
                  max="10"
                  step="0.5"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                />
              </div>
              <div className="price-input-group">
                <label>Max (₹)</label>
                <input
                  type="number"
                  className="input"
                  min="0"
                  max="10"
                  step="0.5"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                />
              </div>
            </div>
            <div className="price-slider-container">
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="price-slider min-slider"
              />
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="price-slider max-slider"
              />
            </div>
            <div className="price-range-display">
              <span>₹{priceRange[0].toFixed(2)}</span>
              <span>₹{priceRange[1].toFixed(2)}</span>
            </div>
          </div>

          {/* Product Type Filter */}
          <div className="filter-group">
            <h3 className="filter-group-title">Product Type</h3>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="productType"
                  value="all"
                  checked={productType === "all"}
                  onChange={(e) => setProductType(e.target.value)}
                />
                <span className="radio-text">All Products</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="productType"
                  value="perishable"
                  checked={productType === "perishable"}
                  onChange={(e) => setProductType(e.target.value)}
                />
                <span className="radio-text">Perishable</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="productType"
                  value="non-perishable"
                  checked={productType === "non-perishable"}
                  onChange={(e) => setProductType(e.target.value)}
                />
                <span className="radio-text">Non-Perishable</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="productType"
                  value="ready-to-eat"
                  checked={productType === "ready-to-eat"}
                  onChange={(e) => setProductType(e.target.value)}
                />
                <span className="radio-text">Ready-To-Eat</span>
              </label>
            </div>
          </div>

          {/* Expiry Date Filter */}
          <div className="filter-group">
            <h3 className="filter-group-title">Expiry Date (Before)</h3>
            <input
              type="date"
              className="input date-input"
              value={expiryDateFilter}
              onChange={(e) => setExpiryDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
