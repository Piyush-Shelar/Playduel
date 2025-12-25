import React,{ useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LeaderBoard from "./pages/LeaderBoard";
import UserProfile from "./components/UserProfile";


import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoginPopup from "./components/LoginPopup";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Features from "./Components/Features";
import Pricing from "./Components/Pricing";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import PlayDuel from "./pages/Dashboard/PlayDuel";
import Chat from "./pages/Chat";
import DashboardArena from "./pages/Dashboard/DashboardArena";
import AppProvider from "./components/Allcontext";
import Friends from "./components/Friends";
import { SocketProvider } from "./components/SocketContext";
import InviteModal from "./components/InviteModal";
import Duel from "./components/Duel";


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Close login on route change
  useEffect(() => {
    setShowLogin(false);
  }, [location.pathname]);

  // Prevent scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "auto";
  }, [showLogin]);

  // Check if current route is a dashboard route
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
    
     <SocketProvider>
      
      
     <AppProvider>
      <InviteModal />
      


      
      {/* LOGIN POPUP */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} setUser={setUser} />}

      {/* NAVBAR - only if not dashboard */}
      {!isDashboard && (
        <Navbar
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          user={user}
          setUser={setUser}
        />
      )}

     

      {/* MAIN ROUTES */}
      <Routes>
        <Route
          path="/"
          element={<LandingPage user={user} setUser={setUser} showLogin={showLogin} setShowLogin={setShowLogin} />}
        />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/friends" element={<Friends/>}/>
        <Route path="/duel" element={<Duel />} />


        <Route
          path="/profile"
          element={user ? <UserProfile user={user} /> : <LandingPage user={user} setUser={setUser} showLogin={showLogin} setShowLogin={setShowLogin} />}
        />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout user={user} />}>
          <Route index element={<DashboardArena />} />
          <Route path="duel" element={<PlayDuel />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="chat" element={<Chat />} />
          
        </Route>
      </Routes>
         
      {/* FOOTER - only if not dashboard */}
      {!isDashboard && <Footer />}

       
      </AppProvider>
      </SocketProvider>

    </>
  );
}


export default App