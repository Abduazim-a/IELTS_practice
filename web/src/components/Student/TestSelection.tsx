import React from 'react';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Layout/Header';

const TestSelection: React.FC = () => {
  const navigate = useNavigate();
  const { section } = useParams<{ section: string }>();

  const sectionConfig = {
    listening: {
      title: 'Listening',
      color: 'blue',
      parts: ['Section 1', 'Section 2', 'Section 3', 'Section 4']
    },
    reading: {
      title: 'Reading',
      color: 'green',
      parts: ['Passage 1', 'Passage 2', 'Passage 3']
    },
    writing: {
      title: 'Writing',
      color: 'purple',
      parts: ['Task 1', 'Task 2']
    }
  };

  const config = sectionConfig[section as keyof typeof sectionConfig];
  
  if (!config) {
    return <div>Section not found</div>;
  }

  const fullTests = [
    { id: 1, title: 'Test 1', duration: '30 mins', difficulty: 'Easy' },
    { id: 2, title: 'Test 2', duration: '30 mins', difficulty: 'Medium' },
    { id: 3, title: 'Test 3', duration: '30 mins', difficulty: 'Hard' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {config.title} Practice
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Choose your practice mode
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Full Tests */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Full Tests
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
              Complete practice tests with all sections
            </p>
            
            <div className="space-y-3">
              {fullTests.map((test) => (
                <div
                  key={test.id}
                  onClick={() => navigate(`/student/${section}/test/${test.id}`)}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {test.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {test.duration}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          test.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {test.difficulty}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part-by-Part */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className={`w-6 h-6 bg-${config.color}-600 rounded mr-2`}></div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Part-by-Part Practice
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
              Focus on specific sections to improve targeted skills
            </p>
            
            <div className="space-y-3">
              {config.parts.map((part, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/student/${section}/part/${index + 1}`)}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {part}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Practice individual section
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestSelection;