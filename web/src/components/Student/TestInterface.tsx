import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Send, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Layout/Header';

const TestInterface: React.FC = () => {
  const navigate = useNavigate();
  const { section, testId, partId } = useParams();
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    // Save test results to Firestore
    console.log('Submitting test:', { section, testId, partId, answers });
    
    // Navigate back to selection
    navigate(`/student/${section}`);
  };

  // Mock questions based on section
  const generateMockQuestions = () => {
    if (section === 'writing') {
      return [
        {
          id: 1,
          type: 'essay',
          prompt: 'Write about the advantages and disadvantages of social media in modern society.',
          wordLimit: 250
        }
      ];
    }
    
    // For listening/reading, generate multiple choice questions
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      type: 'multiple-choice',
      question: `Sample question ${i + 1} for ${section} practice`,
      options: ['Option A', 'Option B', 'Option C', 'Option D']
    }));
  };

  const questions = generateMockQuestions();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Test Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(`/student/${section}`)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {section?.charAt(0).toUpperCase()}{section?.slice(1)} {testId ? `Test ${testId}` : `Part ${partId}`}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {questions[currentQuestion]?.type === 'essay' ? (
            // Writing interface
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Writing Task {partId}
                </h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700 dark:text-gray-300">
                    {questions[currentQuestion].prompt}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Minimum words: {questions[currentQuestion].wordLimit}
                  </p>
                </div>
              </div>
              
              <div>
                <textarea
                  value={answers[questions[currentQuestion].id] || ''}
                  onChange={(e) => setAnswers(prev => ({
                    ...prev,
                    [questions[currentQuestion].id]: e.target.value
                  }))}
                  placeholder="Start writing your response here..."
                  className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Words: {(answers[questions[currentQuestion].id] || '').split(/\s+/).filter(word => word.length > 0).length}
                  </span>
                  <button
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-1"
                  >
                    <Save className="w-3 h-3" />
                    <span>Auto-saved</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Multiple choice interface
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Question {currentQuestion + 1}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {questions[currentQuestion]?.question}
                </p>
              </div>
              
              <div className="space-y-3">
                {questions[currentQuestion]?.options?.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestion].id}`}
                      value={option}
                      checked={answers[questions[currentQuestion].id] === option}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        [questions[currentQuestion].id]: e.target.value
                      }))}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <button
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentQuestion === questions.length - 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TestInterface;