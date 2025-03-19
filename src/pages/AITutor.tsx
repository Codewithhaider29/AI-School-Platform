import React, { useState } from 'react';
import { Brain, Send, Book, Lightbulb, Clock, History } from 'lucide-react';
import { Button } from '../components/ui/button';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const AITutor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI tutor. How can I help you with your studies today?",
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const subjects = [
    { icon: Book, name: 'Mathematics', description: 'Algebra, Calculus, Geometry' },
    { icon: Lightbulb, name: 'Physics', description: 'Mechanics, Electricity, Optics' },
    { icon: Brain, name: 'Chemistry', description: 'Organic, Inorganic, Physical' },
    { icon: Clock, name: 'Study Planning', description: 'Schedule Optimization, Time Management' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "I understand your question. Let me help you with that...",
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Brain className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">AI Tutor</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.sender === 'user'
                          ? 'text-indigo-200'
                          : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask your question..."
                  className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Button type="submit">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Available Subjects
            </h2>
            <div className="space-y-4">
              {subjects.map((subject) => (
                <button
                  key={subject.name}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <subject.icon className="h-6 w-6 text-indigo-600" />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">{subject.name}</h3>
                    <p className="text-sm text-gray-600">
                      {subject.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <History className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Topics
              </h2>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">• Quadratic Equations</p>
              <p className="text-gray-600">• Newton's Laws</p>
              <p className="text-gray-600">• Chemical Bonding</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;