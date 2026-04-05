
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, Pie, PieChart
} from "recharts";
import {
  Landmark, ChartNoAxesCombined, CircleDollarSign, ChevronDown,
  TrendingUp, Wallet, Coins, ArrowUpCircle, ArrowDownCircle
} from "lucide-react";
import StatCard from "./SummaryCard";
import { MonthlySavingsCard, SavingsDistributionCard } from "./SavingCard";

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#a855f7", "#eab308"];

export default function Dashboard({ transactions = [], role = "admin" }) {
  const containerRef = useRef();
  const [timeRange, setTimeRange] = useState("6m");

  const totalIncome = transactions.filter(t => t.type === "income").reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((acc, curr) => acc + curr.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
  };

  const processedChartData = transactions
    .slice(timeRange === "6m" ? -6 : -12)
    .reverse()
    .map(t => ({
      ...t,
      monthName: formatMonth(t.date)
    }));

  // 3. PIE CHART LOGIC
  const expenseCategories = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) existing.value += curr.amount;
      else acc.push({ name: curr.category, value: curr.amount });
      return acc;
    }, []);

  const stats = [
    { label: "Total Balance", value: `₹${totalBalance.toLocaleString()}`, icon: <Wallet size={20} />, color: "text-white" },
    { label: "Monthly Income", value: `+₹${totalIncome.toLocaleString()}`, icon: <ArrowUpCircle size={20} />, color: "text-green-400" },
    { label: "Monthly Expenses", value: `-₹${totalExpenses.toLocaleString()}`, icon: <ArrowDownCircle size={20} />, color: "text-red-400" },
  ];

  const savingsDist = [
    { label: "FD", value: 15000, color: "bg-blue-500", icon: <Landmark size={14} /> },
    { label: "Mutual Funds", value: 25000, color: "bg-emerald-500", icon: <ChartNoAxesCombined size={14} /> },
    { label: "Stocks", value: 10000, color: "bg-violet-500", icon: <CircleDollarSign size={14} /> },
    { label: "SIPs", value: 8000, color: "bg-amber-500", icon: <TrendingUp size={14} /> },
    { label: "GOLD", value: 12000, color: "bg-yellow-400", icon: <Coins size={14} /> },
  ];


  useEffect(() => {
    const ctx = gsap.context(() => {
 
      gsap.fromTo(".reveal",
        {
          opacity: 0,
          x: 20
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.in",

        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [transactions]);
  return (
    <div ref={containerRef} className="text-zinc-100 px-8 lg:pt-8">
      {/* HEADER */}
      <div className="reveal flex justify-between items-center -mt-0 mb-10">
        <div>
          <h1 className="text-5xl font-extralight  tracking-tight text-white">Financial Overview</h1>
          <p className="text-zinc-500 mt-1">Hello Admin, your portfolio is up 12% this month.</p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 lg:mt-12 lg:gap-x-12 ">
        {stats.map((card, i) => <StatCard key={i} {...card} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-8 mb-22">
        {/* MAIN AREA CHART */}
        <div className="reveal lg:col-span-6 lg:h-[400px] bg-[#0c0c0c] border border-zinc-800 p-8 rounded-[2rem] shadow-2xl ">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">Total Income </h2>
            <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
              {["6m", "1y"].map(r => (
                <button key={r} onClick={() => setTimeRange(r)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === r ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}>
                  {r === "6m" ? "6 Months" : "Yearly"}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[240px] w-full ">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processedChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#18181b" strokeDasharray="3 3" />
                <XAxis dataKey="monthName" axisLine={false} tickLine={false} tick={{ fill: '#52525b', fontSize: 12 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#52525b', fontSize: 11 }} />
                <Tooltip
                  cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ backgroundColor: "#0c0c0c", border: "1px solid #27272a", borderRadius: "12px" }}
                />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={4} fill="url(#chartGradient)" activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="reveal bg-[#0c0c0c] border border-zinc-800 p-8 rounded-[2.5rem] lg:col-span-3 shadow-2xl flex flex-col h-full transition-all duration-500">
          {/* Title */}
          <h2 className="text-xl font-bold text-white -mb-6">Allocation</h2>

          {/* MAIN CONTAINER: Stacked Column to put data at the bottom */}
          <div className="flex flex-col items-center justify-between h-full gap-2">

            {/* PIE CHART AREA */}
            <div className="w-full h-[220px] sm:h-[260px] flex items-center justify-center overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories.length ? expenseCategories : [{ name: 'Empty', value: 1 }]}
                    startAngle={180}
                    endAngle={0}
                    innerRadius="84%"
                    outerRadius="90%"
                    paddingAngle={5}
                    cornerRadius={40}
                    dataKey="value"
                    stroke="none"
                  
                    cx="50%"
                    cy="80%"
                  >
                    {expenseCategories.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                        style={{ outline: 'none' }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#fff"
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* DATA ITEMS AT BOTTOM - Grid for better screen adjustment */}
            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3 mt-2">
              {expenseCategories.map((item, i) => (
                <div key={i} className="flex flex-col group">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest group-hover:text-zinc-300 transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-white font-black text-sm ml-3.5 tracking-tight">
                    ₹{item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="reveal mb-12 ">
        <h2 className="text-5xl font-extralight text-white">Savings Portfolio</h2>
        <p className="text-zinc-500 mt-1">Your assets across different categories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-1"><MonthlySavingsCard currentAmount={totalBalance * 0.4} previousAmount={totalBalance * 0.35} /></div>
        <div className="lg:col-span-2"><SavingsDistributionCard totalAmount={90000} distribution={savingsDist} /></div>
      </div>
    </div>
  );
}

