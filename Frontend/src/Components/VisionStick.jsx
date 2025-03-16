import React from "react";
import { DiMagento } from "react-icons/di";
import { useNavigate } from "react-router-dom";

export default function VisionComponent() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/image-review")}  className="fixed bottom-5 right-5 flex flex-col items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer z-30">
      <div className="text-3xl">
        <DiMagento />
      </div>
      <span className="font- text-md">Vision</span>
    </div>
  );
}
