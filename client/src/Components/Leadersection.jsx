import React from "react";
import { Trophy, Medal, Star, Users, ChevronUp, ChevronDown } from "lucide-react";

export default function Leadersection() {
  const leaders = [
    {
      rank: 1,
      name: "Aarav Sharma",
      xp: 9820,
      wins: 134,
      streak: 28,
      badges: 12,
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
      rank: 2,
      name: "Meera Patel",
      xp: 9100,
      wins: 120,
      streak: 18,
      badges: 10,
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      rank: 3,
      name: "Rahul Verma",
      xp: 8760,
      wins: 102,
      streak: 14,
      badges: 9,
      avatar: "https://i.pravatar.cc/150?img=48",
    },
  ];

  const list = Array.from({ length: 15 }).map((_, idx) => ({
    rank: idx + 4,
    name: `Player ${idx + 4}`,
    xp: 6000 - idx * 100,
    wins: 40 + idx,
    streak: Math.floor(Math.random() * 10),
    badges: Math.floor(Math.random() * 5),
    avatar: `https://i.pravatar.cc/150?img=${idx + 5}`,
  }));

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-10">
      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-wide text-blue-400 mb-3">
          Global Leaderboard
        </h1>
        <p className="text-gray-400 text-center max-w-xl">
          Track the top performers across SkillDuels. Rankings are updated in
          real-time based on XP, wins, streaks, and achievements.
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {leaders.map((player, index) => (
          <div
            key={index}
            className={`bg-[#111622] rounded-2xl p-6 border-2 shadow-xl flex flex-col items-center text-center transition hover:shadow-[0_0_25px_rgba(0,150,255,0.4)] ${
              player.rank === 1 ? "border-yellow-400" : "border-blue-600"
            }`}
          >
            {player.rank === 1 && <Trophy size={40} className="text-yellow-400 mb-3" />}
            {player.rank === 2 && <Medal size={40} className="text-gray-300 mb-3" />}
            {player.rank === 3 && <Star size={40} className="text-orange-400 mb-3" />}

            <img
              src={player.avatar}
              alt={`${player.name} avatar`}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-600 mb-4"
            />
            <h2 className="text-xl font-semibold">{player.name}</h2>
            <p className="text-blue-300 text-sm mb-3">Rank #{player.rank}</p>

            <div className="w-full bg-[#0A0E17] p-4 rounded-xl mt-auto">
              <p className="text-gray-300 text-sm">XP: {player.xp}</p>
              <p className="text-gray-300 text-sm">Wins: {player.wins}</p>
              <p className="text-gray-300 text-sm">Streak: {player.streak}🔥</p>
              <p className="text-gray-300 text-sm">Badges: {player.badges}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <input
          placeholder="Search players..."
          className="bg-[#111622] border border-gray-700 rounded-xl px-4 py-3 outline-none w-full md:w-72 focus:border-blue-500"
        />
        <div className="flex gap-3">
          <button className="px-4 py-3 rounded-xl bg-[#111622] border border-gray-700 hover:border-blue-500 flex items-center">
            <Users size={18} className="inline-block mr-2" /> Global
          </button>
          <button className="px-4 py-3 rounded-xl bg-[#111622] border border-gray-700 hover:border-blue-500 flex items-center">
            <ChevronUp size={18} className="inline-block mr-2" /> Top Streak
          </button>
          <button className="px-4 py-3 rounded-xl bg-[#111622] border border-gray-700 hover:border-blue-500 flex items-center">
            <ChevronDown size={18} className="inline-block mr-2" /> XP Sort
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111622] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-[#0A0E17] text-gray-300">
            <tr>
              <th className="py-4 px-6">Rank</th>
              <th className="py-4 px-6">Player</th>
              <th className="py-4 px-6">XP</th>
              <th className="py-4 px-6">Wins</th>
              <th className="py-4 px-6">Streak</th>
              <th className="py-4 px-6">Badges</th>
            </tr>
          </thead>
          <tbody>
            {list.map((player, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-[#0D1220] transition"
              >
                <td className="py-4 px-6 text-gray-300 font-semibold">#{player.rank}</td>
                <td className="py-4 px-6 flex items-center gap-3">
                  <img
                    src={player.avatar}
                    alt={`${player.name} avatar`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {player.name}
                </td>
                <td className="py-4 px-6 text-blue-300 font-semibold">{player.xp}</td>
                <td className="py-4 px-6 text-gray-300">{player.wins}</td>
                <td className="py-4 px-6 text-gray-300">{player.streak}🔥</td>
                <td className="py-4 px-6 text-gray-300">{player.badges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
