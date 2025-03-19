import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { supabase } from '../lib/supabase';
import { GraduationCap, BookOpen, Calendar, FileText, Brain, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">EduAI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <BookOpen className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/schedule" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <Calendar className="h-5 w-5" />
              <span>Schedule</span>
            </Link>
            <Link to="/assignments" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <FileText className="h-5 w-5" />
              <span>Assignments</span>
            </Link>
            <Link to="/ai-tutor" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <Brain className="h-5 w-5" />
              <span>AI Tutor</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;