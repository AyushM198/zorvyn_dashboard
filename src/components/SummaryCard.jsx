import React, { useState } from "react";
import { IndianRupee, DollarSign } from "lucide-react";

const StatCard = ({ label, value, icon, color }) => {
    const [isUsd, setIsUsd] = useState(false);

    const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));
    const conversionRate = 83;
    
    const displayValue = isUsd
        ? (numericValue / conversionRate).toLocaleString('en-US', { 
            style: 'currency', 
            currency: 'USD', 
            maximumFractionDigits: 0 
          })
        : value;

    return (
        <div className="reveal relative p-8 rounded-[2.5rem] overflow-hidden group transition-all duration-500 shadow-2xl hover:scale-110 hover:shadow-gray-500/10 light:hover:shadow-gray-500/20 transform-gpu origin-center">

            <div className="absolute inset-0 bg-white/[0.05] light:bg-zinc-200/60 backdrop-blur-[40px] -z-10 transition-colors duration-500" />
            
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] light:from-white/40 via-transparent to-transparent -z-10" />
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.1] light:border-black/[0.05] pointer-events-none -z-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] light:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    {/* Adaptive Icon Container */}
                    <div className="p-3 bg-white/[0.07] light:bg-black/[0.05] border border-white/[0.1] light:border-black/[0.05] rounded-2xl text-zinc-300 light:text-zinc-600 group-hover:text-white light:group-hover:text-zinc-900 transition-all duration-500">
                        {icon}
                    </div>

                    <button
                        onClick={() => setIsUsd(!isUsd)}
                        className="relative p-5 hover:bg-white/10 light:hover:bg-black/5 rounded-full transition-all active:scale-90 group/btn flex items-center justify-center overflow-hidden"
                    >
                        <DollarSign
                            size={18}
                            className={`absolute transition-all duration-500 ease-out ${isUsd
                                    ? "opacity-100 rotate-0 scale-100 text-blue-400"
                                    : "opacity-0 -rotate-180 scale-50 text-zinc-600"
                                }`}
                        />
                        <IndianRupee
                            size={18}
                            className={`absolute transition-all duration-500 ease-out ${!isUsd
                                    ? "opacity-100 rotate-0 scale-100 text-emerald-400 light:text-emerald-600"
                                    : "opacity-0 rotate-180 scale-50 text-zinc-600"
                                }`}
                        />
                    </button>
                </div>

                <div className="h-16 flex flex-col justify-end overflow-visible">
                    {/* Adaptive Label Color */}
                    <h2 className="text-white/40 light:text-zinc-500 text-[10px] font-black tracking-[0.15em] uppercase mb-4 transition-colors">
                        {label} {isUsd ? "(USD)" : "(INR)"}
                    </h2>
                    
                    {/* Adaptive Amount Color */}
                    <p className={`leading-none font-black tracking-tighter transition-all duration-500 text-3xl group-hover:text-4xl ${
                        color === 'text-white' ? 'text-white light:text-zinc-900' : color
                    }`}>
                        {displayValue}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;