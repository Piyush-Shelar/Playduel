import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin, setUser }) => {
  const [mode, setMode] = useState("signin"); // 'signin' or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
 const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation
    if (mode === "signup" && !fullName) {
      alert("Please enter your full name");
      return;
    }
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Fake authentication simulation
    const loggedInUser = {
      name: mode === "signup" ? fullName : "Player",
      email,
    };

    setUser(loggedInUser); // update App state
    setShowLogin(false);   // close modal
    navigate("/dashboard")
  };
 

  return (
    <AnimatePresence>
      <motion.div
        key="login-popup"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowLogin(false)}
        />

        {/* MODAL */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-md p-6 rounded-2xl bg-gradient-to-br from-[#06121f] to-[#02080f] border border-white/10 shadow-2xl"
        >
          <h2 className="text-xl font-bold text-white text-center">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </h2>
          <p className="text-white/50 text-sm text-center mt-1">
            {mode === "signin"
              ? "Login to continue your SkillDuels journey"
              : "Create your player account to start battling"}
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Full Name for Signup */}
            {mode === "signup" && (
              <div>
                <label className="text-white/70 text-sm">Full Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#1f5cff]"
                  required={mode === "signup"}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-white/70 text-sm">Email</label>
              <input
                type="email"
                placeholder="player@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#1f5cff]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-white/70 text-sm">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#1f5cff]"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#1f5cff] to-[#00bcd4] text-black font-semibold cursor-pointer"
            >
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="text-center text-white/60 text-sm mt-3">
            {mode === "signin" ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-[#60a5fa] underline cursor-pointer"
                  onClick={() => setMode("signup")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-[#60a5fa] underline cursor-pointer"
                  onClick={() => setMode("signin")}
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          {/* Close */}
          <button
            onClick={() => setShowLogin(false)}
            className="w-full mt-2 text-sm text-white/40 hover:text-white/70 transition cursor-pointer"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginPopup;
