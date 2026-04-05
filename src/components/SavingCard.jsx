import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    TrendingUp, PieChart, Landmark, 
    ArrowUpRight
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

import logo1 from "../assets/Sbi.png";
import logo2 from "../assets/hdfc.jpeg";
import logo3 from "../assets/groww.png";

const images = [logo1, logo2, logo3];

const miniChartData = [
    { v: 30 }, { v: 45 }, { v: 35 }, { v: 60 }, { v: 55 }, { v: 80 }
];

export const MonthlySavingsCard = ({ currentAmount, previousAmount }) => {
    const diff = ((currentAmount - previousAmount) / previousAmount * 100).toFixed(1);
    const isPositive = currentAmount >= previousAmount;

    return (
        <div className="bg-[#0c0c0c] border border-zinc-800 p-6 rounded-3xl hover:border-gray-500/50 hover:scale-102 hover:shadow-white/10 shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
                    <TrendingUp size={22} />
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {isPositive ? '+' : ''}{diff}%
                </div>
            </div>
            <h3 className="text-zinc-500 text-sm font-medium">Monthly Savings</h3>
            <p className="text-3xl font-bold text-white mt-1">₹{currentAmount.toLocaleString()}</p>
            <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center">
                <span className="text-zinc-600 text-xs uppercase tracking-wider font-semibold">Previous Month</span>
                <span className="text-zinc-400 font-mono text-sm">₹{previousAmount.toLocaleString()}</span>
            </div>
        </div>
    );
};

export const SavingsDistributionCard = ({ totalAmount, distribution }) => {
    const stackRef = useRef(null);
    const containerRef = useRef(null);
    const hasAnimated = useRef(false);
    const [hoveredRow, setHoveredRow] = useState(null);

    useEffect(() => {
    // If already animated, don't run the GSAP logic again
    if (hasAnimated.current) return;

    const bars = containerRef.current.querySelectorAll(".progress-bar-fill");
    
    gsap.fromTo(bars,
        { width: "0%" },
        {
            width: (i) => bars[i].getAttribute("data-percent") + "%",
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom-=200px",
                toggleActions: "play none none none",
                onEnter: () => {
                    hasAnimated.current = true; // Mark as done when it enters sight
                }
            }
        }
    );
}, [distribution]);

    const handleMouseEnter = () => {
        const items = stackRef.current.querySelectorAll("img");
        gsap.to(items, {
            x: (i) => i * 35,
            rotation: (i) => (i - 1) * 10,
            duration: 0.6,
            ease: "expo.out",
        });
    };

    const handleMouseLeave = () => {
        const items = stackRef.current.querySelectorAll("img");
        gsap.to(items, { x: 0, rotation: 0, duration: 0.5, ease: "power3.inOut" });
    };

    return (
        <div ref={containerRef} className="relative bg-[#0c0c0c] border border-zinc-800 p-8 rounded-[2.5rem] h-full overflow-visible shadow-2xl">
            {/* GLASS BACKGROUND */}
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] -z-10" />

            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <PieChart size={14} /> Portfolio Distribution
                    </h3>
                    <p className="text-4xl font-black text-white mt-2 tracking-tighter">
                        ₹{totalAmount.toLocaleString()}
                    </p>
                </div>

                <div
                    ref={stackRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative flex items-center h-12 cursor-pointer w-32"
                >
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            className="absolute w-10 h-10 rounded-xl border border-zinc-800 bg-[#0a0a0a] object-contain p-2 shadow-2xl transition-transform hover:scale-110"
                            style={{ zIndex: images.length - i, left: 0 }}
                            alt="Logo"
                        />
                    ))}
                </div>
            </div>

            {/* LIST SECTION */}
            <div className="space-y-8">
                {distribution.map((item, idx) => {
                    const percentage = ((item.value / totalAmount) * 100).toFixed(0);
                    const isRowHovered = hoveredRow === item.label;

                    return (
                        <div
                            key={idx}
                            className="group relative"
                            onMouseEnter={() => setHoveredRow(item.label)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            {/* POPUP CHART */}
                            {isRowHovered && (
                                <div className="absolute left-0 -top-32 z-[100] w-52 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 pointer-events-none">
                                    <div className="bg-white/[0.08] backdrop-blur-2xl border border-white/[0.1] p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Market Flow</span>
                                            <div className="flex items-center gap-1 text-emerald-400 font-bold text-[10px]">
                                                <ArrowUpRight size={12} /> +2.4%
                                            </div>
                                        </div>
                                        <div className="h-14 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={miniChartData}>
                                                    <Area
                                                        type="monotone"
                                                        dataKey="v"
                                                        stroke={item.label === 'Stocks' ? '#f87171' : '#3b82f6'}
                                                        strokeWidth={2}
                                                        fill="transparent"
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    <div className="w-4 h-4 bg-white/[0.08] border-r border-b border-white/[0.1] rotate-45 mx-8 -mt-2 backdrop-blur-2xl" />
                                </div>
                            )}

                            {/* ROW INFO */}
                            <div className="flex justify-between items-center mb-3 transition-transform duration-300 group-hover:translate-x-1">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-zinc-400 group-hover:text-blue-400 transition-all">
                                        {item.icon}
                                    </div>
                                    <span className="text-zinc-200 font-bold tracking-tight text-lg">{item.label}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-white font-black block text-xl">₹{item.value.toLocaleString()}</span>
                                    <span className="text-zinc-600 text-[10px] font-black uppercase tracking-tighter">{percentage}% Allocation</span>
                                </div>
                            </div>

                            {/* PROGRESS BAR (ONE DIV ONLY) */}
                            <div className="w-full bg-zinc-900/40 h-2 rounded-full overflow-hidden border border-white/[0.02]">
                                <div
                                    className={`${item.color} progress-bar-fill h-full rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
                                    data-percent={percentage}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};