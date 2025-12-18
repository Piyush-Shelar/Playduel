import React from "react";
import { motion } from "framer-motion";
import { User, Star, Zap, Award, Settings, Edit, Shield, Trophy } from "lucide-react";

// Premium User Profile Section (Matt Black + Ink Blue)
// SkillDuels Futuristic Gamified Design

export default function UserProfile() {
  return (
    <div className="min-h-screen w-full bg-[#0b0b0f] text-white py-16 px-6 md:px-16 lg:px-28">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center justify-between mb-16"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_20px_rgba(0,140,255,0.5)]">
            Player Profile
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Your stats. Your achievements. Your dominance.</p>
        </div>

        <button className="mt-6 md:mt-0 flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 transition-all px-6 py-3 rounded-xl border border-blue-500/40 shadow-[0_0_15px_rgba(0,90,255,0.4)]">
          <Edit size={18} /> Edit Profile
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Panel – Avatar + Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#11121a] rounded-3xl p-8 shadow-[0_0_20px_rgba(0,120,255,0.15)] border border-blue-500/20"
        >
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 shadow-[0_0_25px_rgba(0,120,255,0.8)] flex items-center justify-center">
              <User size={60} className="text-white" />
            </div>

            <h2 className="text-3xl font-bold mt-6">Sarthak</h2>
            <p className="text-gray-400">@sarthak_duels</p>

            {/* Rank Badge */}
            <div className="mt-6 px-6 py-2 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 font-semibold flex items-center gap-2">
              <Shield size={18} /> Diamond Rank
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 space-y-6">
            <div className="flex justify-between text-gray-300">
              <span>Total XP</span>
              <span className="text-blue-400 font-bold text-lg">14,500</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Quiz Battles Won</span>
              <span className="text-green-400 font-bold text-lg">82</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Current Streak</span>
              <span className="text-yellow-400 font-bold text-lg">7🔥</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Account Level</span>
              <span className="text-purple-400 font-bold text-lg">Lv. 23</span>
            </div>
          </div>
        </motion.div>

        {/* Middle Panel – XP Progress, Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 bg-[#11121a] rounded-3xl p-10 shadow-[0_0_20px_rgba(0,120,255,0.15)] border border-blue-500/20"
        >
          <h3 className="text-2xl font-semibold mb-6">Progress Overview</h3>

          {/* XP Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between mb-2 text-gray-300 text-sm">
              <span>Level 23</span>
              <span>XP: 14,500 / 16,000</span>
            </div>
            <div className="w-full h-4 bg-[#0d0f15] rounded-full overflow-hidden border border-blue-500/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ duration: 1.2 }}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_0_20px_rgba(0,120,255,0.6)]"
              ></motion.div>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { icon: Trophy, label: "Battle Master" },
                { icon: Zap, label: "Fast Thinker" },
                { icon: Star, label: "Top 1% Player" },
                { icon: Award, label: "Accuracy 90%+" },
                { icon: Shield, label: "Unstoppable" },
                { icon: User, label: "Veteran Player" },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#0d0f15] p-6 rounded-2xl border border-blue-500/20 shadow-[0_0_20px_rgba(0,120,255,0.1)] flex flex-col items-center gap-3 hover:shadow-[0_0_25px_rgba(0,120,255,0.4)] transition-all"
                >
                  <badge.icon size={32} className="text-blue-400" />
                  <span className="text-gray-300 font-medium text-sm">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Settings Button */}
    {/* Bottom Buttons */}
<div className="flex justify-center gap-6 mt-16">

  {/* Home Button */}


  {/* Logout Button */}
 

</div>

    </div>
  );
}