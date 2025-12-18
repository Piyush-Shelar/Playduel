import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="w-full bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-10"
        >
          About <span className="text-blue-500">SkillDuels</span>
        </motion.h1>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              SkillDuels is a gamified learning platform designed to make knowledge exciting,
              competitive, and rewarding. Students engage in quiz battles, unlock achievements,
              earn XP, climb leaderboards, and challenge players worldwide.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Our mission is simple: combine education with competitive gaming to create an
              addictive learning experience that boosts confidence, curiosity, and skill mastery.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              With real-time battles, AI-powered difficulty matching, and a fully immersive
              dashboard — SkillDuels transforms learning into an adventure.
            </p>
          </div>

          {/* Animated Image Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-gray-700"
          >
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
              alt="Learning"
              className="w-full h-72 object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-16">
          {[
            { value: "50K+", label: "Active Players" },
            { value: "1200+", label: "Daily Challenges" },
            { value: "99.9%", label: "Server Uptime" },
            { value: "15+", label: "Game Modes" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-xl py-6 shadow-md border border-gray-700"
            >
              <h2 className="text-3xl font-bold text-blue-400">{stat.value}</h2>
              <p className="text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}