"use client";
import "./feedback.css";
import axios from "axios";

import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Sun,
  Moon,
  Filter,
  ThumbsUp,
  Send,
  Leaf,
  Apple,
  Utensils,
} from "lucide-react";

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ rating: 5, comment: "" });
  const [activeFilter, setActiveFilter] = useState("recent");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState("Guest User");
  const [userType, setUserType] = useState("individual");
    const [loading, setLoading] = useState(false);

  // Load feedback from localStorage on component mount
  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/feedback/getallfeedback`
        );
        setFeedbackList(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Stop loader after fetching
      }
    };
    fetchFeedback();
    
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "true");
    }
  }, []);

  useEffect(() => {
  }, [feedbackList]); // ✅ Only logs when feedbackList updates
  

  // Update body class when dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  // Handle submitting new feedback
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!newFeedback.comment.trim()) return;

    const feedback = {
      id: Date.now(),
      user: userName + (userType !== "individual" ? ` (${userType})` : ""),
      avatar: "/placeholder.svg?height=40&width=40",
      rating: newFeedback.rating,
      comment: newFeedback.comment,
      date: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    const updatedFeedback = [feedback, ...feedbackList];
    setFeedbackList(updatedFeedback);
    
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You must be logged in to donate food.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/feedback/givefeedback`,
        feedback,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Correct content type
          },
        }
      );

      if (response.status === 201) {
        alert("Feedback submitted successfully!");
        setNewFeedback({ rating: 5, comment: "" });
      } else {
        alert("Error during donation. Please try again.");
      }
    } catch (error) {
      console.error("Error during donation:", error);
      alert("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // Handle liking a feedback
  const handleLike = (id) => {
    const updated = feedbackList.map((item) => {
      if (item._id === id) {
        return { ...item, likes: (item.likes || 0) + 1 };
      }
      return item;
    });
    setFeedbackList(updated);
    localStorage.setItem("feedbackData", JSON.stringify(updated));
  };

  // Handle replying to feedback (frontend only)
  const handleReply = (feedbackId) => {
    if (!replyText.trim()) return;

    const updated = feedbackList.map((item) => {
      if (item._id === feedbackId) {
        const newReply = {
          id: Date.now(),
          user: userName + (userType !== "individual" ? ` (${userType})` : ""),
          avatar: "/placeholder.svg?height=30&width=30",
          comment: replyText,
          date: new Date().toISOString(),
          likes: 0,
        };
        return { ...item, replies: [...(item.replies || []), newReply] };
      }
      return item;
    });

    setFeedbackList(updated);
    localStorage.setItem("feedbackData", JSON.stringify(updated));
    setReplyingTo(null);
    setReplyText("");
  };

  // Handle liking replies (frontend only)
  const handleLikeReply = (feedbackId, replyId) => {
    const updated = feedbackList.map((item) => {
      if (item._id === feedbackId) {
        const updatedReplies = item.replies.map((reply) => {
          if (reply.id === replyId) {
            return { ...reply, likes: reply.likes + 1 };
          }
          return reply;
        });
        return { ...item, replies: updatedReplies };
      }
      return item;
    });

    setFeedbackList(updated);
    localStorage.setItem("feedbackData", JSON.stringify(updated));
  };

  // Fetch feedback on component mount
  useEffect(() => {}, [feedbackList]);

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  // Filter feedback based on active filter
  const getFilteredFeedback = () => {
    if (!Array.isArray(feedbackList)) {
      return []; // Return an empty array if feedbackList is not an array
    }

    switch (activeFilter) {
      case "recent":
        return [...feedbackList].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return [...feedbackList].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "mostLiked":
        return [...feedbackList].sort(
          (a, b) => (b.likes || 0) - (a.likes || 0)
        );
      case "mostReplies":
        return [...feedbackList].sort(
          (a, b) => (b.replies?.length || 0) - (a.replies?.length || 0)
        );
      case "highestRated":
        return [...feedbackList].sort((a, b) => b.rating - a.rating);
      default:
        return feedbackList;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return diffMinutes === 0 ? "just now" : `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return "yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={`text-xl ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ));
  };

  // Get animation class based on index
  const getAnimationClass = (index) => {
    return index % 2 === 0 ? "animate-slide-in-right" : "animate-slide-in-left";
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-green-50 to-blue-50"
      }`}
    >
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Leaf className="mr-2 text-green-500" size={28} />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
              FoodSync Feedback
            </h1>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                : "bg-white/30 backdrop-blur-sm text-gray-700 hover:bg-white/50 shadow-lg"
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* User info input */}
        <div
          className={`mb-6 p-6 rounded-xl ${
            isDarkMode
              ? "bg-gray-800/70 backdrop-blur-md border border-gray-700/50"
              : "bg-white/40 backdrop-blur-md border border-white/50 shadow-xl"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Your Name:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700/70 border-gray-600 text-white"
                    : "bg-white/70 border-gray-200 text-gray-800"
                } backdrop-blur-sm focus:ring-2 focus:ring-green-500 transition-all duration-300`}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">You are:</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700/70 border-gray-600 text-white"
                    : "bg-white/70 border-gray-200 text-gray-800"
                } backdrop-blur-sm focus:ring-2 focus:ring-green-500 transition-all duration-300`}
              >
                <option value="individual">Individual Consumer</option>
                <option value="restaurant">Restaurant/Food Business</option>
                <option value="ngo">NGO/Food Bank</option>
                <option value="farm">Farm/Producer</option>
                <option value="other">Other Organization</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback form */}
        <form
          onSubmit={handleSubmitFeedback}
          className={`mb-8 p-6 rounded-xl transition-all duration-500 transform hover:scale-[1.01] ${
            isDarkMode
              ? "bg-gray-800/70 backdrop-blur-md border border-gray-700/50"
              : "bg-white/40 backdrop-blur-md border border-white/50 shadow-xl"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MessageCircle className="mr-2 text-green-500" size={20} />
            Share Your FoodSync Experience
          </h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Rating:</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                name="rating"
                  key={star}
                  type="button"
                  onClick={() =>
                    setNewFeedback({ ...newFeedback, rating: star })
                  }
                  className={`text-2xl transition-all duration-300 ${
                    star <= newFeedback.rating
                      ? "text-yellow-400 transform scale-110"
                      : "text-gray-300 hover:text-yellow-200"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Your Feedback:</label>
            <textarea
              name="comment"
              value={newFeedback.comment}
              onChange={(e) =>
                setNewFeedback({ ...newFeedback, comment: e.target.value })
              }
              className={`w-full p-4 rounded-lg border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-700/70 border-gray-600 text-white"
                  : "bg-white/70 border-gray-200 text-gray-800"
              } backdrop-blur-sm focus:ring-2 focus:ring-green-500`}
              rows={4}
              placeholder="Share how FoodSync has helped you reduce food waste..."
              required
            />
          </div>

          <button
            type="submit"
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white"
                : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white"
            } shadow-lg hover:shadow-xl`}
          >
            Submit Feedback
          </button>
        </form>

        {/* Filter options */}
        <div
          className={`mb-6 p-4 rounded-xl flex flex-wrap items-center gap-2 ${
            isDarkMode
              ? "bg-gray-800/70 backdrop-blur-md border border-gray-700/50"
              : "bg-white/40 backdrop-blur-md border border-white/50 shadow-lg"
          }`}
        >
          <Filter size={20} className="mr-2 text-green-500" />
          <span className="font-medium mr-2">Filter by:</span>
          {[
            { id: "recent", label: "Most Recent" },
            { id: "oldest", label: "Oldest" },
            { id: "mostLiked", label: "Most Liked" },
            { id: "mostReplies", label: "Most Replies" },
            { id: "highestRated", label: "Highest Rated" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeFilter === filter.id
                  ? isDarkMode
                    ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg"
                    : "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                  : isDarkMode
                  ? "bg-gray-700/70 hover:bg-gray-600/70 backdrop-blur-sm"
                  : "bg-white/50 hover:bg-white/70 backdrop-blur-sm"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Feedback list */}
        <div className="space-y-6">
          {getFilteredFeedback().map((feedback, index) => (
            <div
              key={feedback._id}
              className={`p-6 rounded-xl transition-all duration-500 ${getAnimationClass(
                index
              )} ${
                isDarkMode
                  ? "bg-gray-800/70 backdrop-blur-md border border-gray-700/50 hover:bg-gray-800/90"
                  : "bg-white/40 backdrop-blur-md border border-white/50 shadow-lg hover:bg-white/60"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode ? "bg-gray-700" : "bg-green-100"
                  }`}
                >
                  {/* {feedback.user.includes("Restaurant") ||
                  feedback.user.includes("Catering") ||
                  feedback.user.includes("Buffet") ? (
                    <Utensils className="text-green-500" size={24} />
                  ) : feedback.user.includes("NGO") ||
                    feedback.user.includes("Food Bank") ||
                    feedback.user.includes("Shelter") ? (
                    <Heart className="text-red-500" size={24} />
                  ) : (
                    <Apple className="text-green-500" size={24} />
                  )} */}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{feedback.user.fullname}</h3>
                      <div className="flex items-center mt-1">
                        {renderStars(feedback.rating)}
                        <span
                          className={`ml-2 text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {formatDate(feedback.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p
                    className={`my-3 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {feedback.comment}
                  </p>

                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => handleLike(feedback._id)}
                      className={`flex items-center gap-1 transition-all duration-300 ${
                        isDarkMode
                          ? "text-gray-400 hover:text-red-400"
                          : "text-gray-500 hover:text-red-500"
                      } hover:scale-110`}
                    >
                      <Heart size={18} className="fill-current" />
                      <span>{feedback.likes||9}</span>
                    </button>

                    <button
                      onClick={() =>
                        setReplyingTo(
                          replyingTo === feedback._id ? null : feedback._id
                        )
                      }
                      className={`flex items-center gap-1 transition-all duration-300 ${
                        isDarkMode
                          ? "text-gray-400 hover:text-green-400"
                          : "text-gray-500 hover:text-green-500"
                      } hover:scale-110`}
                    >
                      <MessageCircle size={18} />
                      <span>{feedback.replies || 19}</span>
                    </button>
                  </div>

                  {/* Reply form */}
                  {replyingTo === feedback._id && (
                    <div
                      className={`mt-4 p-4 rounded-lg animate-fade-in ${
                        isDarkMode
                          ? "bg-gray-700/70 backdrop-blur-sm"
                          : "bg-white/50 backdrop-blur-sm"
                      }`}
                    >
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className={`w-full p-3 rounded-lg border mb-2 ${
                          isDarkMode
                            ? "bg-gray-600/70 border-gray-500 text-white"
                            : "bg-white/70 border-gray-200 text-gray-800"
                        } backdrop-blur-sm focus:ring-2 focus:ring-green-500`}
                        rows={2}
                        placeholder="Share your thoughts or experience..."
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gray-600/70 hover:bg-gray-500/70"
                              : "bg-gray-200/70 hover:bg-gray-300/70"
                          } backdrop-blur-sm`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReply(feedback._id)}
                          className={`px-4 py-2 rounded-lg flex items-center gap-1 transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500"
                              : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400"
                          } text-white shadow-md hover:shadow-lg`}
                        >
                          <Send size={16} />
                          Reply
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {/* {feedback.replies.length > 0 && (
                    <div
                      className={`mt-4 pl-4 border-l-2 ${
                        isDarkMode ? "border-gray-700" : "border-green-200"
                      }`}
                    >
                      {feedback.replies.map((reply) => (
                        <div key={reply.id} className="mt-3 animate-fade-in">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isDarkMode ? "bg-gray-700" : "bg-blue-100"
                              }`}
                            >
                              {reply.user.includes("Support") ? (
                                <Leaf className="text-green-500" size={16} />
                              ) : (
                                <MessageCircle
                                  className="text-blue-500"
                                  size={16}
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium">{reply.user}</h4>
                                <span
                                  className={`text-xs ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {formatDate(reply.date)}
                                </span>
                              </div>
                              <p
                                className={`mt-1 text-sm ${
                                  isDarkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {reply.comment}
                              </p>
                              <button
                                onClick={() =>
                                  handleLikeReply(feedback._id, reply.id)
                                }
                                className={`flex items-center gap-1 mt-1 text-sm transition-all duration-300 ${
                                  isDarkMode
                                    ? "text-gray-400 hover:text-red-400"
                                    : "text-gray-500 hover:text-red-500"
                                } hover:scale-110`}
                              >
                                <ThumbsUp size={14} className="fill-current" />
                                <span>{reply.likes || 0}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          ))}

          {feedbackList.length === 0 && (
            <div
              className={`p-8 text-center rounded-xl ${
                isDarkMode
                  ? "bg-gray-800/70 backdrop-blur-md border border-gray-700/50"
                  : "bg-white/40 backdrop-blur-md border border-white/50 shadow-lg"
              }`}
            >
              <p className="text-lg">
                No feedback yet. Be the first to share your FoodSync experience!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;