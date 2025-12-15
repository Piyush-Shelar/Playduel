import React from "react";
import { motion } from "framer-motion";

// Reusable Feature Card
const FeatureCard = ({ icon, title, desc, accent }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    className={`group relative p-6 rounded-2xl border border-transparent bg-gradient-to-br from-[#071020] to-[#061122] backdrop-blur-md hover:border-[rgba(255,255,255,0.03)] transition-all duration-300 shadow-[0_0_24px_rgba(59,130,246,0.12)] hover:shadow-[0_0_36px_rgba(59,130,246,0.22)]`}
  >
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center ${accent} text-white mb-4 shadow-md`}
    >
      {icon}
    </div>
    <h4 className="text-lg font-semibold text-white/90">{title}</h4>
    <p className="mt-2 text-sm text-white/60">{desc}</p>
    <div className="absolute -right-6 -top-6 opacity-20 rotate-[18deg] text-[72px] select-none pointer-events-none text-white/5">
      ⚡
    </div>
  </motion.div>
);

// Features Section
export default function FeaturesSection() {
  const features = [
    {
      icon: "⚔",
      title: "Battle Mode",
      desc: "1v1, team battles, and tournaments with live question rounds and power-ups.",
      accent: "bg-gradient-to-br from-[#1f5cff] to-[#00bcd4]",
    },
    {
      icon: "🏆",
      title: "Leaderboards & Seasons",
      desc: "Seasonal ladders, daily leaderboards, and rich profiles to showcase mastery.",
      accent: "bg-gradient-to-br from-[#7c3aed] to-[#60a5fa]",
    },
    {
      icon: "🎁",
      title: "Rewards & Badges",
      desc: "Earn badges, redeem rewards, and unlock achievements that matter.",
      accent: "bg-gradient-to-br from-[#f97316] to-[#f43f5e]",
    },
    {
      icon: "⚡",
      title: "Realtime Gameplay",
      desc: "Low-latency sockets, live scoring, and instant match results.",
      accent: "bg-gradient-to-br from-[#34d399] to-[#60a5fa]",
    },
    {
      icon: "🛠",
      title: "Admin Panel",
      desc: "Powerful tools for creating battles, reviewing reports, and moderating.",
      accent: "bg-gradient-to-br from-[#0ea5a6] to-[#1f5cff]",
    },
    {
      icon: "📚",
      title: "Skill Categories",
      desc: "STEM, Languages, Humanities and custom skill tags for focused practice.",
      accent: "bg-gradient-to-br from-[#8b5cf6] to-[#60a5fa]",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#040506] to-[#05060a] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h3 className="text-2xl font-bold">Features</h3>
        <p className="text-white/60 mt-2">
          Everything you need to create competitive, fair, and fun quiz battles.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={<span className="text-xl">{feature.icon}</span>}
              title={feature.title}
              desc={feature.desc}
              accent={feature.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
