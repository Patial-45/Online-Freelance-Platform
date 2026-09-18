import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import Login from "./Login";
import Logout from "./Components/Logout";
import FindJobs from "./FindJobs";
import SingleJob from "./Components/SingleJob";
import PostJobs from "./Components/PostJobs";
import FindFreelancer from "./FindFreelancer";
import Profile from "./Components/Profile";
import Terms from "./Components/Terms";
import Error from "./Components/Error";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Paths = () => {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<App />} />
      <Route path="/home" element={<App />} />
      <Route path="/Home" element={<App />} />
      <Route path="/about" element={<App />} />

      {/* Jobs */}
      <Route path="/FindJobs" element={<FindJobs />} />
      <Route path="/findjobs" element={<FindJobs />} />
      <Route path="/jobs" element={<FindJobs />} />
      
      <Route path="/FindJobs/:id" element={<SingleJob />} />
      <Route path="/jobs/:id" element={<SingleJob />} />
      
      <Route path="/FindJobs/PostJobs" element={<PostJobs />} />
      <Route path="/postjobs" element={<PostJobs />} />
      <Route path="/PostJobs" element={<PostJobs />} />
      <Route path="/postjob" element={<PostJobs />} />
      <Route path="/post-job" element={<PostJobs />} />

      {/* Freelancers */}
      <Route path="/FindFreelancer" element={<FindFreelancer />} />
      <Route path="/findfreelancer" element={<FindFreelancer />} />
      <Route path="/freelancers" element={<FindFreelancer />} />
      <Route path="/FindFreelancer/GetHired" element={<PostJobs />} />

      {/* Profile & User */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/FindJobs/Profile" element={<Profile />} />
      <Route path="/FindFreelancer/Profile" element={<Profile />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Login1" element={<Login />} />
      <Route path="/register" element={<Login />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="/logout" element={<Logout />} />

      {/* Legal */}
      <Route path="/Terms" element={<Terms />} />
      <Route path="/terms" element={<Terms />} />

      {/* 404 Catch-All */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

const Routing = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Paths />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routing;
