import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { 
    LayoutDashboard, ReceiptText, BarChart3, 
    Settings, LogOut, LifeBuoy, User, ChevronRight 
} from "lucide-react";

export default function Sidebar({ currentPage, setPage, setIsHovered, sidebarIsActive }) {
    const sidebarRef = useRef(null);
    const navRef = useRef(null);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    useEffect(() => {
        // Handle Sidebar Width
        gsap.to(sidebarRef.current, {
            width: sidebarIsActive ? 260 : 82,
            duration: 0.5,
            ease: "expo.out", // Smoother "Apple-like" easing
        });

        // Handle Text Opacity to prevent "popping"
        const labels = sidebarRef.current.querySelectorAll(".nav-label");
        if (sidebarIsActive) {
            gsap.to(labels, {
                opacity: 1,
                x: 0,
                display: "block",
                duration: 0.3,
                delay: 0.1, // Wait for width to expand slightly
                stagger: 0.05
            });
        } else {
            gsap.to(labels, {
                opacity: 0,
                x: -10,
                display: "none",
                duration: 0.2
            });
        }
    }, [sidebarIsActive]);

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={22} /> },
        { id: "transactions", label: "Transactions", icon: <ReceiptText size={22} /> },
        { id: "insights", label: "Insights", icon: <BarChart3 size={22} /> },
    ];

    return (
        <aside
            ref={sidebarRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowAccountMenu(false);
            }}
            /* REMOVED transition-all to fix lag. Added border-zinc-800 for clean edge */
            className="fixed left-0 border-r border-zinc-800 top-18 h-[calc(100vh-70px)] bg-[#090808] z-[200] flex flex-col overflow-visible shadow-2xl"
        >
            <nav className="flex-1 px-4 mt-16 space-y-2 overflow-y-auto overflow-x-hidden no-scrollbar">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setPage(item.id)}
                        className={`w-full flex items-center gap-4 p-3.5 rounded-xl group relative ${
                            currentPage === item.id
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                : "text-zinc-500 hover:bg-zinc-900/80 hover:text-zinc-200"
                        } transition-colors duration-200`}
                    >
                        <div className="shrink-0">{item.icon}</div>
                        
                        {/* CLASS nav-label handles the synchronized GSAP fade */}
                        <span className="nav-label text-sm font-bold tracking-tight whitespace-nowrap opacity-0 hidden">
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            {/* FIXED ACCOUNT SECTION: Added h-24 and shrink-0 to prevent movement */}
            <div className="relative h-24 shrink-0 p-4 border-t border-zinc-900 bg-[#090808] flex items-center">
                <button 
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-900 transition-all group"
                >
                    {/* User Avatar - Stays centered when collapsed */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-800 flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-white/10">
                        JD
                    </div>
                    
                    <div className="nav-label flex-col items-start opacity-0 hidden">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-zinc-200 whitespace-nowrap">John Doe</span>
                            <ChevronRight size={12} className={`text-zinc-600 transition-transform ${showAccountMenu ? 'rotate-90' : ''}`} />
                        </div>
                        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Admin</span>
                    </div>
                </button>

                {/* APPLE GLASS POPUP MENU */}
                {showAccountMenu && (
                    <div className="absolute bottom-24 left-4 w-56 p-2 rounded-2xl bg-white/[0.03] backdrop-blur-3xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 z-[300]">
                        <div className="flex flex-col gap-1">
                            <button className="flex items-center gap-3 p-2.5 text-sm text-zinc-300 hover:bg-white/10 rounded-xl transition-colors">
                                <User size={16} /> Profile
                            </button>
                            <button className="flex items-center gap-3 p-2.5 text-sm text-zinc-300 hover:bg-white/10 rounded-xl transition-colors">
                                <Settings size={16} /> Settings
                            </button>
                            <div className="h-px bg-white/10 my-1 mx-2" />
                            <button className="flex items-center gap-3 p-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                        <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white/[0.03] backdrop-blur-3xl border-r border-b border-white/[0.1] rotate-45" />
                    </div>
                )}
            </div>
        </aside>
    );
}