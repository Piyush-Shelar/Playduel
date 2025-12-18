import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPopup = ({ setShowLogin, setUser }) => {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "signup") {
        // REGISTER API
        const res = await axios.post("http://localhost:9000/register", {
          fullName,
          email,
          password
        });

        setMsg(res.data.message);
        setMode("signin"); // switch to login after signup
        return;
      }

      // LOGIN API
      const res = await axios.post("http://localhost:9000/login", {
        email,
        password
      });

      const { token, user } = res.data;

      // Store token
      localStorage.setItem("token", token);

      // Set user in App state
      setUser(user);

      setShowLogin(false);
      navigate("/dashboard");

    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-black/70"
          onClick={() => setShowLogin(false)}
        />

        <motion.div className="relative w-full max-w-md p-6 rounded-2xl bg-[#06121f]">
          <h2 className="text-xl text-white text-center">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white/10 text-white"
              />
            )}

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/10 text-white"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/10 text-white"
            />

            <button className="w-full py-2 bg-blue-500 rounded">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-red-400 text-sm mt-2">{msg}</p>

          <div className="text-center text-white/60 mt-3">
            {mode === "signin" ? (
              <button onClick={() => setMode("signup")}>Sign Up</button>
            ) : (
              <button onClick={() => setMode("signin")}>Sign In</button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginPopup;
