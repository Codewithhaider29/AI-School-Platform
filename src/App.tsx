import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import Assignments from './pages/Assignments';
import AITutor from './pages/AITutor';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/ai-tutor" element={<AITutor />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;