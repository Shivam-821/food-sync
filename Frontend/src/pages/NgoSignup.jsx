import { useContext, useState, useEffect, useRef } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import "./signup.css";
// import Navbar from "../Components/Navbar/Navbar";
import axios from "axios";
// import { ConsumerDataContext } from "../../Context/ConsumerContext";
import { motion } from "framer-motion";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";

const NGOSignUp = () => {
  const navigate = useNavigate();
//   const { consumer, setConsumer } = useContext(ConsumerDataContext);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    ownerName: "",
    ngoName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFormValid, setIsFormValid] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isButtonMoving, setIsButtonMoving] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Track cursor position for effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - left,
          y: e.clientY - top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Check form validity
  useEffect(() => {
    const checkFormValidity = () => {
      const isValid =
        formData.ownerName.trim() !== "" &&
        formData.ngoName.trim() !== "" &&
        formData.email.includes("@") &&
        formData.password.length >= 6 &&
        formData.password === formData.confirmPassword &&
        formData.phone.trim() !== "" &&
        /^[6-9]\d{9}$/.test(formData.phone);

      setIsFormValid(isValid);
    };

    checkFormValidity();
  }, [formData]);

  // Handle button movement when form is invalid
  const handleButtonMouseEnter = () => {
    if (!isFormValid && !isLoading) {
      moveButton();
    }
  };

  const moveButton = () => {
    if (!buttonRef.current || !formRef.current) return;

    setIsButtonMoving(true);

    const formRect = formRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();

    // Calculate safe area to move within the form
    const maxX = formRect.width - buttonRect.width;
    const maxY = formRect.height - buttonRect.height;

    // Generate random position within the form boundaries
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setButtonPosition({ x: randomX, y: randomY });

    // Reset the moving state after animation completes
    setTimeout(() => {
      setIsButtonMoving(false);
    }, 500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner name is required.";
    if (!formData.ngoName.trim()) newErrors.ngoName = "NGO name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const newNGO = {
      ownerName: formData.ownerName,
      ngoName: formData.ngoName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/ngo/register`,
        newNGO
      );

      if (response.status === 201) {
        const token = response.data.data.accessToken;
        if (token) {
          localStorage.setItem("accessToken", token);
        }

        const ngoId = response.data.data.ngo._id;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }

        const data = response.data;
        setConsumer(data.ngo);
        localStorage.setItem("token", data.refreshToken);

        setIsLoading(false);

        // Success animation before redirect
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setIsLoading(false);
        alert("Error during signup. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setIsLoading(false);
      alert("Failed to connect to server.");
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    let text = "";
    if (strength === 1) text = "Weak";
    else if (strength === 2) text = "Fair";
    else if (strength === 3) text = "Good";
    else if (strength === 4) text = "Strong";

    return { strength, text };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <>
      {/* <Navbar /> */}
      <div className="consumer-container" ref={containerRef}>
        {/* Cursor follower */}
        <div
          className="cursor-follower"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
          }}
        ></div>

        {/* Floating orbs that follow mouse */}
        <div
          className="consumer-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${
              mousePosition.y * 0.05
            }px)`,
          }}
        ></div>
        <div
          className="consumer-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.08}px, ${
              mousePosition.y * -0.08
            }px)`,
          }}
        ></div>
        <div
          className="consumer-orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${
              mousePosition.y * 0.03
            }px)`,
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="consumer-card"
        >
          {/* Left Section */}
          <div className="consumer-panel left-panel">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-3xl font-bold mb-4 text-white">
                Join as an NGO
              </h1>
              <div className="h-1 w-20 bg-green-400 mb-6 rounded-full mx-auto"></div>
              <p className="text-green-100 mb-6 text-center text-lg">
                Distribute food to those in need and make a difference.
              </p>
              <p className="text-green-100 text-center mb-8">
                Help reduce food waste while supporting sustainability.
              </p>

              {/* Animated illustration */}
              <div className="flex justify-center mt-8">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="consumer-icon"
                  style={{
                    transform: `translate(${mousePosition.x * 0.02}px, ${
                      mousePosition.y * 0.02
                    }px)`,
                  }}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-4">🤝</div>
                    <div className="text-xl font-bold text-white">
                      NGO Partner
                    </div>
                    <div className="text-sm mt-2 text-green-100">
                      Distribute Food to Those in Need
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Section */}
          <div className="consumer-panel right-panel">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              ref={formRef}
              className="form-container"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-2 text-white">
                  Get Started for Free
                </h2>
                <div className="h-1 w-12 bg-green-500 mb-6 rounded-full"></div>
                <p className="text-green-100 mb-6">
                  Unlock exclusive benefits. No commitment.
                </p>
              </motion.div>

              {/* Signup Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-green-300">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="ownerName"
                    placeholder="Owner's full name"
                    value={formData.ownerName}
                    onChange={handleChange}
                    onFocus={() => setActiveField("ownerName")}
                    onBlur={() => setActiveField(null)}
                    className={`consumer-input ${
                      activeField === "ownerName"
                        ? "active-input"
                        : errors.ownerName
                        ? "error-input"
                        : formData.ownerName
                        ? "success-input"
                        : ""
                    }`}
                  />
                  {errors.ownerName && (
                    <p className="text-red-300 text-sm mt-1">
                      {errors.ownerName}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-green-300">
                    <FaHandHoldingHeart />
                  </div>
                  <input
                    type="text"
                    name="ngoName"
                    placeholder="NGO name"
                    value={formData.ngoName}
                    onChange={handleChange}
                    onFocus={() => setActiveField("ngoName")}
                    onBlur={() => setActiveField(null)}
                    className={`consumer-input ${
                      activeField === "ngoName"
                        ? "active-input"
                        : errors.ngoName
                        ? "error-input"
                        : formData.ngoName
                        ? "success-input"
                        : ""
                    }`}
                  />
                  {errors.ngoName && (
                    <p className="text-red-300 text-sm mt-1">{errors.ngoName}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-green-300">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    className={`consumer-input ${
                      activeField === "email"
                        ? "active-input"
                        : errors.email
                        ? "error-input"
                        : formData.email && formData.email.includes("@")
                        ? "success-input"
                        : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-300 text-sm mt-1">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-green-300">
                    <FaPhone />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setActiveField("phone")}
                    onBlur={() => setActiveField(null)}
                    pattern="[6-9]\d{9}"
                    title="Please enter a valid 10-digit mobile number"
                    className={`consumer-input ${
                      activeField === "phone"
                        ? "active-input"
                        : errors.phone
                        ? "error-input"
                        : formData.phone && /^[6-9]\d{9}$/.test(formData.phone)
                        ? "success-input"
                        : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-300 text-sm mt-1">{errors.phone}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-green-300">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setActiveField("password")}
                    onBlur={() => setActiveField(null)}
                    className={`consumer-input ${
                      activeField === "password"
                        ? "active-input"
                        : errors.password
                        ? "error-input"
                        : formData.password && formData.password.length >= 6
                        ? "success-input"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-green-300 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.password && (
                    <p className="text-red-300 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}

                  {/* Password strength indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full ${
                              i < passwordStrength.strength
                                ? passwordStrength.strength === 1
                                  ? "bg-red-500"
                                  : passwordStrength.strength === 2
                                  ? "bg-orange-500"
                                  : passwordStrength.strength === 3
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                : "bg-gray-700"
                            }`}
                          ></div>
                        ))}
                      </div>
                      <p
                        className={`text-xs ${
                          passwordStrength.strength === 1
                            ? "text-red-300"
                            : passwordStrength.strength === 2
                            ? "text-orange-300"
                            : passwordStrength.strength === 3
                            ? "text-yellow-300"
                            : "text-green-300"
                        }`}
                      >
                        {passwordStrength.text}
                      </p>
                    </div>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute left-3 top-3.5 text-green-300">
                    <FaLock />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setActiveField("confirmPassword")}
                    onBlur={() => setActiveField(null)}
                    className={`consumer-input ${
                      activeField === "confirmPassword"
                        ? "active-input"
                        : errors.confirmPassword
                        ? "error-input"
                        : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
                        ? "success-input"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-green-300 hover:text-white transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-300 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  style={{
                    position: "relative",
                    transform: isFormValid
                      ? "none"
                      : `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                    transition: isButtonMoving
                      ? "transform 0.5s ease-out"
                      : "none",
                  }}
                  ref={buttonRef}
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="consumer-button signup-button"
                    onMouseEnter={handleButtonMouseEnter}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
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
                        Processing...
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-center text-green-100 mt-4"
                >
                  If registered,{" "}
                  <span
                    className="text-green-300 cursor-pointer hover:text-white font-medium transition-colors duration-300"
                    onClick={() => navigate("/login")}
                  >
                    LOG IN
                  </span>
                </motion.p>

                {/* Social Signup Options */}
                <motion.p
                  variants={itemVariants}
                  className="text-center text-green-100 my-4"
                >
                  or sign up with
                </motion.p>

                <motion.div variants={itemVariants} className="flex space-x-4">
                  {/* <GoogleOAuthProvider
                    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                  >
                    <GoogleLogin />
                  </GoogleOAuthProvider> */}
                  <button
                    type="button"
                    className="consumer-button facebook-button flex-1"
                    // onClick={handleFacebookSignup}
                  >
                    Facebook
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NGOSignUp;