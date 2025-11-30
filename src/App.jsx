import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PnLChart from './components/PnLChart';
import LiveTracking from './components/LiveTracking';
import PnLTable from './components/PnLTable';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-premium-dark min-h-screen text-white selection:bg-premium-gold selection:text-black">
      <Navbar />
      <Hero />
      <PnLChart />
      <PnLTable />
      <LiveTracking />
      <Footer />
    </div>
  );
}

export default App;
