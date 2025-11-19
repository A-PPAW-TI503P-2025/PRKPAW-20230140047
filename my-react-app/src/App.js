// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Jika tidak ada token, redirect ke login
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (untuk halaman login/register)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    // Jika sudah login, redirect ke dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - Hanya bisa diakses jika belum login */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />
        
        {/* Protected Routes - Hanya bisa diakses jika sudah login */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Default Route - Redirect ke login atau dashboard */}
        <Route 
          path="/" 
          element={<Navigate to="/login" replace />} 
        />
        
        {/* 404 Not Found Route */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Halaman tidak ditemukan</p>
                <a 
                  href="/" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Kembali ke Beranda
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;