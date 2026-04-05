import React, { useState } from "react";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { ChevronDown } from "lucide-react";

export default function CashFlowChart({ transactions }) {
    const [timeRange, setTimeRange] = useState("6m");

    const chartData = transactions.slice(-6).reverse();

    return (
        <div className="reveal lg:col-span-2 bg-[#0c0c0c] border border-zinc-800 p-6 rounded-2xl shadow-xl">

            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-white">Total income</h2>
                    <ChevronDown size={16} className="text-zinc-500" />
                </div>

                <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white transition-all">
                    {timeRange === "6m" ? "Last 6 months" : "Yearly View"}
                    <ChevronDown size={14} />
                </button>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            {/* GRADIENT DEFINITION */}
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} stroke="#18181b" strokeDasharray="3 3" />

                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#52525b', fontSize: 12 }}
                            dy={15}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#52525b', fontSize: 12 }}
                            dx={-5}
                        />

                        <Tooltip
                            cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }}
                            contentStyle={{ backgroundColor: "#0c0c0c", border: "1px solid #27272a", borderRadius: "12px" }}
                            itemStyle={{ color: "#3b82f6", fontWeight: "bold" }}
                        />

                        <Area
                            type="monotone" 
                            dataKey="amount"
                            stroke="#3b82f6"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorAmount)" 
                            activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}