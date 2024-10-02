// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavigationBar';
import Home from './pages/Home';
import Resources from './pages/Resources';
import SignupLogin from './pages/SignupLogin';
import Chat from './pages/Chat';
import Journaling from './pages/Journaling';
import Forum from './pages/Forum';
import SettingsProfile from './pages/Settings';
import AdminPanel from './pages/Admin';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/signup-login" element={<SignupLogin />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/journaling" element={<Journaling />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/settings-profile" element={<SettingsProfile />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
