import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdFactory,
  MdOutlineFastfood,
  MdRecycling,
  MdVolunteerActivism,
} from "react-icons/md";

const SelectionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[60%] h-[60%] bg-yellow-500 blur-[80px] opacity-30 rounded-full absolute left-[15%] top-[20%] animate-pulse"></div>
        <div className="w-[60%] h-[60%] bg-green-500 blur-[80px] opacity-30 rounded-full absolute right-[15%] bottom-[20%] animate-pulse"></div>
        <div className="w-[60%] h-[60%] bg-purple-500 blur-[80px] opacity-30 rounded-full absolute left-[40%] bottom-[10%] animate-pulse"></div>
        <div className="w-[60%] h-[60%] bg-blue-500 blur-[80px] opacity-30 rounded-full absolute right-[40%] top-[10%] animate-pulse"></div>
      </div>

      {/* Title */}
      <motion.h2
        className="text-4xl font-bold text-center mb-10 text-white z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Tell Us About Yourself!
      </motion.h2>

      {/* Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl z-10">
        {/* Surplus Food Producer Card */}
        <motion.div
          className="relative p-8 rounded-xl shadow-2xl cursor-pointer bg-gray-900 hover:bg-yellow-600 transition-all flex flex-col items-center text-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/producer")}
        >
          {/* Glowing Effect Behind Card */}
          <div className="absolute inset-0 bg-yellow-500 blur-[50px] opacity-30 rounded-xl"></div>

          <MdFactory className="text-9xl text-yellow-400 mb-4 transition-all" />
          <h3 className="text-lg font-semibold">Surplus Food Producer</h3>
        </motion.div>

        {/* Consumer Card */}
        <motion.div
          className="relative p-8 rounded-xl shadow-2xl cursor-pointer bg-gray-900 hover:bg-green-600 transition-all flex flex-col items-center text-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/consumer")}
        >
          {/* Glowing Effect Behind Card */}
          <div className="absolute inset-0 bg-green-500 blur-[50px] opacity-30 rounded-xl"></div>

          <MdOutlineFastfood className="text-9xl text-green-400 mb-4 transition-all" />
          <h3 className="text-lg font-semibold">
            Consumer (Individuals, Industries)
          </h3>
        </motion.div>

        {/* Upcycling Industry Card */}
        <motion.div
          className="relative p-8 rounded-xl shadow-2xl cursor-pointer bg-gray-900 hover:bg-purple-600 transition-all flex flex-col items-center text-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/upcyclesignup")}
        >
          {/* Glowing Effect Behind Card */}
          <div className="absolute inset-0 bg-purple-500 blur-[50px] opacity-30 rounded-xl"></div>

          <MdRecycling className="text-9xl text-purple-400 mb-4 transition-all" />
          <h3 className="text-lg font-semibold">Upcycling Industry</h3>
        </motion.div>

        {/* NGO Card */}
        <motion.div
          className="relative p-8 rounded-xl shadow-2xl cursor-pointer bg-gray-900 hover:bg-blue-600 transition-all flex flex-col items-center text-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
        >
          {/* Glowing Effect Behind Card */}
          <div className="absolute inset-0 bg-blue-500 blur-[50px] opacity-30 rounded-xl"></div>

          <MdVolunteerActivism className="text-9xl text-blue-400 mb-4 transition-all" />
          <h3 className="text-lg font-semibold">
            NGO's(Non-Governmental Organization)
          </h3>
        </motion.div>
      </div>
    </div>
  );
};

export default SelectionComponent;
