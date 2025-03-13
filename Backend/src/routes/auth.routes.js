import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { Consumer } from "../models/consumer.models.js"; // Adjust the import path as needed

// Initialize the router
const router = express.Router();

// Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    try {
      // Generate JWT
      const token = jwt.sign(
        {
          _id: req.user._id,
          email: req.user.email,
          phone: req.user.phone || "", // Handle optional fields
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
      );

      // Redirect to frontend with token
      res.redirect(`http://localhost:5173/auth-success?token=${token}`);
    } catch (error) {
      console.error("Error during Google OAuth callback:", error);
      res.redirect("/"); // Redirect to home page on error
    }
  }
);
 
// Handle POST request from frontend
router.post("/google", async (req, res) => {
  try {
    const { googleId, email, name, avatar } = req.body;

    // Check if the user already exists
    let user = await Consumer.findOne({ googleId });

    if (!user) {
      // Create a new user if they don't exist
      user = new Consumer({
        googleId,
        fullname: name,
        email,
        avatar,
        role: "consumer"
      });
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        phone: user.phone || "",

      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // Send the token back to the frontend
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during Google OAuth POST request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;