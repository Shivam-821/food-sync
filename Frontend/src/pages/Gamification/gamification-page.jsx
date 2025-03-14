"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Crown,
  Trophy,
  Star,
  Award,
  Gift,
  ArrowUp,
  ArrowDown,
  Info,
  User,
  ShoppingBag,
  Truck,
  Recycle,
  ChevronRight,
  Zap,
  Heart,
  Sparkles,
  X,
  Home,
  Settings,
  Gamepad2,
  Medal,
  Flame,
} from "lucide-react";

// Styles directly in component
const styles = {
  gradientBg:
    "min-h-screen bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 text-white",
  header: "p-20 pl--5 md:p-6 flex justify-between items-center",
  logo: "flex items-center gap-2",
  logoText:
    "pl-15 text-3xl font-bold tracking-wider bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text",
  pointsBadge: "flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full",
  mainContainer: "container p-22 pb-20 pt-0",
  tabContainer: "bg-black/20 rounded-full p-1 flex",
  tabButton: "px-4 py-2 rounded-full",
  activeTab: "bg-purple-500",
  card: "bg-black/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl",
  cardHeader: "p-6 flex justify-between items-center",
  cardTitle: "text-2xl font-bold",
  leaderboardContainer: "max-w-5xl mx-auto",
  topUsersDesktop:
    "hidden md:flex justify-center items-end py-8 px-4 gap-8 relative",
  topUsersMobile:
    "flex md:hidden justify-center items-end py-8 px-4 gap-4 relative",
  firstPlace: "flex flex-col items-center -mt-6",
  secondPlace: "flex flex-col items-center",
  thirdPlace: "flex flex-col items-center",
  crownIcon: "h-8 w-8 text-yellow-400 mb-1",
  userAvatar: "rounded-full object-cover border-2 border-white/50",
  userRankBadge:
    "absolute -bottom-1 -right-1 rounded-full flex items-center justify-center text-xs font-bold",
  userName: "mt-2 font-medium",
  currentRankBar: "mx-6 mb-6",
  currentRankContainer:
    "flex justify-between items-center px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm",
  userListContainer: "px-6 pb-6 space-y-4",
  userListItem: "flex items-center justify-between",
  userInfo: "flex items-center gap-3",
  userTypeIcon:
    "absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center",
  badgeIndicator: "flex items-center gap-1 text-xs text-purple-300",
  rankNumber: "font-bold",
  trendIndicator:
    "w-6 h-6 rounded-full bg-black/20 flex items-center justify-center",
  badgesGrid: "grid grid-cols-2 md:grid-cols-5 gap-4",
  badgeCard: "p-4 rounded-2xl flex flex-col items-center",
  badgeIcon: "w-16 h-16 rounded-full flex items-center justify-center mb-3",
  badgeName: "font-bold text-center",
  badgeLockedText: "text-xs text-gray-400 mt-1",
  rulesContainer: "mt-8 bg-black/20 rounded-xl p-4",
  rulesList: "space-y-2 text-sm",
  ruleItem: "flex items-start gap-2",
  ruleBullet: "min-w-5 mt-0.5",
  ruleBulletInner:
    "w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center",
  gamesGrid: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
  gameCard: "p-4 rounded-2xl flex flex-col",
  gameHeader: "flex justify-between items-start mb-3",
  gameTitle: "font-bold text-lg",
  gamePoints: "bg-purple-500/30 px-2 py-1 rounded-full text-xs",
  gameDescription: "text-sm mb-4",
  gameContainer:
    "relative w-full h-64 md:h-96 bg-black/30 rounded-xl overflow-hidden",
  gameScore: "absolute top-2 left-2 bg-black/50 px-3 py-1 rounded-full text-sm",
  gameTarget:
    "absolute rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center cursor-pointer",
  gameStartScreen: "h-full flex flex-col items-center justify-center",
  gameButton:
    "px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full",
  rewardsGrid: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
  rewardCard: "p-4 rounded-2xl",
  rewardHeader: "flex justify-between items-start mb-2",
  rewardTitle: "font-bold",
  rewardPoints: "bg-purple-500/30 px-2 py-1 rounded-full text-xs",
  rewardDescription: "text-sm mb-3",
  rewardButton: "px-3 py-1 rounded-full text-sm",
  modalOverlay:
    "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4",
  modalContent:
    "bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto",
  modalHeader: "flex justify-between items-center mb-4",
  modalTitle: "text-xl font-bold",
  modalCloseButton:
    "w-8 h-8 rounded-full bg-black/20 flex items-center justify-center",
  achievementNotification:
    "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg z-50",
  sideNavigation:
    "hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-20 bg-black/40 backdrop-blur-md p-4 items-center justify-between",
  sideNavTop: "flex flex-col items-center gap-8",
  sideNavButton: "w-12 h-12 rounded-full flex items-center justify-center",
  bottomNavigation:
    "fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md p-2 lg:hidden",
  bottomNavContainer: "max-w-md mx-auto flex justify-around",
  bottomNavButton: "p-2 rounded-full",
  dashboardGrid: "pb-2 grid md:grid-cols-2 lg:grid-cols-3 gap-6",
  statCard: "bg-black/30 rounded-2xl p-6 flex flex-col",
  statValue: "text-3xl font-bold mb-2",
  statLabel: "text-sm text-gray-300",
  activityFeed: "bg-black/30 rounded-2xl p-6 md:col-span-2 lg:col-span-3",
  activityTitle: "text-xl font-bold mb-4",
  activityList: "space-y-4",
  activityItem: "flex items-center gap-3 p-3 rounded-xl bg-black/20",
  activityIcon:
    "w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center",
  activityContent: "flex-1",
  activityTime: "text-xs text-gray-400",
  gameFullscreen:
    "fixed inset-0 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-md z-50 flex flex-col",
  //gameHeader: "p-4 flex justify-between items-center",
  gameCloseButton:
    "w-10 h-10 rounded-full bg-black/30 flex items-center justify-center",
  gameArea: "flex-1 flex items-center justify-center p-4",
  gameCanvas:
    "w-full max-w-4xl h-[70vh] bg-black/40 rounded-2xl relative overflow-hidden",
  gameControls: "p-4 flex justify-center gap-4",
  gameControlButton:
    "px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold",
  gameStats:
    "absolute top-4 left-4 bg-black/50 px-4 py-2 rounded-full flex items-center gap-4",
  gameStat: "flex items-center gap-2",
  gameStatValue: "font-bold",
  gameStatLabel: "text-xs text-gray-300",
  gameObstacle: "absolute bg-red-500/70 rounded-md",
  gameBonus:
    "absolute w-8 h-8 rounded-full bg-yellow-400/80 flex items-center justify-center",
  gamePlayer:
    "absolute w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2",
  gameOver:
    "absolute inset-0 bg-black/80 flex flex-col items-center justify-center",
  gameOverTitle: "text-3xl font-bold mb-4",
  gameOverScore: "text-5xl font-bold mb-8 text-purple-300",
  gameOverButton:
    "px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold",
};

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "MS Dhoni",
    points: 345,
    rank: 1,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7j6mL533jU7usHOMiBJ8UNCdYdyxLu_Ui4IXR7OGeLfGUx4G-klkMWVbzrwoOtjS-g88w2go4szBPBSeRYQInIg",
    userType: "Producer",
    badge: "Legend",
    trend: "up",
  },
  {
    id: 2,
    name: "Virat Kohli",
    points: 320,
    rank: 2,
    avatar:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQa8HIBFrNwaUdPwbghe_eSCqIkiZ6jvmUHBuv2RWyLbLqyOGK3E44SP5BwVivu7LAjBIxAts7UTTTtkl4",
    userType: "Cricketer",
    badge: "Want IPL trophy",
    trend: "up",
  },
  {
    id: 3,
    name: "Rohit Sharma",
    points: 310,
    rank: 3,
    avatar:
      "https://c.ndtvimg.com/2025-03/v6v8b1p8_rohit-sharma_625x300_10_March_25.jpeg?im=FeatureCrop,algorithm=dnn,width=806,height=605",
    userType: "Cricketer",
    badge: "Champion",
    trend: "up",
  },
  {
    id: 4,
    name: "Sahin Tendulkar",
    points: 290,
    rank: 4,
    avatar:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTNfjZvad4UWEGaV6Isv_wkgSqIDNfG3K6Z7eVCjBu60IyIBpq0pYpyVckAXApjuHE-Tno58HPik0rMQUxysUjXxA",
    userType: "Producer",
    badge: "Achiever",
    trend: "up",
  },
  {
    id: 5,
    name: "Hardik Pandya",
    points: 275,
    rank: 5,
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/f/fc/Hardik_Pandya_in_PMO_New_Delhi.jpg",
    userType: "Consumer",
    badge: "Achiever",
    trend: "down",
  },
  {
    id: 6,
    name: "Rishabh Pant",
    points: 260,
    rank: 6,
    avatar:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bcci.tv%2Finternational%2Fmen%2Fplayers%2Frishabh-pant%2F18&psig=AOvVaw0CdsSZoonBKRDjfIO6Un9f&ust=1741983069730000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKiozI_vh4wDFQAAAAAdAAAAABAE",
    userType: "UpcyclingIndustry",
    badge: "Contributor",
    trend: "up",
  },
  {
    id: 7,
    name: "Annette Black",
    points: 245,
    rank: 7,
    avatar: "/placeholder.svg?height=100&width=100",
    userType: "Producer",
    badge: "Contributor",
    trend: "up",
  },
  {
    id: 8,
    name: "Ralph Edwards",
    points: 230,
    rank: 8,
    avatar: "/placeholder.svg?height=100&width=100",
    userType: "Consumer",
    badge: "Beginner",
    trend: "down",
  },
  {
    id: 9,
    name: "Current User",
    points: 239,
    rank: 6,
    avatar: "/placeholder.svg?height=100&width=100",
    userType: "Consumer",
    badge: "Contributor",
    trend: "up",
  },
];

