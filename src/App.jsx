import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20 bg-premium-dark min-h-screen">
    <div className="w-8 h-8 border-4 border-premium-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
