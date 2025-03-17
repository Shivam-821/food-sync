import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample donation requests
const donationRequests = [
  {
    id: 1,
    food: "Fresh Vegetables",
    quantity: "5 kg",
    donor: "John Doe",
    time: "2 mins ago",
  },
  {
    id: 2,
    food: "Canned Goods",
    quantity: "10 cans",
    donor: "Jane Smith",
    time: "10 mins ago",
  },
  {
    id: 3,
    food: "Baked Bread",
    quantity: "20 loaves",
    donor: "Alice Johnson",
    time: "1 hour ago",
  },
];

const NotificationItem = ({ request, onAccept }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          New Donation Request
        </h3>
        <span className="text-sm text-gray-500">{request.time}</span>
      </div>
      <p className="mt-2 text-gray-600">
        <span className="font-medium">{request.donor}</span> is donating{" "}
        <span className="font-medium">{request.quantity}</span> of{" "}
        <span className="font-medium">{request.food}</span>.
      </p>
      <div className="mt-4">
        <motion.button
          onClick={onAccept}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          <motion.span
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Accept
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const NotificationSection = () => {
  const [requests, setRequests] = useState(donationRequests);

  const handleAccept = (id) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
    alert(`Donation request ${id} accepted!`);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Donation Requests
      </h2>
      <div className="space-y-4">
        <AnimatePresence>
          {requests.length > 0 ? (
            requests.map((request) => (
              <NotificationItem
                key={request.id}
                request={request}
                onAccept={() => handleAccept(request.id)}
              />
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-gray-600"
            >
              No pending donation requests.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationSection;