import React from 'react';
import { useAuthStore } from '../lib/store';
import { Calendar, FileText, Bell, Brain } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();

  const upcomingAssignments = [
    { id: 1, title: 'Math Homework', dueDate: '2024-03-20', subject: 'Mathematics' },
    { id: 2, title: 'Physics Lab Report', dueDate: '2024-03-22', subject: 'Physics' },
  ];

  const notifications = [
    { id: 1, message: 'New assignment posted in Physics', time: '2 hours ago' },
    { id: 2, message: 'Your Math homework was graded', time: '5 hours ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome back, {user?.email}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Schedule Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Today's Schedule</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium">Mathematics</p>
              <p className="text-sm text-gray-600">09:00 AM - 10:30 AM</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium">Physics</p>
              <p className="text-sm text-gray-600">11:00 AM - 12:30 PM</p>
            </div>
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Upcoming Assignments</h2>
          </div>
          <div className="space-y-3">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="p-3 bg-gray-50 rounded-md">
                <p className="font-medium">{assignment.title}</p>
                <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                <p className="text-sm text-gray-600">{assignment.subject}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 bg-gray-50 rounded-md">
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-gray-600">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Learning Assistant */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2 lg:col-span-3">
          <div className="flex items-center mb-4">
            <Brain className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">AI Learning Assistant</h2>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-700">Need help with your studies? The AI tutor is here to assist you with:</p>
            <ul className="mt-2 space-y-2 list-disc list-inside text-gray-600">
              <li>Homework assistance</li>
              <li>Concept explanations</li>
              <li>Practice problems</li>
              <li>Study planning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;