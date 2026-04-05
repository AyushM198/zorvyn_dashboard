import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { 
    Search, Filter, ArrowUpRight, ArrowDownLeft, 
    Download, Calendar, ChevronDown, Plus, X 
} from "lucide-react";

export default function TransactionsPage({ role, transactions, onAdd }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [newTx, setNewTx] = useState({
        category: "",
        amount: "",
        type: "expense",
        status: "Completed",
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        gsap.from(".animate-content", {
            opacity: 1, 
            y: 10,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
        });
    }, [transactions.length]); 

    const filteredData = transactions.filter(t => {
        const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || t.type === filter;
        return matchesSearch && matchesFilter;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTx.category || !newTx.amount) return;
                onAdd({
            ...newTx,
            id: Date.now(),
            amount: parseFloat(newTx.amount)
        });
        
        setIsModalOpen(false);
        setNewTx({ ...newTx, category: "", amount: "" }); 
    };

    return (
        <div className="min-h-screen bg-[#121315] text-[#e4e4e7] p-6 md:p-12 relative">
            <div className="max-w-7xl mx-auto">
                
                {/* HEADER */}
                <div className="animate-content mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="ml-4">
                        <h1 className="text-5xl font-extralight text-white tracking-tight">Transactions</h1>
                        <p className="text-zinc-500 mt-1">
                            {role === "admin" ? "Manage and update" : "View"} your recent financial activity
                        </p>
                    </div>
                    
                    <div className="flex gap-3 mr-12">
                        <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-3xl font-medium transition-all">
                            <Download size={18} /> Export
                        </button>
                        
                        {/* ONLY ADMIN CAN SEE ADD BUTTON */}
                        {role === "admin" && (
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-3xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                            >
                                <Plus size={18} /> Add New
                            </button>
                        )}
                    </div>
                </div>

                {/* SEARCH & FILTERS */}
                <div className="animate-content flex flex-col md:flex-row gap-4 mb-8  lg:mx-40 lg:mt-14">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Search by category..."
                            className="w-full bg-[#111] border border-zinc-800 rounded-3xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-zinc-600 transition-all"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <select 
                            className="appearance-none bg-[#111] border border-zinc-800 rounded-3xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-zinc-600 cursor-pointer"
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expenses</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                    </div>
                </div>

                {/* TABLE */}
                <div className="animate-content overflow-hidden rounded-3xl lg:mx-12 border border-zinc-800 bg-[#0c0c0c]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800 bg-zinc-900/20 text-zinc-500 text-xs uppercase tracking-widest">
                                    <th className="px-6 py-5 font-semibold">Date</th>
                                    <th className="px-6 py-5 font-semibold">Category</th>
                                    <th className="px-6 py-5 font-semibold">Status</th>
                                    <th className="px-6 py-5 font-semibold text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900">
                                {filteredData.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-5 text-zinc-400 text-sm">{tx.date}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                {tx.type === 'income' ? 
                                                    <ArrowDownLeft className="text-emerald-500" size={18} /> : 
                                                    <ArrowUpRight className="text-zinc-500" size={18} />
                                                }
                                                <span className="font-medium text-zinc-100">{tx.category}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-2.5 py-0.5 rounded-full bg-zinc-800/30 text-zinc-500 text-[10px] font-bold border border-zinc-800">
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-5 text-right font-mono font-bold text-lg ${tx.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                                            {tx.type === 'income' ? '+' : '-'} ₹{tx.amount.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ADD TRANSACTION MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                    <div className="bg-[#0c0c0c] border border-zinc-800 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">New Transaction</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-xs text-zinc-500 uppercase font-bold">Category</label>
                                <input 
                                    type="text" required
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 mt-1 text-white outline-none focus:border-blue-500"
                                    value={newTx.category}
                                    onChange={(e) => setNewTx({...newTx, category: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-zinc-500 uppercase font-bold">Amount (₹)</label>
                                    <input 
                                        type="number" required
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 mt-1 text-white outline-none focus:border-blue-500"
                                        value={newTx.amount}
                                        onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-zinc-500 uppercase font-bold">Type</label>
                                    <select 
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 mt-1 text-white outline-none cursor-pointer"
                                        onChange={(e) => setNewTx({...newTx, type: e.target.value})}
                                    >
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20">
                                Confirm Entry
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}