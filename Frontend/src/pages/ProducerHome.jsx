"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import axios from "axios";
import ItemsDetail from "../Components/Block/ItemsDetail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import Quagga from "quagga";

const ProducerHome = () => {
  const [avatar, setAvatar] = useState(null);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [typeitem, setTypeItem] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [status, setStatus] = useState("");
  const [upcyclingOption, setUpcyclingOption] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [isAdding, setIsAdding] = useState(false); // Loading state for adding items
  const [showWebcam, setShowWebcam] = useState(false); // State to toggle webcam visibility
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false); // State to toggle barcode scanner
  const [scanning, setScanning] = useState(false); // State to track scanning status
  const [scannedResult, setScannedResult] = useState(""); // State to store scanned barcode
  const [isLoadingProduct, setIsLoadingProduct] = useState(false); // Loading state for product lookup
  const webcamRef = useRef(null);
  const scannerRef = useRef(null);
  // Reference for webcam

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const captureImage = () => {
    setTimeout(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setAvatar(imageSrc);
        setShowWebcam(false); // Hide webcam after capture
      }
    }, 500); // Short delay before capture
  };

  // Initialize barcode scanner
  const initBarcodeScanner = () => {
    if (scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerRef.current,
            constraints: {
              width: 480,
              height: 320,
              facingMode: "environment", // Use back camera on mobile devices
            },
          },
          decoder: {
            readers: [
              "code_128_reader",
              "ean_reader",
              "ean_8_reader",
              "code_39_reader",
              "code_39_vin_reader",
              "codabar_reader",
              "upc_reader",
              "upc_e_reader",
              "i2of5_reader",
            ],
          },
        },
        (err) => {
          if (err) {
            console.error("Error initializing Quagga:", err);
            toast.error("Could not initialize barcode scanner");
            return;
          }
          setScanning(true);
          Quagga.start();
        }
      );

      // When a barcode is detected
      Quagga.onDetected((result) => {
        if (result && result.codeResult && result.codeResult.code) {
          const code = result.codeResult.code;
          setScannedResult(code);
          stopBarcodeScanner();
          lookupProduct(code);
        }
      });
    }
  };

  // Stop barcode scanner
  const stopBarcodeScanner = () => {
    if (scanning) {
      Quagga.stop();
      setScanning(false);
    }
  };

  // Toggle barcode scanner
  const toggleBarcodeScanner = () => {
    if (showBarcodeScanner) {
      stopBarcodeScanner();
      setShowBarcodeScanner(false);
    } else {
      setShowBarcodeScanner(true);
      // Initialize scanner after the DOM element is rendered
      setTimeout(() => {
        initBarcodeScanner();
      }, 100);
    }
  };

  // Lookup product information using the barcode
  const lookupProduct = async (barcode) => {
    setIsLoadingProduct(true);
    try {
      // First try Open Food Facts API
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );

      if (response.data && response.data.status === 1) {
        const product = response.data.product;

        // Fill form fields with product data
        if (product.product_name) {
          setItemName(product.product_name);
        }

        if (product.image_url) {
          setAvatar(product.image_url);
        }

        // Set expiry date if available
        if (product.expiration_date) {
          const expiryDateObj = new Date(product.expiration_date);
          setExpiryDate(expiryDateObj.toISOString().split("T")[0]);
        } else {
          // If no expiry date in API, try to extract from packaging codes
          // Many products have a lot code or best-before date in the form "BB: YYYY-MM-DD"
          if (product.packaging_text) {
            const dateMatch = product.packaging_text.match(
              /BB:?\s*(\d{4}-\d{2}-\d{2})/i
            );
            if (dateMatch && dateMatch[1]) {
              setExpiryDate(dateMatch[1]);
            } else {
              // Set a default expiry date 1 year from now for demonstration
              const defaultExpiry = new Date();
              defaultExpiry.setFullYear(defaultExpiry.getFullYear() + 1);
              setExpiryDate(defaultExpiry.toISOString().split("T")[0]);
            }
          } else {
            // Set a default expiry date 1 year from now for demonstration
            const defaultExpiry = new Date();
            defaultExpiry.setFullYear(defaultExpiry.getFullYear() + 1);
            setExpiryDate(defaultExpiry.toISOString().split("T")[0]);
          }
        }

        // Set manufacturing date
        if (product.created_datetime) {
          const mfgDateObj = new Date(product.created_datetime);
          setManufacturingDate(mfgDateObj.toISOString().split("T")[0]);
        } else {
          // Set a default manufacturing date 1 month ago
          const defaultMfg = new Date();
          defaultMfg.setMonth(defaultMfg.getMonth() - 1);
          setManufacturingDate(defaultMfg.toISOString().split("T")[0]);
        }

        // Set other fields if available
        if (product.quantity) {
          const quantityMatch = product.quantity.match(/(\d+(\.\d+)?)/);
          if (quantityMatch) {
            setQuantity(quantityMatch[1]);
            setUnit(product.quantity.replace(quantityMatch[0], "").trim());
          }
        }

        if (product.categories_tags && product.categories_tags.length > 0) {
          // Map categories to your specific options
          if (
            product.categories_tags.some(
              (tag) =>
                tag.includes("fresh") ||
                tag.includes("fruits") ||
                tag.includes("vegetables") ||
                tag.includes("dairy")
            )
          ) {
            setCategory("perishable");
          } else {
            setCategory("non-perishable");
          }
        }

        // Set type based on packaging
        if (product.packaging_tags && product.packaging_tags.length > 0) {
          if (
            product.packaging_tags.some(
              (tag) =>
                tag.includes("paper") ||
                tag.includes("cardboard") ||
                tag.includes("wood")
            )
          ) {
            setTypeItem("biodegradable");
          } else {
            setTypeItem("non-biodegradable");
          }
        }

        // Set a default description
        if (product.ingredients_text) {
          setDescription(
            `${product.product_name || "Product"} - ${product.ingredients_text}`
          );
        } else {
          setDescription(
            `${
              product.product_name || "Product"
            } - Scanned from barcode ${barcode}`
          );
        }

        // Set a default price (this would typically come from your inventory system)
        if (!price) {
          setPrice("0.00"); // Default price, user can adjust
        }

        toast.success("Product information loaded successfully!");
      } else {
        // Try a fallback API or set default values
        toast.warning("Product not found in database. Setting default values.");

        // Set default values
        setItemName(`Product (${barcode})`);

        // Default expiry date (6 months from now)
        const defaultExpiry = new Date();
        defaultExpiry.setMonth(defaultExpiry.getMonth() + 6);
        setExpiryDate(defaultExpiry.toISOString().split("T")[0]);

        // Default manufacturing date (1 month ago)
        const defaultMfg = new Date();
        defaultMfg.setMonth(defaultMfg.getMonth() - 1);
        setManufacturingDate(defaultMfg.toISOString().split("T")[0]);

        // Set description
        setDescription(
          `Product scanned from barcode ${barcode}. Please add details.`
        );
      }
    } catch (error) {
      console.error("Error looking up product:", error);
      toast.error(
        "Failed to lookup product information. Please fill details manually."
      );

      // Still set the barcode as the product name so user knows what was scanned
      setItemName(`Product (${barcode})`);

      // Set default dates
      const defaultExpiry = new Date();
      defaultExpiry.setMonth(defaultExpiry.getMonth() + 6);
      setExpiryDate(defaultExpiry.toISOString().split("T")[0]);

      const defaultMfg = new Date();
      defaultMfg.setMonth(defaultMfg.getMonth() - 1);
      setManufacturingDate(defaultMfg.toISOString().split("T")[0]);
    } finally {
      setIsLoadingProduct(false);
      setShowBarcodeScanner(false); // Hide scanner after lookup
    }
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopBarcodeScanner();
    };
  }, []);

  const handleAddItem = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Unauthorized: No token found. Please log in again.");
      return;
    }

    // Check if product is expired and quantity is less than 5
    const currentDate = new Date();
    const expiry = new Date(expiryDate);

    if (expiry < currentDate && Number.parseInt(quantity) < 5) {
      toast.error("For expired products, minimum quantity should be 5");
      return;
    }

    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("quantity", quantity);
    formData.append("unit", unit);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("expiryDate", expiryDate);
    formData.append("mfDate", manufacturingDate);
    formData.append("typeitem", typeitem);
    formData.append("status", status);
    formData.append("upcyclingOptions", upcyclingOption);
    formData.append("description", description);

    if (avatar) {
      try {
        // Handle different types of avatar sources
        if (avatar.startsWith("data:image")) {
          // From webcam capture (data URL)
          const response = await fetch(avatar);
          const blob = await response.blob();
          formData.append("avatar", blob, "webcam-capture.jpg");
        } else if (avatar.startsWith("http") || avatar.startsWith("https")) {
          // From external URL (barcode lookup)
          const response = await fetch(avatar);
          const blob = await response.blob();
          formData.append("avatar", blob, "product-image.jpg");
        } else {
          // Use file from input
          const fileInput = document.querySelector('input[type="file"]');
          if (fileInput && fileInput.files[0]) {
            formData.append("avatar", fileInput.files[0]);
          }
        }
      } catch (error) {
        console.error("Error processing image:", error);
        toast.error("Failed to process image. Please try uploading again.");
        return;
      }
    }

    setIsAdding(true); // Start loading

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/items/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success("Item added successfully!");
      setAddedItems([...addedItems, response.data]);

      // Clear form inputs
      setItemName("");
      setQuantity("");
      setUnit("");
      setPrice("");
      setCategory("");
      setExpiryDate("");
      setManufacturingDate("");
      setTypeItem("");
      setStatus("");
      setUpcyclingOption("");
      setDescription("");
      setAvatar(null);
      setShowWebcam(false);
      setShowBarcodeScanner(false);
      setScannedResult("");
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error(error.response?.data?.message || "Failed to add item");
    } finally {
      setIsAdding(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans overflow-auto h-screen">
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

      <Navbar />

      <motion.div
        className="flex items-center justify-between p-6 pt-3 pb-3 mt-16 shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold text-gray-800">
          Surplus Producer
        </h1>
      </motion.div>

      <div className="p-10 pt-5 mb-9">
        <motion.div
          className="bg-[url('https://cdn.pixabay.com/photo/2016/04/02/09/43/apple-1302430_1280.jpg')] p-10 rounded-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-semibold text-gray-700 mb-6">
            Add Items
          </h3>

          <motion.form
            onSubmit={handleAddItem}
            className="rounded-xl shadow-md p-6 bg-gray-500/80 max-w-4xl mb-15 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Barcode Scanner Section */}
            <div className="mb-6 p-4 bg-gray-600/50 rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h4 className="text-xl font-semibold text-white mb-2 sm:mb-0">
                  Scan Product Barcode
                </h4>
                <button
                  type="button"
                  onClick={toggleBarcodeScanner}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"
                >
                  {showBarcodeScanner ? "Hide Scanner" : "Show Barcode Scanner"}
                  {isLoadingProduct && (
                    <svg
                      className="animate-spin ml-2 h-5 w-5 text-white"
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
                  )}
                </button>
              </div>

              {showBarcodeScanner && (
                <div className="mt-2">
                  <div
                    ref={scannerRef}
                    className="relative overflow-hidden rounded-lg border-2 border-purple-400 mx-auto"
                    style={{
                      width: "100%",
                      maxWidth: "480px",
                      height: "320px",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-3/4 h-1/2 border-2 border-red-500 border-dashed rounded-lg"></div>
                    </div>
                  </div>
                  {scannedResult && (
                    <div className="mt-2 p-2 bg-white rounded-lg text-center">
                      <p className="font-medium">Barcode: {scannedResult}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Name
                </label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="text"
                  placeholder="Item name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Image
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border rounded-lg bg-gray-200"
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowWebcam(!showWebcam)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      {showWebcam ? "Hide Camera" : "Use Camera"}
                    </button>

                    {showWebcam && (
                      <button
                        type="button"
                        onClick={captureImage}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        📸 Capture
                      </button>
                    )}
                  </div>

                  {showWebcam && (
                    <div className="mt-2">
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={320}
                        height={240}
                        className="rounded-lg border border-gray-300"
                      />
                    </div>
                  )}

                  {avatar && (
                    <img
                      className="h-32 w-32 mt-2 rounded-lg shadow-md object-cover"
                      src={avatar || "/placeholder.svg"}
                      alt="Preview"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="number"
                  placeholder="Item Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Unit
                </label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="text"
                  placeholder="e.g., kg, liters"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Price
                </label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="text"
                  placeholder=""
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Category
                </label>
                <select
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="perishable">Perishable</option>
                  <option value="non-perishable">Non-Perishable</option>
                  <option value="ready-to-eat">Ready-to-Eat</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Types
                </label>
                <select
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  value={typeitem}
                  onChange={(e) => setTypeItem(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="biodegradable">Biodegradable</option>
                  <option value="non-biodegradable">Non-Biodegradable</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Manufacturing Date
                </label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="date"
                  value={manufacturingDate}
                  onChange={(e) => setManufacturingDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  placeholder="Item description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  required
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => {
                    setExpiryDate(e.target.value);
                  }}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Upcycling Option
                </label>
                <select
                  className="w-full p-3 border rounded-lg bg-gray-200"
                  value={upcyclingOption}
                  onChange={(e) => setUpcyclingOption(e.target.value)}
                >
                  <option value="compost">Compost</option>
                  <option value="biogas">Biogas</option>
                  <option value="fertilizer">Fertilizer</option>
                  <option value="cosmetics">Cosmetics</option>
                  <option value="smoothies">Smoothies</option>
                  <option value="beverage">Beverage</option>
                  <option value="animal feed">Animal Feed</option>
                  <option value="flour">Flour</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300 flex items-center justify-center"
              disabled={isAdding} // Disable button while adding
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAdding ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
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
                  Adding...
                </>
              ) : (
                "Add Item"
              )}
            </motion.button>
          </motion.form>
        </motion.div>

        <ItemsDetail />
      </div>

      <Footer />
    </div>
  );
};

export default ProducerHome;
