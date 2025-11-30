import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load components that are not immediately visible
// Lazy load components that are not immediately visible
const PnLChart = lazy(() => import('./components/PnLChart'));
const LiveTracking = lazy(() => import('./components/LiveTracking'));
const PnLTable = lazy(() => import('./components/PnLTable'));
const Roadmap = lazy(() => import('./components/Roadmap'));
const Footer = lazy(() => import('./components/Footer'));
const AnimatedDivider = lazy(() => import('./components/AnimatedDivider'));

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-4 border-premium-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="bg-premium-dark min-h-screen text-white selection:bg-premium-gold selection:text-black">
      <Navbar />
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatedDivider />
        <PnLChart />
        <AnimatedDivider />
        <PnLTable />
        <AnimatedDivider />
        <LiveTracking />
        <AnimatedDivider />
        <Roadmap />
        <AnimatedDivider />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
