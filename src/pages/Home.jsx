import React, { Suspense, lazy, useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MeteorBackground from '../components/MeteorBackground';
import { pnlData } from '../utils/pnlData';
import Sliders from 'lucide-react/dist/esm/icons/sliders';
import Check from 'lucide-react/dist/esm/icons/check';

// Lazy load components
const PnLChart = lazy(() => import('../components/PnLChart'));
const CumulativePnLChart = lazy(() => import('../components/CumulativePnLChart'));
const CalendarHeatmap = lazy(() => import('../components/CalendarHeatmap'));
const PnLTable = lazy(() => import('../components/PnLTable'));
const Roadmap = lazy(() => import('../components/Roadmap'));
const ProfitSharing = lazy(() => import('../components/ProfitSharing'));
const Footer = lazy(() => import('../components/Footer'));
const AnimatedDivider = lazy(() => import('../components/AnimatedDivider'));

// Loading fallback component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-3 border-premium-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const Home = () => {
    const segments = [
        { id: 'fnoPnL', label: 'F&O' },
        { id: 'equityPnL', label: 'Equity' },
        { id: 'commodityPnL', label: 'Commodity' }
    ];

    const [selectedSegments, setSelectedSegments] = useState(segments.map(s => s.id));

    const toggleSegment = (id) => {
        setSelectedSegments(prev => {
            if (prev.includes(id)) {
                // If only 1 selected, don't allow unselecting all
                if (prev.length === 1) return prev;
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const selectAll = () => {
        setSelectedSegments(segments.map(s => s.id));
    };

    const isAllSelected = selectedSegments.length === segments.length;

    const filteredData = useMemo(() => {
        let cumulative = 0;
        return pnlData.map(d => {
            let dailyVal = 0;
            selectedSegments.forEach(segId => {
                dailyVal += (d[segId] || 0);
            });

            cumulative += dailyVal;
            return {
                ...d,
                dailyPnL: dailyVal,
                cumulativePnL: cumulative,
                roi: ((dailyVal / 10000000) * 100).toFixed(2)
            };
        });
    }, [selectedSegments]);

    const formatSelectedLabel = () => {
        if (isAllSelected) return 'All Segments';
        if (selectedSegments.length === 0) return 'No Segment Selected';
        return segments.filter(s => selectedSegments.includes(s.id)).map(s => s.label).join(' + ');
    };

    return (
        <div className="bg-premium-dark min-h-screen text-white selection:bg-premium-gold selection:text-black relative w-full overflow-x-hidden">
            <MeteorBackground />
            <Navbar />
            <Hero />

            {/* Segment Controls Dock */}
            <div className="container mx-auto px-4 sm:px-6 mb-8 relative z-10 max-w-4xl">
                <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 shadow-xl bg-black/40 backdrop-blur-md">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            <Sliders className="w-3.5 h-3.5 text-premium-gold" />
                            <span>Segment Filter:</span>
                            <span className="text-premium-gold font-bold">{formatSelectedLabel()}</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono">
                            Based on ₹1 Cr Capital Base
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button
                            onClick={selectAll}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${isAllSelected
                                ? 'bg-gradient-to-r from-premium-gold to-yellow-600 text-black border-premium-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-white/5'
                                }`}
                        >
                            {isAllSelected && <Check className="w-3.5 h-3.5" />}
                            <span>All Segments</span>
                        </button>

                        {segments.map(seg => {
                            const isSelected = selectedSegments.includes(seg.id);
                            return (
                                <button
                                    key={seg.id}
                                    onClick={() => toggleSegment(seg.id)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${isSelected
                                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-white/5'
                                        }`}
                                >
                                    {isSelected && <Check className="w-3.5 h-3.5" />}
                                    <span>{seg.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Suspense fallback={<LoadingSpinner />}>
                <AnimatedDivider />
                <PnLChart data={filteredData} selectedSegment={formatSelectedLabel()} />

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <CalendarHeatmap data={filteredData} />
                </div>

                <AnimatedDivider />
                <CumulativePnLChart data={filteredData} selectedSegment={formatSelectedLabel()} />

                <AnimatedDivider />
                <div id="ledger">
                    <PnLTable data={filteredData} selectedSegment={formatSelectedLabel()} />
                </div>

                <AnimatedDivider />
                <Roadmap />

                <AnimatedDivider />
                <ProfitSharing />

                <AnimatedDivider />
                <Footer />
            </Suspense>
        </div>
    );
};

export default Home;
