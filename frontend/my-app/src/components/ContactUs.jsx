import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div className="w-full bg-black text-white py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-10"
        >
          Contact <span className="text-blue-500">Us</span>
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-gray-400 leading-relaxed">
              Have questions, feedback, or business inquiries?  
              We'd love to hear from you. Just drop a message!
            </p>

            <div className="space-y-3 text-gray-300">
              <p>📍 Dombivli, Maharashtra, India</p>
              <p>📧 support@skillduels.com</p>
              <p>📞 +91 98765 43210</p>
            </div>

            <div className="flex space-x-5 text-xl mt-4">
              <a href="#" className="hover:text-blue-400">🐦</a>
              <a href="#" className="hover:text-blue-400">📘</a>
              <a href="#" className="hover:text-blue-400">📸</a>
              <a href="#" className="hover:text-blue-400">💼</a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl space-y-5"
          >
            <div>
              <label className="block mb-1 text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400">Message</label>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                className="w-full p-3 h-32 bg-black border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-all"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}