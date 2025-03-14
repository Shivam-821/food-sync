import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        // Fetch user info from Google
        const { data } = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.access_token}`
        );

        // Send user data to backend
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/auth/google`,
          {
            googleId: data.id,
            email: data.email,
            name: data.name,
            avatar: data.picture,
          }
        );

        // Store token in localStorage
        localStorage.setItem("accessToken", response.data.token);
        alert("Login Successful!");
        navigate("/");
      } catch (error) {
        console.error("Login failed", error);
        alert("Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      alert("Login Failed");
      setIsLoading(false);
    },
  });

  return (
    <button
      onClick={() => login()}
      disabled={isLoading}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
    >
      {isLoading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}