import React, { useState, useEffect } from "react";
import { Menu, Zap, ShieldCheck, Eye, Search } from "lucide-react";
import logoImg from "../assets/zoro.png";

export default function Navbar({ isExpanded, setIsExpanded, role, setRole }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full h-18 z-[150] px-6 flex items-center justify-between transition-all duration-700 ease-in-out border-b ${isScrolled
                    ? "bg-black/40 backdrop-blur-xl border-white/5 py-2" // Glass effect
                    : "bg-[#090808] border-transparent py-4"             // Solid background
                }`}
        >
            <div className="flex items-center gap-4">
                {/* MENU TOGGLE */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-3 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors"
                >
                    <Menu size={24} />
                </button>

                {/* LOGO */}
                <div className="flex items-center gap-3 ml-4 ">
                    
                        <img
                            src={logoImg}
                            alt="Zorvyn Logo"
                            className="w-38 h-30 object-contain"
                        />
                    
                </div>
            </div>

            {/* ROLE SWITCHER */}
            <div className="flex items-center gap-2 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">


                <button
                    onClick={() => setRole("admin")}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${role === 'admin' ? 'bg-blue-600 text-white' : 'text-zinc-500'}`}
                >
                    <ShieldCheck size={14} /> Admin
                </button>
                <button
                    onClick={() => setRole("viewer")}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${role === 'viewer' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}
                >
                    <Eye size={14} /> Viewer
                </button>
            </div>
        </nav>
    );
}