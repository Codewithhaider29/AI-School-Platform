import React, { useState } from 'react';
import { FileText, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  description: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
}

const Assignments = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  const assignments: Assignment[] = [
    {
      id: 1,
      title: 'Mathematics Problem Set 3',
      subject: 'Mathematics',
      dueDate: '2024-03-20',
      description: 'Complete problems 1-10 from Chapter 4: Calculus Integration',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      subject: 'Physics',
      dueDate: '2024-03-22',
      description: 'Write a detailed report on the pendulum experiment',
      status: 'submitted'
    },
    {
      id: 3,
      title: 'English Essay',
      subject: 'English',
      dueDate: '2024-03-18',
      description: 'Write a 1000-word essay on Shakespeare\'s Macbeth',
      status: 'graded',
      grade: 'A'
    }
  ];

  const filteredAssignments = assignments.filter(
    assignment => filter === 'all' || assignment.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'submitted':
        return 'text-blue-600 bg-blue-50';
      case 'graded':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <FileText className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        </div>
        <div className="flex space-x-2">
          {['all', 'pending', 'submitted', 'graded'].map((status) => (
            <Button
              key={status}
              onClick={() => setFilter(status as any)}
              variant={filter === status ? 'default' : 'outline'}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {assignment.title}
                </h2>
                <p className="mt-1 text-gray-600">{assignment.subject}</p>
              </div>
              <div className={`px-3 py-1 rounded-full ${getStatusColor(assignment.status)}`}>
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </div>
            </div>

            <p className="mt-4 text-gray-700">{assignment.description}</p>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  Due: {assignment.dueDate}
                </div>
                {assignment.grade && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Grade: {assignment.grade}
                  </div>
                )}
              </div>

              {assignment.status === 'pending' && (
                <Button>
                  Submit Assignment
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;