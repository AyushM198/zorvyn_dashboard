import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
    TrendingUp, AlertCircle, Zap, Rocket, Droplet,
    Target, ShieldAlert, ChevronRight, CalendarClock, Crosshair
} from "lucide-react";
import {
    AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    BarChart, Bar, Cell, YAxis
} from "recharts";

const runwayData = [
    { month: "Jan", balance: 120000 },
    { month: "Feb", balance: 110000 },
    { month: "Mar", balance: 95000 },
    { month: "Apr", balance: 80000 }, 
    { month: "May", balance: 65000, projected: true },
    { month: "Jun", balance: 40000, projected: true },
    { month: "Jul", balance: 15000, projected: true },
];

const habitData = [
    { day: "Mon", amount: 1200 },
    { day: "Tue", amount: 900 },
    { day: "Wed", amount: 1500 },
    { day: "Thu", amount: 1100 },
    { day: "Fri", amount: 3400 }, 
    { day: "Sat", amount: 4200 }, 
    { day: "Sun", amount: 2100 },
];

export default function InsightsPage() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".insight-card",
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }
            );

            gsap.to(".pulse-icon", {
                scale: 1.15,
                opacity: 0.7,
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: "sine.inOut"
            });

            gsap.to(".float-icon", {
                y: -8,
                repeat: -1,
                yoyo: true,
                duration: 2.5,
                ease: "power1.inOut"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const onHover = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1.02,
            backgroundColor: "#070707",
            borderColor: "#27272a",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const onLeave = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            backgroundColor: "#0c0c0c",
            borderColor: "#27272a",
            boxShadow: "none",
            duration: 0.4,
            ease: "power2.out"
        });
    };

    return (
        <div ref={containerRef} className="text-zinc-100 pb-20 p-13">

            {/* HEADER */}
            <div className="insight-card mb-15 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-extralight tracking-tighter text-white">
                        Financial Intelligence
                    </h1>
                    <p className="text-zinc-500 mt-2 flex items-center gap-2 font-medium">
                        <Zap size={16} className="text-blue-500 pulse-icon" />
                        Zorvyn AI has analyzed your portfolio. Here are your action items.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/*  SPENDING HABIT HEATMAP --- */}
                <div
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                    className="insight-card lg:col-span-6 bg-[#0c0c0c] border border-zinc-800 p-8 rounded-[2.5rem] shadow-xl"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <CalendarClock size={20} className="text-purple-500" />
                                Habit Analysis
                            </h3>
                            <p className="text-xs text-zinc-500 mt-1">Your spending behavior by day of the week.</p>
                        </div>
                    </div>

                    <p className="text-sm text-zinc-400 mb-6">
                        You spend <strong className="text-purple-400">65% of your discretionary income</strong> on Friday and Saturday. Consider moving social plans to weekdays to reduce premium weekend pricing.
                    </p>

                    <div className="h-[120px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={habitData}>
                                <Tooltip cursor={{ fill: '#18181b' }} contentStyle={{ backgroundColor: "#000", border: "1px solid #333", borderRadius: "8px" }} />
                                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                                    {habitData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.amount > 3000 ? '#a855f7' : '#27272a'} />
                                    ))}
                                </Bar>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10 }} dy={5} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ---  AI GOAL ACCELERATOR --- */}
                <div
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                    className="insight-card lg:col-span-6 bg-[#0c0c0c] border border-zinc-800 p-8 rounded-[2.5rem] shadow-xl flex flex-col justify-center"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 float-icon">
                            <Crosshair size={24} />
                        </div>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">On Track</span>
                    </div>

                    <h3 className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-1">Goal Accelerator</h3>
                    <h2 className="text-2xl font-black text-white mb-2">Tata Harrier Downpayment</h2>

                    <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mb-4 mt-2">
                        <div className="bg-emerald-500 h-full rounded-full w-[65%] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed">
                        You are 65% there! If you cut your <span className="text-white">Weekend Dining</span> budget by just 15%, Zorvyn AI calculates you will hit your goal <strong className="text-emerald-400">2 months earlier</strong>.
                    </p>
                </div>

                {/*  NET WORTH VELOCITY (Top Highlight) */}
                <div
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                    className="insight-card lg:col-span-12 bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-blue-500/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="p-5 bg-blue-500/10 rounded-2xl text-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)] float-icon">
                        <Rocket size={40} />
                    </div>
                    <div className="flex-1 text-center md:text-left z-10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">Net Worth Velocity</h4>
                        <h2 className="text-3xl font-black text-white mb-2">₹12,500 <span className="text-xl text-zinc-500 font-bold">/ month</span></h2>
                        <p className="text-zinc-400 leading-relaxed max-w-3xl">
                            Your wealth is compounding. At this current growth rate, you are on track to hit your <span className="text-white font-bold">₹10L Milestone</span> in exactly <span className="text-blue-400 font-bold underline decoration-blue-500/50 underline-offset-4">14 months</span>.
                        </p>
                    </div>
                    <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] z-10">
                        Adjust Goal
                    </button>
                </div>

                {/* PREDICTIVE BURN RATE */}
                <div
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                    className="insight-card lg:col-span-8 bg-[#0c0c0c] border border-zinc-800 p-8 rounded-[2.5rem] shadow-xl flex flex-col"
                >
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <TrendingUp size={20} className="text-amber-500" />
                                Runway Prediction
                            </h3>
                            <p className="text-xs text-zinc-500 mt-1">Projected liquid cash based on current burn rate.</p>
                        </div>
                        <span className="bg-amber-500/10 text-amber-500 text-xs font-bold px-3 py-1 rounded-lg border border-amber-500/20">
                            Est. Zero by Aug
                        </span>
                    </div>

                    <div className="h-[220px] w-full mt-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={runwayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="runwayGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="#18181b" strokeDasharray="3 3" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dy={10} />
                                <Tooltip
                                    cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    contentStyle={{ backgroundColor: "#0c0c0c", border: "1px solid #27272a", borderRadius: "12px" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="balance"
                                    stroke="#f59e0b"
                                    strokeWidth={4}
                                    fill="url(#runwayGradient)"
                                    activeDot={{ r: 6, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
                                    strokeDasharray={(data) => data.projected ? '5 5' : '0'}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* BUDGET LEAK DETECTION */}
                <div
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                    className="insight-card lg:col-span-4 bg-[#0c0c0c] border border-zinc-800 p-8 rounded-[2.5rem] shadow-xl flex flex-col"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-red-500/10 rounded-2xl text-red-500 float-icon">
                            <Droplet size={24} />
                        </div>
                    </div>
                    <h3 className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-1">Budget Leak</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-black text-white">Subscriptions</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        Your subscription spending is <strong className="text-red-400">+22% higher</strong> than your 6-month avg. Detected 2 idle subscriptions.
                    </p>

                    <div className="space-y-3 mt-auto">
                        <div className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50 hover:border-red-500/30 transition-colors cursor-pointer">
                            <span className="text-sm font-semibold text-white">Netflix Premium</span>
                            <span className="text-xs font-bold text-red-400">₹649</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50 hover:border-red-500/30 transition-colors cursor-pointer">
                            <span className="text-sm font-semibold text-white">Adobe CC</span>
                            <span className="text-xs font-bold text-red-400">₹4,230</span>
                        </div>
                    </div>
                </div>



                {/* REBALANCING ALERT */}
                <div
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                    className="insight-card lg:col-span-6 bg-[#0c0c0c] border border-zinc-800 p-6 rounded-3xl shadow-xl flex items-center justify-between group cursor-pointer"
                >
                    <div className="flex gap-4 items-center">
                        <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500">
                            <ShieldAlert size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Portfolio Risk High</h3>
                            <p className="text-zinc-500 text-xs mt-0.5">Tech stocks exceed 40% of allocation.</p>
                        </div>
                    </div>
                    <button className="p-2 bg-zinc-900 rounded-full text-zinc-400 group-hover:text-rose-500 group-hover:bg-rose-500/10 transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* TAX OPTIMIZATION */}
                <div
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                    className="insight-card lg:col-span-6 bg-[#0c0c0c] border border-zinc-800 p-6 rounded-3xl shadow-xl flex items-center justify-between group cursor-pointer"
                >
                    <div className="flex gap-4 items-center">
                        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
                            <Target size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">80C Tax Optimization</h3>
                            <p className="text-zinc-500 text-xs mt-0.5">Invest ₹45,000 more to max deductions.</p>
                        </div>
                    </div>
                    <button className="p-2 bg-zinc-900 rounded-full text-zinc-400 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>

            </div>
        </div>
    );
}