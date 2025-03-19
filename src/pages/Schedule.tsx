import React, { useState } from 'react';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';

interface ClassSchedule {
  id: number;
  subject: string;
  time: string;
  room: string;
  teacher: string;
  day: string;
}

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const scheduleData: Record<string, ClassSchedule[]> = {
    Monday: [
      { id: 1, subject: 'Mathematics', time: '09:00 AM - 10:30 AM', room: 'Room 101', teacher: 'Dr. Smith', day: 'Monday' },
      { id: 2, subject: 'Physics', time: '11:00 AM - 12:30 PM', room: 'Room 203', teacher: 'Prof. Johnson', day: 'Monday' },
      { id: 3, subject: 'Chemistry', time: '02:00 PM - 03:30 PM', room: 'Lab 1', teacher: 'Dr. Williams', day: 'Monday' },
    ],
    Tuesday: [
      { id: 4, subject: 'Biology', time: '09:00 AM - 10:30 AM', room: 'Lab 2', teacher: 'Dr. Brown', day: 'Tuesday' },
      { id: 5, subject: 'English', time: '11:00 AM - 12:30 PM', room: 'Room 105', teacher: 'Ms. Davis', day: 'Tuesday' },
    ],
    Wednesday: [
      { id: 6, subject: 'Computer Science', time: '09:00 AM - 10:30 AM', room: 'Lab 3', teacher: 'Prof. Wilson', day: 'Wednesday' },
      { id: 7, subject: 'History', time: '11:00 AM - 12:30 PM', room: 'Room 302', teacher: 'Mr. Anderson', day: 'Wednesday' },
    ],
    Thursday: [
      { id: 8, subject: 'Physics Lab', time: '09:00 AM - 11:00 AM', room: 'Lab 4', teacher: 'Prof. Johnson', day: 'Thursday' },
      { id: 9, subject: 'Mathematics', time: '11:30 AM - 01:00 PM', room: 'Room 101', teacher: 'Dr. Smith', day: 'Thursday' },
    ],
    Friday: [
      { id: 10, subject: 'Chemistry Lab', time: '09:00 AM - 11:00 AM', room: 'Lab 1', teacher: 'Dr. Williams', day: 'Friday' },
      { id: 11, subject: 'Biology', time: '11:30 AM - 01:00 PM', room: 'Room 204', teacher: 'Dr. Brown', day: 'Friday' },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Calendar className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          {weekDays.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 py-4 text-center font-medium ${
                selectedDay === day
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {scheduleData[selectedDay].map((class_) => (
              <div
                key={class_.id}
                className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4"
              >
                <div className="bg-indigo-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {class_.subject}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {class_.time}
                    </div>
                    <p className="text-gray-600">Room: {class_.room}</p>
                    <p className="text-gray-600">Teacher: {class_.teacher}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;