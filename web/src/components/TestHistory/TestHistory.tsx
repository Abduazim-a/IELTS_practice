import React from 'react';
import { Calendar, Clock, Award, TrendingUp } from 'lucide-react';

interface TestResult {
  id: string;
  testName: string;
  section: string;
  score: number;
  maxScore: number;
  completedAt: Date;
  duration: number;
}

interface TestHistoryProps {
  results: TestResult[];
}

const TestHistory: React.FC<TestHistoryProps> = ({ results }) => {
  const getGradeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No test history yet
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Complete your first test to see your progress here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <div key={result.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${
                result.section === 'listening' ? 'bg-blue-500' :
                result.section === 'reading' ? 'bg-green-500' :
                'bg-purple-500'
              }`}></div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {result.testName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {result.section} Section
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(result.score, result.maxScore)}`}>
                <Award className="w-3 h-3 mr-1" />
                {result.score}/{result.maxScore}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{result.completedAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(result.duration)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestHistory;