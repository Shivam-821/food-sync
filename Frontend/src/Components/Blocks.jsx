import React from "react";
import f1 from "../assets/f1.jpg";
import f2 from "../assets/f2.jpg";
import f3 from "../assets/f3.jpg";
import f4 from "../assets/f4.jpg";
import f5 from "../assets/f5.jpeg";
import f6 from "../assets/f6.webp";
import { useTranslation } from "react-i18next";

const Blocks = () => {
  const { i18n, t } = useTranslation();
  return (
    <div>
      <div className="text-center mt-10 text-5xl font-bold font-serif text-">
        {t("Food You Should Purchase")}
      </div>
      <div className="text-center mt-4 text-5xl font-bold font-serif text-">
        {t("Before it Wastes")}
      </div>
      <div className="ml-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        <div className="w-sm p-4 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-gray-400 hover:transition-transform hover:duration-500 ">
          <img
            className="w-full h-65 object-cover rounded-lg"
            src={f1}
            alt="Image 1"
          />
          <div>
            <h2 className="text-lg font-bold mt-4">Image 1</h2>
            <p className="text-sm text-gray-600">
              This is a description of image 1
            </p>
            <div className="flex justify-between">
              <div>₹200</div>
              <div>5kg for 20 Person</div>
            </div>
          </div>
        </div>
        <div className="w-sm p-4 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-gray-400 hover:transition-transform hover:duration-500">
          <img
            className="w-full h-65 object-cover rounded-lg"
            src={f2}
            alt="Image 2"
          />
          <div>
            <h2 className="text-lg font-bold mt-4">Image 1</h2>
            <p className="text-sm text-gray-600">
              This is a description of image 1
            </p>
            <div className="flex justify-between">
              <div>₹200</div>
              <div>5kg for 20 Person</div>
            </div>
          </div>
        </div>
        <div className="w-sm p-4 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-gray-400 hover:transition-transform hover:duration-500">
          <img
            className="w-full h-65 object-cover rounded-lg"
            src={f3}
            alt="Image 3"
          />
          <div>
            <h2 className="text-lg font-bold mt-4">Image 1</h2>
            <p className="text-sm text-gray-600">
              This is a description of image 1
            </p>
            <div className="flex justify-between">
              <div>₹200</div>
              <div>5kg for 20 Person</div>
            </div>
          </div>
        </div>
        <div className="w-sm p-4 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-gray-400 hover:transition-transform hover:duration-500">
          <img
            className="w-full h-65 object-cover rounded-lg"
            src={f4}
            alt="Image 4"
          />
          <div>
            <h2 className="text-lg font-bold mt-4">Image 1</h2>
            <p className="text-sm text-gray-600">
              This is a description of image 1
            </p>
            <div className="flex justify-between">
              <div>₹200</div>
              <div>5kg for 20 Person</div>
            </div>
          </div>
        </div>
        <div className="w-sm p-4 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-gray-400 hover:transition-transform hover:duration-500">
          <img
            className="w-full h-65 object-cover rounded-lg"
            src={f5}
            alt="Image 5"
          />
          <div>
            <h2 className="text-lg font-bold mt-4">Image 1</h2>
            <p className="text-sm text-gray-600">
              This is a description of image 1
            </p>
            <div className="flex justify-between">
              <div>₹200</div>
              <div>5kg for 20 Person</div>
            </div>
          </div>
        </div>
        <div className="w-sm p-4 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-gray-400 hover:transition-transform hover:duration-500">
          <img
            className="w-full h-65 object-cover rounded-lg"
            src={f6}
            alt="Image 6"
          />
          <div>
            <h2 className="text-lg font-bold mt-4">Image 1</h2>
            <p className="text-sm text-gray-600">
              This is a description of image 1
            </p>
            <div className="flex justify-between">
              <div>₹200</div>
              <div>5kg for 20 Person</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocks;
