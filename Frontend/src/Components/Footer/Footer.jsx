import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-white text-lg font-semibold">FoodSync</h2>
          <p className="text-gray-400 mt-2">Waste less feed more🫂🫂</p>
          <input
            type="email"
            placeholder="Enter your email..."
            className="mt-4 p-2 w-full rounded bg-gray-800 border border-gray-600 text-gray-300"
          />
          <button className="mt-2 w-full p-2 bg-yellow-500 text-gray-900 font-bold rounded">
            Explore More
          </button>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-yellow-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/recipe" className="hover:text-yellow-400">
                Our Stories
              </a>
            </li>
            <li>
              <a href="/home" className="hover:text-yellow-400">
                Work With Us
              </a>
            </li>
            <li>
              <a href="/home" className="hover:text-yellow-400">
                User Testimonials
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="/home" className="hover:text-yellow-400">
                FAQ
              </a>
            </li>
            <li>
              <a href="/home" className="hover:text-yellow-400">
                Membership
              </a>
            </li>
            <li>
              <a href="/home" className="hover:text-yellow-400">
                User Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Customer Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2">
            <li>📞 Phone: 8076213946</li>
            <li>📧 Email: support@foodsync.com</li>
            <li>📍 Location: NITM, Imphal</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © 2025 FloodSync. All rights reserved. |
        <a href="#" className="hover:text-yellow-400 ml-2">
          Privacy Policy
        </a>{" "}
        |
        <a href="#" className="hover:text-yellow-400 ml-2">
          Terms & Conditions
        </a>
      </div>
    </footer>
  );
};

export default Footer;