// Recent activity data
const recentActivity = [
  {
    id: 1,
    user: "You",
    action: "Completed a mini-game",
    points: "+10",
    time: "2 minutes ago",
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Reached Legend badge",
    points: "",
    time: "10 minutes ago",
    icon: <Crown className="h-5 w-5" />,
  },
  {
    id: 3,
    user: "You",
    action: "Made a purchase",
    points: "+15",
    time: "1 hour ago",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    id: 4,
    user: "Sam Black",
    action: "Listed a new product",
    points: "+20",
    time: "2 hours ago",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    id: 5,
    user: "You",
    action: "Wrote a product review",
    points: "+5",
    time: "Yesterday",
    icon: <Star className="h-5 w-5" />,
  },
];

// Badge colors and icons
const badgeConfig = {
  Beginner: { color: "#64B5F6", icon: <Star className="h-4 w-4" /> },
  Contributor: { color: "#81C784", icon: <Award className="h-4 w-4" /> },
  Achiever: { color: "#FFD54F", icon: <Zap className="h-4 w-4" /> },
  Champion: { color: "#FF8A65", icon: <Trophy className="h-4 w-4" /> },
  Legend: { color: "#BA68C8", icon: <Crown className="h-4 w-4" /> },
};

// User type icons
const userTypeIcons = {
  Consumer: <ShoppingBag className="h-4 w-4" />,
  Producer: <Truck className="h-4 w-4" />,
  UpcyclingIndustry: <Recycle className="h-4 w-4" />,
};

const GamificationPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showRules, setShowRules] = useState(false);
  const [currentUser, setCurrentUser] = useState(mockUsers[8]);
  const [topUsers, setTopUsers] = useState(mockUsers.slice(0, 3));
  const [otherUsers, setOtherUsers] = useState(mockUsers.slice(3, 8));
  const [isMobile, setIsMobile] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameTarget, setGameTarget] = useState({ x: 50, y: 50 });
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState("");
  const [showFullscreenGame, setShowFullscreenGame] = useState(false);
  const [advancedGameActive, setAdvancedGameActive] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [obstacles, setObstacles] = useState([]);
  const [bonuses, setBonuses] = useState([]);
  const [advancedGameScore, setAdvancedGameScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameLevel, setGameLevel] = useState(1);
  const gameAreaRef = useRef(null);
  const playerRef = useRef(null);
  const gameLoopRef = useRef(null);
  const obstacleLoopRef = useRef(null);
  const bonusLoopRef = useRef(null);

  // Check screen size for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger confetti effect when user reaches top 3
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Show achievement notification
  const showAchievementNotification = (message) => {
    setAchievementMessage(message);
    setShowAchievement(true);
    setTimeout(() => {
      setShowAchievement(false);
    }, 3000);
  };

  // Mini-game logic
  const startGame = () => {
    setGameActive(true);
    setGameScore(0);
    moveTarget();
  };

  const moveTarget = () => {
    if (gameActive) {
      setGameTarget({
        x: Math.floor(Math.random() * 80) + 10,
        y: Math.floor(Math.random() * 80) + 10,
      });
    }
  };

  const hitTarget = () => {
    if (gameActive) {
      setGameScore((prev) => prev + 10);
      moveTarget();

      // End game after 10 hits
      if (gameScore + 10 >= 100) {
        endGame();
      }
    }
  };

  const endGame = () => {
    setGameActive(false);

    // Award points based on score
    const pointsEarned = Math.floor(gameScore / 10);
    const newPoints = currentUser.points + pointsEarned;

    setCurrentUser((prev) => ({
      ...prev,
      points: newPoints,
    }));

    showAchievementNotification(
      `You earned ${pointsEarned} points from the mini-game!`
    );

    // Check if user moved up in rank
    if (pointsEarned > 0) {
      setTimeout(() => {
        triggerConfetti();
      }, 500);
    }
  };

  // Advanced game logic
  const startAdvancedGame = () => {
    setAdvancedGameActive(true);
    setAdvancedGameScore(0);
    setLives(3);
    setGameOver(false);
    setGameLevel(1);
    setPlayerPosition({ x: 50, y: 50 });
    setObstacles([]);
    setBonuses([]);

    // Start game loops
    startGameLoop();
    startObstacleLoop();
    startBonusLoop();
  };

  const startGameLoop = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);

    gameLoopRef.current = setInterval(() => {
      if (!advancedGameActive) return;

      // Check collisions with obstacles
      obstacles.forEach((obstacle) => {
        if (
          playerPosition.x > obstacle.x - 6 &&
          playerPosition.x < obstacle.x + obstacle.width + 6 &&
          playerPosition.y > obstacle.y - 6 &&
          playerPosition.y < obstacle.y + obstacle.height + 6
        ) {
          handleObstacleCollision();
        }
      });

      // Check collisions with bonuses
      bonuses.forEach((bonus, index) => {
        if (
          playerPosition.x > bonus.x - 10 &&
          playerPosition.x < bonus.x + 10 &&
          playerPosition.y > bonus.y - 10 &&
          playerPosition.y < bonus.y + 10
        ) {
          handleBonusCollision(index);
        }
      });

      // Increase score over time
      setAdvancedGameScore((prev) => prev + 1);

      // Level up based on score
      const newLevel = Math.floor(advancedGameScore / 500) + 1;
      if (newLevel > gameLevel) {
        setGameLevel(newLevel);
        showAchievementNotification(`Level ${newLevel}! Speed increased!`);
      }
    }, 100);
  };

  const startObstacleLoop = () => {
    if (obstacleLoopRef.current) clearInterval(obstacleLoopRef.current);

    obstacleLoopRef.current = setInterval(() => {
      if (!advancedGameActive) return;

      // Add new obstacle
      const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let newObstacle;

      if (side === 0) {
        // top
        newObstacle = {
          x: Math.random() * 100,
          y: 0,
          width: 10 + Math.random() * 20,
          height: 5 + Math.random() * 10,
          speedX: (Math.random() - 0.5) * 2 * gameLevel,
          speedY: (0.5 + Math.random() * 0.5) * gameLevel,
        };
      } else if (side === 1) {
        // right
        newObstacle = {
          x: 100,
          y: Math.random() * 100,
          width: 5 + Math.random() * 10,
          height: 10 + Math.random() * 20,
          speedX: -(0.5 + Math.random() * 0.5) * gameLevel,
          speedY: (Math.random() - 0.5) * 2 * gameLevel,
        };
      } else if (side === 2) {
        // bottom
        newObstacle = {
          x: Math.random() * 100,
          y: 100,
          width: 10 + Math.random() * 20,
          height: 5 + Math.random() * 10,
          speedX: (Math.random() - 0.5) * 2 * gameLevel,
          speedY: -(0.5 + Math.random() * 0.5) * gameLevel,
        };
      } else {
        // left
        newObstacle = {
          x: 0,
          y: Math.random() * 100,
          width: 5 + Math.random() * 10,
          height: 10 + Math.random() * 20,
          speedX: (0.5 + Math.random() * 0.5) * gameLevel,
          speedY: (Math.random() - 0.5) * 2 * gameLevel,
        };
      }

      setObstacles((prev) => [...prev, newObstacle]);

      // Move existing obstacles
      setObstacles((prev) =>
        prev
          .map((obstacle) => ({
            ...obstacle,
            x: obstacle.x + obstacle.speedX,
            y: obstacle.y + obstacle.speedY,
          }))
          .filter(
            (obstacle) =>
              obstacle.x > -20 &&
              obstacle.x < 120 &&
              obstacle.y > -20 &&
              obstacle.y < 120
          )
      );
    }, 1000 / gameLevel);
  };

  const startBonusLoop = () => {
    if (bonusLoopRef.current) clearInterval(bonusLoopRef.current);

    bonusLoopRef.current = setInterval(() => {
      if (!advancedGameActive) return;

      // Add new bonus if there are less than 3
      if (bonuses.length < 3) {
        const newBonus = {
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
          type: Math.random() > 0.7 ? "life" : "points",
        };

        setBonuses((prev) => [...prev, newBonus]);
      }
    }, 3000);
  };

  const handleObstacleCollision = () => {
    setLives((prev) => prev - 1);
    showAchievementNotification("Ouch! You lost a life!");

    if (lives <= 1) {
      endAdvancedGame();
    }
  };

  const handleBonusCollision = (index) => {
    const bonus = bonuses[index];

    if (bonus.type === "life") {
      setLives((prev) => prev + 1);
      showAchievementNotification("Extra life gained!");
    } else {
      setAdvancedGameScore((prev) => prev + 50);
      showAchievementNotification("+50 points!");
    }

    setBonuses((prev) => prev.filter((_, i) => i !== index));
  };

  const endAdvancedGame = () => {
    setAdvancedGameActive(false);
    setGameOver(true);

    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (obstacleLoopRef.current) clearInterval(obstacleLoopRef.current);
    if (bonusLoopRef.current) clearInterval(bonusLoopRef.current);

    // Award points based on score
    const pointsEarned = Math.floor(advancedGameScore / 50);
    const newPoints = currentUser.points + pointsEarned;

    setCurrentUser((prev) => ({
      ...prev,
      points: newPoints,
    }));
  };

  const handleMouseMove = (e) => {
    if (!advancedGameActive || !gameAreaRef.current) return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPlayerPosition({ x, y });
  };

  const handleTouchMove = (e) => {
    if (!advancedGameActive || !gameAreaRef.current) return;

    const touch = e.touches[0];
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;

    setPlayerPosition({ x, y });
  };

  // Clean up game loops on unmount
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (obstacleLoopRef.current) clearInterval(obstacleLoopRef.current);
      if (bonusLoopRef.current) clearInterval(bonusLoopRef.current);
    };
  }, []);

  return (
    <div className={styles.gradientBg}>
      {/* Side Navigation (Desktop) */}
      <div className={styles.sideNavigation}>
        <div className={styles.sideNavTop}>
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Trophy className="h-8 w-8 text-yellow-400" />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${styles.sideNavButton} ${
              activeTab === "dashboard" ? "bg-purple-500/30" : "bg-black/20"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <Home
              className={`h-6 w-6 ${
                activeTab === "dashboard" ? "text-purple-300" : "text-gray-400"
              }`}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${styles.sideNavButton} ${
              activeTab === "leaderboard" ? "bg-purple-500/30" : "bg-black/20"
            }`}
            onClick={() => setActiveTab("leaderboard")}
          >
            <Trophy
              className={`h-6 w-6 ${
                activeTab === "leaderboard"
                  ? "text-purple-300"
                  : "text-gray-400"
              }`}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${styles.sideNavButton} ${
              activeTab === "badges" ? "bg-purple-500/30" : "bg-black/20"
            }`}
            onClick={() => setActiveTab("badges")}
          >
            <Award
              className={`h-6 w-6 ${
                activeTab === "badges" ? "text-purple-300" : "text-gray-400"
              }`}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${styles.sideNavButton} ${
              activeTab === "games" ? "bg-purple-500/30" : "bg-black/20"
            }`}
            onClick={() => setActiveTab("games")}
          >
            <Gamepad2
              className={`h-6 w-6 ${
                activeTab === "games" ? "text-purple-300" : "text-gray-400"
              }`}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${styles.sideNavButton} ${
              activeTab === "rewards" ? "bg-purple-500/30" : "bg-black/20"
            }`}
            onClick={() => setActiveTab("rewards")}
          >
            <Gift
              className={`h-6 w-6 ${
                activeTab === "rewards" ? "text-purple-300" : "text-gray-400"
              }`}
            />
          </motion.button>
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className={styles.sideNavButton}
        >
          <Settings className="h-6 w-6 text-gray-400" />
        </motion.div>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <h1 className={styles.logoText}>FoodSync</h1>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={styles.pointsBadge}
          >
            <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
            <span className="font-bold">{currentUser.points}</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center"
          >
            <User className="h-6 w-6" />
          </motion.div>
        </div>
      </header>

      {/* Navigation Tabs (Mobile/Tablet) */}
      <div className="flex justify-center mb-6 px-4 md:hidden">
        <div className={styles.tabContainer}>
          {["dashboard", "leaderboard", "badges", "games", "rewards"].map(
            (tab) => (
              <motion.button
                key={tab}
                className={`${styles.tabButton} ${
                  activeTab === tab ? styles.activeTab : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            )
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className={styles.mainContainer}>
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Your Dashboard</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-purple-300">Level 2</span>
                    <div className="w-32 h-2 bg-black/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Stats Overview */}
                  <div className={styles.dashboardGrid}>
                    <motion.div
                      className={styles.statCard}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={styles.statValue}>
                        {currentUser.points}
                      </div>
                      <div className={styles.statLabel}>Total Points</div>
                      <div className="mt-4 text-xs text-green-400 flex items-center gap-1">
                        <ArrowUp className="h-3 w-3" /> 15% from last week
                      </div>
                    </motion.div>

                    <motion.div
                      className={styles.statCard}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={styles.statValue}>{currentUser.rank}</div>
                      <div className={styles.statLabel}>Current Rank</div>
                      <div className="mt-4 text-xs text-green-400 flex items-center gap-1">
                        <ArrowUp className="h-3 w-3" /> Up 2 positions
                      </div>
                    </motion.div>

                    <motion.div
                      className={styles.statCard}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={styles.statValue}>
                        {currentUser.badge}
                      </div>
                      <div className={styles.statLabel}>Current Badge</div>
                      <div className="mt-4 text-xs text-purple-300">
                        261 points to next badge
                      </div>
                    </motion.div>
                  </div>

                  {/* Recent Activity */}
                  <div className={styles.activityFeed}>
                    <h3 className={styles.activityTitle}>Recent Activity</h3>
                    <div className={styles.activityList}>
                      {recentActivity.map((activity) => (
                        <motion.div
                          key={activity.id}
                          className={styles.activityItem}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: activity.id * 0.1 }}
                        >
                          <div className={styles.activityIcon}>
                            {activity.icon}
                          </div>
                          <div className={styles.activityContent}>
                            <div className="flex justify-between">
                              <div>
                                <span className="font-bold">
                                  {activity.user}
                                </span>
                                <span> {activity.action}</span>
                              </div>
                              {activity.points && (
                                <span className="text-green-400 font-bold">
                                  {activity.points}
                                </span>
                              )}
                            </div>
                            <div className={styles.activityTime}>
                              {activity.time}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center gap-3"
                      onClick={() => {
                        setShowFullscreenGame(true);
                        setActiveTab("games");
                      }}
                    >
                      <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                        <Gamepad2 className="h-6 w-6 text-purple-300" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">Play Mini-Game</div>
                        <div className="text-sm text-gray-300">
                          Earn up to 20 points
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center gap-3"
                      onClick={() => setActiveTab("rewards")}
                    >
                      <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                        <Gift className="h-6 w-6 text-purple-300" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">Redeem Rewards</div>
                        <div className="text-sm text-gray-300">
                          Use your points for rewards
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.leaderboardContainer}
            >
              <div className={styles.card}>
                {/* Leaderboard Header */}
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Leaderboard</h2>
                  <button
                    onClick={() => setShowRules(!showRules)}
                    className="flex items-center gap-1 text-sm text-purple-300 hover:text-purple-200"
                  >
                    How it Works <Info className="h-4 w-4" />
                  </button>
                </div>

                {/* Top 3 Users - Desktop */}
                <div className={styles.topUsersDesktop}>
                  {/* Background starburst effect */}
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-500 opacity-20 rounded-full blur-xl"></div>
                    <motion.div
                      className="absolute w-full h-full"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-32 bg-purple-400/30 left-1/2 top-1/2"
                          style={{
                            transform: `translate(-50%, -50%) rotate(${
                              i * 30
                            }deg) translateY(-120px)`,
                          }}
                        ></div>
                      ))}
                    </motion.div>
                  </div>

                  {/* 2nd Place */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={styles.secondPlace}
                  >
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <img
                          src={topUsers[1].avatar || "/placeholder.svg"}
                          alt={topUsers[1].name}
                          className="w-20 h-20 rounded-full object-cover border-2 border-white/50"
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-lg font-medium">
                      {topUsers[1].name}
                    </p>
                    <p className="text-purple-300">
                      {topUsers[1].points} points
                    </p>
                  </motion.div>

                  {/* 1st Place */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={styles.firstPlace}
                  >
                    <motion.div
                      initial={{ y: -5 }}
                      animate={{ y: 5 }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <Crown className="h-10 w-10 text-yellow-400 mb-2" />
                    </motion.div>
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-1 flex items-center justify-center">
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-lg font-bold">
                          1
                        </div>
                        <img
                          src={topUsers[0].avatar || "/placeholder.svg"}
                          alt={topUsers[0].name}
                          className="w-full h-full rounded-full object-cover border-2 border-white/50"
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-xl font-bold">{topUsers[0].name}</p>
                    <p className="text-purple-300">
                      {topUsers[0].points} points
                    </p>
                  </motion.div>

                  {/* 3rd Place */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={styles.thirdPlace}
                  >
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <img
                          src={topUsers[2].avatar || "/placeholder.svg"}
                          alt={topUsers[2].name}
                          className="w-20 h-20 rounded-full object-cover border-2 border-white/50"
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-lg font-medium">
                      {topUsers[2].name}
                    </p>
                    <p className="text-purple-300">
                      {topUsers[2].points} points
                    </p>
                  </motion.div>
                </div>

                {/* Top 3 Users - Mobile */}
                <div className={styles.topUsersMobile}>
                  {/* Background starburst effect */}
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="w-64 h-64 bg-gradient-to-r from-purple-600 to-pink-500 opacity-20 rounded-full blur-xl"></div>
                    <motion.div
                      className="absolute w-full h-full"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-20 bg-purple-400/30 left-1/2 top-1/2"
                          style={{
                            transform: `translate(-50%, -50%) rotate(${
                              i * 45
                            }deg) translateY(-80px)`,
                          }}
                        ></div>
                      ))}
                    </motion.div>
                  </div>

                  {/* 2nd Place */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <img
                          src={topUsers[1].avatar || "/placeholder.svg"}
                          alt={topUsers[1].name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white/50"
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium">
                      {topUsers[1].name}
                    </p>
                  </motion.div>

                  {/* 1st Place */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col items-center -mt-6"
                  >
                    <motion.div
                      initial={{ y: -5 }}
                      animate={{ y: 5 }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <Crown className="h-8 w-8 text-yellow-400 mb-1" />
                    </motion.div>
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-1 flex items-center justify-center">
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <img
                          src={topUsers[0].avatar || "/placeholder.svg"}
                          alt={topUsers[0].name}
                          className="w-full h-full rounded-full object-cover border-2 border-white/50"
                        />
                      </div>
                    </div>
                    <p className="mt-2 font-medium">{topUsers[0].name}</p>
                  </motion.div>

                  {/* 3rd Place */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <img
                          src={topUsers[2].avatar || "/placeholder.svg"}
                          alt={topUsers[2].name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white/50"
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium">
                      {topUsers[2].name}
                    </p>
                  </motion.div>
                </div>

                {/* Current User Rank */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={styles.currentRankBar}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-1">
                    <div className={styles.currentRankContainer}>
                      <div className="flex items-center gap-3">
                        <img
                          src={currentUser.avatar || "/placeholder.svg"}
                          alt="Your avatar"
                          className="w-8 h-8 rounded-full object-cover border border-white/50"
                        />
                        <span>You Currently Rank</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                          {currentUser.points}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <ArrowUp className="h-4 w-4 text-green-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Other Users */}
                <div className={styles.userListContainer}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {otherUsers.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                        className={styles.userListItem}
                      >
                        <div className={styles.userInfo}>
                          <div className="relative">
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover border border-white/30"
                            />
                            <div className={styles.userTypeIcon}>
                              {userTypeIcons[user.userType]}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <div className={styles.badgeIndicator}>
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    badgeConfig[user.badge].color,
                                }}
                              ></div>
                              <span>{user.badge}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={styles.rankNumber}>{user.rank}</span>
                          <div className={styles.trendIndicator}>
                            {user.trend === "up" ? (
                              <ArrowUp className="h-4 w-4 text-green-400" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "badges" && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Your Badges</h2>
                  <div className="text-sm text-purple-300">
                    2/5 Badges Unlocked
                  </div>
                </div>

                <div className="p-6">
                  <div className={styles.badgesGrid}>
                    {Object.entries(badgeConfig).map(
                      ([badge, config], index) => {
                        const isEarned = ["Beginner", "Contributor"].includes(
                          badge
                        );
                        return (
                          <motion.div
                            key={badge}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`${styles.badgeCard} ${
                              isEarned
                                ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30"
                                : "bg-black/20"
                            }`}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className={`${styles.badgeIcon} ${
                                isEarned
                                  ? "bg-gradient-to-br from-purple-500 to-pink-500"
                                  : "bg-gray-700"
                              }`}
                            >
                              <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center">
                                {React.cloneElement(config.icon, {
                                  className: "h-8 w-8",
                                  style: {
                                    color: isEarned ? config.color : "#666",
                                  },
                                })}
                              </div>
                            </motion.div>
                            <h3 className={styles.badgeName}>{badge}</h3>
                            {!isEarned && (
                              <p className={styles.badgeLockedText}>Locked</p>
                            )}
                          </motion.div>
                        );
                      }
                    )}
                  </div>

                  <div className={styles.rulesContainer}>
                    <h3 className="font-bold mb-2">How to earn badges</h3>
                    <ul className={styles.rulesList}>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>
                          <strong>Beginner</strong>: Join the platform and
                          complete your profile
                        </span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>
                          <strong>Contributor</strong>: Earn 200+ points through
                          platform activities
                        </span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>
                          <strong>Achiever</strong>: Earn 500+ points and
                          complete 10 transactions
                        </span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>
                          <strong>Champion</strong>: Reach top 10 on leaderboard
                          and earn 1000+ points
                        </span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>
                          <strong>Legend</strong>: Reach top 3 on leaderboard
                          and maintain position for 30 days
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "games" && (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Mini Games</h2>
                  <div className="text-sm text-purple-300">
                    Earn points while having fun!
                  </div>
                </div>

                <div className="p-6">
                  <div className={styles.gamesGrid}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`${styles.gameCard} bg-gradient-to-br from-purple-500/30 to-pink-500/30`}
                    >
                      <div className={styles.gameHeader}>
                        <h3 className={styles.gameTitle}>Eco Dodger</h3>
                        <div className={styles.gamePoints}>
                          Earn up to 50 points
                        </div>
                      </div>
                      <p className={styles.gameDescription}>
                        Navigate through obstacles and collect eco-friendly
                        bonuses to earn points!
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={styles.gameButton}
                        onClick={() => setShowFullscreenGame(true)}
                      >
                        Play Now
                      </motion.button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`${styles.gameCard} bg-gradient-to-br from-purple-500/30 to-pink-500/30`}
                    >
                      <div className={styles.gameHeader}>
                        <h3 className={styles.gameTitle}>Target Clicker</h3>
                        <div className={styles.gamePoints}>
                          Earn up to 10 points
                        </div>
                      </div>
                      <p className={styles.gameDescription}>
                        Click on the moving targets as quickly as possible to
                        earn points!
                      </p>

                      {showMiniGame ? (
                        <div className={styles.gameContainer}>
                          {gameActive ? (
                            <>
                              <div className={styles.gameScore}>
                                Score: {gameScore}
                              </div>
                              <motion.div
                                className={styles.gameTarget}
                                style={{
                                  left: `${gameTarget.x}%`,
                                  top: `${gameTarget.y}%`,
                                  width: "48px",
                                  height: "48px",
                                  transform: "translate(-50%, -50%)",
                                }}
                                animate={{
                                  scale: [1, 1.1, 1],
                                }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Number.POSITIVE_INFINITY,
                                }}
                                onClick={hitTarget}
                              >
                                <Sparkles className="h-6 w-6 text-white" />
                              </motion.div>
                            </>
                          ) : (
                            <div className={styles.gameStartScreen}>
                              <p className="mb-4 text-center">
                                {gameScore > 0
                                  ? `You scored ${gameScore} points!`
                                  : "Click to start the game"}
                              </p>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={styles.gameButton}
                                onClick={startGame}
                              >
                                {gameScore > 0 ? "Play Again" : "Start Game"}
                              </motion.button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={styles.gameButton}
                          onClick={() => setShowMiniGame(true)}
                        >
                          Play Now
                        </motion.button>
                      )}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`${styles.gameCard} bg-black/20`}
                    >
                      <div className={styles.gameHeader}>
                        <h3 className={styles.gameTitle}>Recycling Quiz</h3>
                        <div className={styles.gamePoints}>
                          Earn up to 20 points
                        </div>
                      </div>
                      <p className={styles.gameDescription}>
                        Test your knowledge about recycling and sustainability!
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-black/30 rounded-full"
                        onClick={() =>
                          showAchievementNotification("Quiz coming soon!")
                        }
                      >
                        Coming Soon
                      </motion.button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`${styles.gameCard} bg-black/20`}
                    >
                      <div className={styles.gameHeader}>
                        <h3 className={styles.gameTitle}>Eco Puzzle</h3>
                        <div className={styles.gamePoints}>
                          Earn up to 15 points
                        </div>
                      </div>
                      <p className={styles.gameDescription}>
                        Solve puzzles related to environmental sustainability
                        and circular economy!
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-black/30 rounded-full"
                        onClick={() =>
                          showAchievementNotification("Puzzle coming soon!")
                        }
                      >
                        Coming Soon
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "rewards" && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Rewards</h2>
                  <div className="text-sm text-purple-300">
                    Available Points: {currentUser.points}
                  </div>
                </div>

                <div className="p-6">
                  <div className={styles.rewardsGrid}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`${styles.rewardCard} bg-gradient-to-br from-purple-500/30 to-pink-500/30`}
                    >
                      <div className={styles.rewardHeader}>
                        <h3 className={styles.rewardTitle}>
                          10% Discount Coupon
                        </h3>
                        <div className={styles.rewardPoints}>200 points</div>
                      </div>
                      <p className={styles.rewardDescription}>
                        Get 10% off on your next purchase
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${styles.rewardButton} bg-gradient-to-r from-purple-500 to-pink-500`}
                        onClick={() =>
                          showAchievementNotification("Not enough points!")
                        }
                      >
                        Redeem
                      </motion.button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`${styles.rewardCard} bg-black/20`}
                    >
                      <div className={styles.rewardHeader}>
                        <h3 className={styles.rewardTitle}>Free Shipping</h3>
                        <div className={styles.rewardPoints}>150 points</div>
                      </div>
                      <p className={styles.rewardDescription}>
                        Free shipping on your next order
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${styles.rewardButton} bg-black/30`}
                        onClick={() =>
                          showAchievementNotification("Not enough points!")
                        }
                      >
                        Redeem
                      </motion.button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`${styles.rewardCard} bg-black/20`}
                    >
                      <div className={styles.rewardHeader}>
                        <h3 className={styles.rewardTitle}>Premium Badge</h3>
                        <div className={styles.rewardPoints}>500 points</div>
                      </div>
                      <p className={styles.rewardDescription}>
                        Exclusive profile badge visible to all users
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${styles.rewardButton} bg-black/30`}
                        onClick={() =>
                          showAchievementNotification("Not enough points!")
                        }
                      >
                        Redeem
                      </motion.button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`${styles.rewardCard} bg-black/20`}
                    >
                      <div className={styles.rewardHeader}>
                        <h3 className={styles.rewardTitle}>Tree Planting</h3>
                        <div className={styles.rewardPoints}>300 points</div>
                      </div>
                      <p className={styles.rewardDescription}>
                        We'll plant a tree in your name
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${styles.rewardButton} bg-black/30`}
                        onClick={() =>
                          showAchievementNotification("Not enough points!")
                        }
                      >
                        Redeem
                      </motion.button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`${styles.rewardCard} bg-black/20`}
                    >
                      <div className={styles.rewardHeader}>
                        <h3 className={styles.rewardTitle}>
                          Eco-Friendly Product
                        </h3>
                        <div className={styles.rewardPoints}>400 points</div>
                      </div>
                      <p className={styles.rewardDescription}>
                        Receive a sustainable product made from recycled
                        materials
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${styles.rewardButton} bg-black/30`}
                        onClick={() =>
                          showAchievementNotification("Not enough points!")
                        }
                      >
                        Redeem
                      </motion.button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`${styles.rewardCard} bg-black/20`}
                    >
                      <div className={styles.rewardHeader}>
                        <h3 className={styles.rewardTitle}>VIP Access</h3>
                        <div className={styles.rewardPoints}>1000 points</div>
                      </div>
                      <p className={styles.rewardDescription}>
                        Get early access to new features and exclusive content
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${styles.rewardButton} bg-black/30`}
                        onClick={() =>
                          showAchievementNotification("Not enough points!")
                        }
                      >
                        Redeem
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rules Modal */}
        <AnimatePresence>
          {showRules && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.modalOverlay}
              onClick={() => setShowRules(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalTitle}>How Gamification Works</h2>
                  <button
                    onClick={() => setShowRules(false)}
                    className={styles.modalCloseButton}
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-purple-300" /> For
                      Consumers
                    </h3>
                    <ul className={styles.rulesList}>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>+10 points for every purchase</span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>+5 points for writing product reviews</span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>+20 points for referring new users</span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>
                          +15 points for participating in recycling programs
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Truck className="h-5 w-5 text-purple-300" /> For
                      Producers
                    </h3>
                    <ul className={styles.rulesList}>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>+15 points for every product listed</span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>+10 points for each sale</span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>+25 points for using sustainable packaging</span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>
                          +20 points for verified eco-friendly products
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Recycle className="h-5 w-5 text-purple-300" /> For
                      Upcycling Industry
                    </h3>
                    <ul className={styles.rulesList}>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>
                          +20 points for each recycling service offered
                        </span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>+15 points for each material processed</span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>
                          +30 points for innovative upcycling solutions
                        </span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>
                          +25 points for educational content about recycling
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-purple-300" /> Leaderboard
                      Rules
                    </h3>
                    <ul className={styles.rulesList}>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>Leaderboard resets monthly</span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>Top 3 users receive special rewards</span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>
                          Points earned from all activities count towards your
                          rank
                        </span>
                      </li>
                      <li className={styles.ruleItem}>
                        <div className={styles.ruleBullet}>
                          <div className={styles.ruleBulletInner}>
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                        <span>Bonus points for consistent daily activity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Game */}
        <AnimatePresence>
          {showFullscreenGame && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.gameFullscreen}
            >
              <div className={styles.gameHeader}>
                <h2 className="text-2xl font-bold">Eco Dodger</h2>
                <button
                  onClick={() => setShowFullscreenGame(false)}
                  className={styles.gameCloseButton}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className={styles.gameArea}>
                <div
                  ref={gameAreaRef}
                  className={styles.gameCanvas}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                >
                  {advancedGameActive && (
                    <>
                      <div className={styles.gameStats}>
                        <div className={styles.gameStat}>
                          <Flame className="h-5 w-5 text-orange-400" />
                          <span className={styles.gameStatValue}>
                            {advancedGameScore}
                          </span>
                        </div>
                        <div className={styles.gameStat}>
                          <Heart className="h-5 w-5 text-red-400" />
                          <span className={styles.gameStatValue}>{lives}</span>
                        </div>
                        <div className={styles.gameStat}>
                          <Medal className="h-5 w-5 text-yellow-400" />
                          <span className={styles.gameStatValue}>
                            {gameLevel}
                          </span>
                        </div>
                      </div>

                      {/* Player */}
                      <motion.div
                        ref={playerRef}
                        className={styles.gamePlayer}
                        style={{
                          left: `${playerPosition.x}%`,
                          top: `${playerPosition.y}%`,
                        }}
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <Recycle className="h-6 w-6 text-white" />
                      </motion.div>

                      {/* Obstacles */}
                      {obstacles.map((obstacle, index) => (
                        <div
                          key={`obstacle-${index}`}
                          className={styles.gameObstacle}
                          style={{
                            left: `${obstacle.x}%`,
                            top: `${obstacle.y}%`,
                            width: `${obstacle.width}%`,
                            height: `${obstacle.height}%`,
                          }}
                        ></div>
                      ))}

                      {/* Bonuses */}
                      {bonuses.map((bonus, index) => (
                        <motion.div
                          key={`bonus-${index}`}
                          className={styles.gameBonus}
                          style={{
                            left: `${bonus.x}%`,
                            top: `${bonus.y}%`,
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          {bonus.type === "life" ? (
                            <Heart className="h-5 w-5 text-white" />
                          ) : (
                            <Star className="h-5 w-5 text-white" />
                          )}
                        </motion.div>
                      ))}
                    </>
                  )}

                  {gameOver && (
                    <div className={styles.gameOver}>
                      <h3 className={styles.gameOverTitle}>Game Over</h3>
                      <p className={styles.gameOverScore}>
                        {advancedGameScore}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={styles.gameOverButton}
                        onClick={startAdvancedGame}
                      >
                        Play Again
                      </motion.button>
                    </div>
                  )}

                  {!advancedGameActive && !gameOver && (
                    <div className="h-full flex flex-col items-center justify-center">
                      <h3 className="text-2xl font-bold mb-4">Eco Dodger</h3>
                      <p className="max-w-md text-center mb-8">
                        Move your cursor to navigate through obstacles and
                        collect eco-friendly bonuses. Avoid the red obstacles to
                        keep your lives. How long can you survive?
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={styles.gameControlButton}
                        onClick={startAdvancedGame}
                      >
                        Start Game
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.gameControls}>
                {advancedGameActive && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.gameControlButton}
                    onClick={endAdvancedGame}
                  >
                    End Game
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievement Notification */}
        <AnimatePresence>
          {showAchievement && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={styles.achievementNotification}
            >
              <Sparkles className="h-5 w-5" />
              <span>{achievementMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className={styles.bottomNavigation}>
        <div className={styles.bottomNavContainer}>
          {["dashboard", "leaderboard", "badges", "games", "rewards"].map(
            (tab) => (
              <motion.button
                key={tab}
                className={`${styles.bottomNavButton} ${
                  activeTab === tab ? "bg-purple-500/30" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "dashboard" && (
                  <Home
                    className={`h-6 w-6 ${
                      activeTab === tab ? "text-purple-300" : "text-gray-400"
                    }`}
                  />
                )}
                {tab === "leaderboard" && (
                  <Trophy
                    className={`h-6 w-6 ${
                      activeTab === tab ? "text-purple-300" : "text-gray-400"
                    }`}
                  />
                )}
                {tab === "badges" && (
                  <Award
                    className={`h-6 w-6 ${
                      activeTab === tab ? "text-purple-300" : "text-gray-400"
                    }`}
                  />
                )}
                {tab === "games" && (
                  <Gamepad2
                    className={`h-6 w-6 ${
                      activeTab === tab ? "text-purple-300" : "text-gray-400"
                    }`}
                  />
                )}
                {tab === "rewards" && (
                  <Gift
                    className={`h-6 w-6 ${
                      activeTab === tab ? "text-purple-300" : "text-gray-400"
                    }`}
                  />
                )}
              </motion.button>
            )
          )}
        </div>
      </nav>
    </div>
  );
};

export default GamificationPage;
