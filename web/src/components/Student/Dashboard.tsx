import React, { useState } from 'react';
import { Headphones, BookOpen, PenTool, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [quote] = useState("Success is the sum of small efforts repeated day in and day out.");

  const sections = [
    {
      id: 'listening',
      title: 'Listening',
      description: 'Practice your listening skills with audio recordings',
      icon: Headphones,
      color: 'bg-blue-500 hover:bg-blue-600',
      route: '/student/listening'
    },
    {
      id: 'reading',
      title: 'Reading',
      description: 'Improve your reading comprehension with passages',
      icon: BookOpen,
      color: 'bg-green-500 hover:bg-green-600',
      route: '/student/reading'
    },
    {
      id: 'writing',
      title: 'Writing',
      description: 'Practice your writing skills with structured tasks',
      icon: PenTool,
      color: 'bg-purple-500 hover:bg-purple-600',
      route: '/student/writing'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quote Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 border-l-4 border-blue-500">
          <div className="flex items-start space-x-3">
            <Quote className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
            <p className="text-lg text-gray-700 dark:text-gray-300 italic">
              {quote}
            </p>
          </div>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                onClick={() => navigate(section.route)}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 h-full border border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`${section.color} w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Tests Completed</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Score</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Hours Practiced</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;