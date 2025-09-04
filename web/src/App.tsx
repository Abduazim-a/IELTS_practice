import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/Common/ProtectedRoute';
import LoginForm from './components/Auth/LoginForm';
import StudentDashboard from './components/Student/Dashboard';
import AdminDashboard from './components/Admin/Dashboard';
import TestSelection from './components/Student/TestSelection';
import TestInterface from './components/Student/TestInterface';

const AppRouter: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to={user.isAdmin ? "/admin/dashboard" : "/student/dashboard"} replace /> : <LoginForm />} 
      />
      
      {/* Student Routes */}
      <Route 
        path="/student/dashboard" 
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/:section" 
        element={
          <ProtectedRoute>
            <TestSelection />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/:section/test/:testId" 
        element={
          <ProtectedRoute>
            <TestInterface />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/:section/part/:partId" 
        element={
          <ProtectedRoute>
            <TestInterface />
          </ProtectedRoute>
        } 
      />

      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Default redirects */}
      <Route 
        path="/" 
        element={
          user 
            ? <Navigate to={user.isAdmin ? "/admin/dashboard" : "/student/dashboard"} replace />
            : <Navigate to="/login" replace />
        } 
      />
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <AppRouter />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;