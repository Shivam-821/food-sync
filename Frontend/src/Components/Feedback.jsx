"use client";
import "./feedback.css";

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

// Sample initial feedback data for FoodSync platform
const initialFeedback = [
  {
    id: 1,
    user: "Green Harvest Restaurant",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment:
      "FoodSync has transformed how we handle surplus food! Instead of throwing away unsold meals, we're now connecting with local shelters. Already donated over 200 meals this month!",
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    likes: 42,
    replies: [
      {
        id: 101,
        user: "FoodSync Support",
        avatar: "/placeholder.svg?height=30&width=30",
        comment:
          "We're thrilled to hear about your success! 200 meals is an incredible impact. Thank you for being part of our mission to reduce food waste.",
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        likes: 15,
      },
    ],
  },
  {
    id: 2,
    user: "Helping Hands NGO",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment:
      "As a shelter serving 100+ people daily, FoodSync has been a game-changer. We're now receiving fresh produce and prepared meals that would otherwise go to waste. Our food costs are down 30%!",
    date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    likes: 38,
    replies: [
      {
        id: 201,
        user: "FarmFresh Market",
        avatar: "/placeholder.svg?height=30&width=30",
        comment:
          "We're happy our surplus produce is going to your shelter! Let's continue this partnership!",
        date: new Date(Date.now() - 86400000 * 4).toISOString(),
        likes: 12,
      },
    ],
  },
  {
    id: 3,
    user: "Campus Dining Services",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    comment:
      "Our university cafeteria has reduced food waste by 45% since joining FoodSync. The analytics dashboard helps us track our environmental impact, which is great for our sustainability reports.",
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    likes: 29,
    replies: [],
  },
  {
    id: 4,
    user: "Community Fridge Network",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment:
      "FoodSync's real-time notifications have made it so much easier to stock our community fridges! When local bakeries have day-old bread or cafes have unsold sandwiches, we get alerted immediately.",
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    likes: 51,
    replies: [
      {
        id: 401,
        user: "Daily Bread Bakery",
        avatar: "/placeholder.svg?height=30&width=30",
        comment:
          "We love being able to donate our extra baked goods at the end of each day. Nothing goes to waste anymore!",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        likes: 18,
      },
    ],
  },
  {
    id: 5,
    user: "Sarah (Individual User)",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment:
      "As a college student on a budget, the FoodSync app has been amazing! I get notifications about discounted food from local restaurants before they close. Saving money and reducing waste!",
    date: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    likes: 33,
    replies: [],
  },
  {
    id: 6,
    user: "GreenPlate Catering",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    comment:
      "After events, we often had leftover food that went to waste. With FoodSync, we now have a network of shelters we can contact immediately. The logistics coordination feature is excellent!",
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
    likes: 27,
    replies: [],
  },
  {
    id: 7,
    user: "Urban Harvest Coalition",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment:
      "We've been connecting urban farms with food banks, and FoodSync has streamlined the entire process. The platform's matching algorithm ensures produce goes to those who need it most.",
    date: new Date(Date.now() - 86400000 * 6).toISOString(),
    likes: 45,
    replies: [
      {
        id: 701,
        user: "City Food Bank",
        avatar: "/placeholder.svg?height=30&width=30",
        comment:
          "The quality of fresh produce we're receiving has improved dramatically. Our clients are getting nutritious food that would have been wasted!",
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
        likes: 22,
      },
    ],
  },
  {
    id: 8,
    user: "Hotel Grand Buffet",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment:
      "Our hotel chain has reduced food waste by 60% using FoodSync! The tax deduction receipts for donations are automatically generated, making it easy for our accounting department.",
    date: new Date(Date.now() - 86400000 * 8).toISOString(),
    likes: 37,
    replies: [],
  },
];

export default function Feedback() {
  // State for feedback data
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ rating: 5, comment: "" });
  const [activeFilter, setActiveFilter] = useState("recent");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState("Guest User");
  const [userType, setUserType] = useState("individual");

  // Load feedback from localStorage on component mount
  useEffect(() => {
    const savedFeedback = localStorage.getItem("feedbackData");
    if (savedFeedback) {
      setFeedbackList(JSON.parse(savedFeedback));
    } else {
      setFeedbackList(initialFeedback);
      localStorage.setItem("feedbackData", JSON.stringify(initialFeedback));
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "true");
    }
  }, []);

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
  const handleSubmitFeedback = (e) => {
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
    localStorage.setItem("feedbackData", JSON.stringify(updatedFeedback));
    setNewFeedback({ rating: 5, comment: "" });
  };

  // Handle liking a feedback
  const handleLike = (id) => {
    const updated = feedbackList.map((item) => {
      if (item.id === id) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    });
    setFeedbackList(updated);
    localStorage.setItem("feedbackData", JSON.stringify(updated));
  };

  // Handle submitting a reply
  const handleReply = (feedbackId) => {
    if (!replyText.trim()) return;

    const updated = feedbackList.map((item) => {
      if (item.id === feedbackId) {
        const newReply = {
          id: Date.now(),
          user: userName + (userType !== "individual" ? ` (${userType})` : ""),
          avatar: "/placeholder.svg?height=30&width=30",
          comment: replyText,
          date: new Date().toISOString(),
          likes: 0,
        };
        return { ...item, replies: [...item.replies, newReply] };
      }
      return item;
    });

    setFeedbackList(updated);
    localStorage.setItem("feedbackData", JSON.stringify(updated));
    setReplyingTo(null);
    setReplyText("");
  };

  // Handle liking a reply
  const handleLikeReply = (feedbackId, replyId) => {
    const updated = feedbackList.map((item) => {
      if (item.id === feedbackId) {
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

  // Filter feedback based on selected filter
  const getFilteredFeedback = () => {
    switch (activeFilter) {
      case "recent":
        return [...feedbackList].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      case "oldest":
        return [...feedbackList].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      case "mostLiked":
        return [...feedbackList].sort((a, b) => b.likes - a.likes);
      case "mostReplies":
        return [...feedbackList].sort(
          (a, b) => b.replies.length - a.replies.length
        );
      case "highestRated":
        return [...feedbackList].sort((a, b) => b.rating - a.rating);
      default:
        return feedbackList;
    }
  };

  // Format date to relative time (e.g., "2 days ago")
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

  // Get animation class based on index (alternating left/right)
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
              key={feedback.id}
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
                  {feedback.user.includes("Restaurant") ||
                  feedback.user.includes("Catering") ||
                  feedback.user.includes("Buffet") ? (
                    <Utensils className="text-green-500" size={24} />
                  ) : feedback.user.includes("NGO") ||
                    feedback.user.includes("Food Bank") ||
                    feedback.user.includes("Shelter") ? (
                    <Heart className="text-red-500" size={24} />
                  ) : (
                    <Apple className="text-green-500" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{feedback.user}</h3>
                      <div className="flex items-center mt-1">
                        {renderStars(feedback.rating)}
                        <span
                          className={`ml-2 text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {formatDate(feedback.date)}
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
                      onClick={() => handleLike(feedback.id)}
                      className={`flex items-center gap-1 transition-all duration-300 ${
                        isDarkMode
                          ? "text-gray-400 hover:text-red-400"
                          : "text-gray-500 hover:text-red-500"
                      } hover:scale-110`}
                    >
                      <Heart size={18} className="fill-current" />
                      <span>{feedback.likes}</span>
                    </button>

                    <button
                      onClick={() =>
                        setReplyingTo(
                          replyingTo === feedback.id ? null : feedback.id
                        )
                      }
                      className={`flex items-center gap-1 transition-all duration-300 ${
                        isDarkMode
                          ? "text-gray-400 hover:text-green-400"
                          : "text-gray-500 hover:text-green-500"
                      } hover:scale-110`}
                    >
                      <MessageCircle size={18} />
                      <span>{feedback.replies.length}</span>
                    </button>
                  </div>

                  {/* Reply form */}
                  {replyingTo === feedback.id && (
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
                          onClick={() => handleReply(feedback.id)}
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
                  {feedback.replies.length > 0 && (
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
                                  handleLikeReply(feedback.id, reply.id)
                                }
                                className={`flex items-center gap-1 mt-1 text-sm transition-all duration-300 ${
                                  isDarkMode
                                    ? "text-gray-400 hover:text-red-400"
                                    : "text-gray-500 hover:text-red-500"
                                } hover:scale-110`}
                              >
                                <ThumbsUp size={14} className="fill-current" />
                                <span>{reply.likes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
}
