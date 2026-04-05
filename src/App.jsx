import React, { useState } from "react";
import Dashboard from './components/Dashboard';
import TransactionsPage from './components/Transactions';
import Insight from './components/Insight';
import Sidebar from './components/Sidebar'; 
import Navbar from './components/Navbar';

function App() {
  const [currentPage, setPage] = useState("dashboard");
  const [role, setRole] = useState("admin");
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sidebarIsActive = isExpanded || isHovered;

  const [transactions, setTransactions] = useState([
    
    { id: 1, date: "2026-04-02", amount: 48000, category: "Project Completion", type: "income", status: "Completed" },
    { id: 2, date: "2026-04-01", amount: 12500, category: "Office Supplies", type: "expense", status: "Completed" },   
    { id: 3, date: "2026-03-15", amount: 35000, category: "Consulting", type: "income", status: "Completed" },
    { id: 4, date: "2026-03-05", amount: 8000, category: "Utility Bills", type: "expense", status: "Completed" },
    { id: 5, date: "2026-02-20", amount: 42000, category: "Client Retainer", type: "income", status: "Completed" },
    { id: 6, date: "2026-02-02", amount: 15000, category: "Marketing Ads", type: "expense", status: "Completed" },
    { id: 7, date: "2026-01-25", amount: 31000, category: "Software Sales", type: "income", status: "Completed" },
    { id: 8, date: "2026-01-12", amount: 4500, category: "Cloud Hosting", type: "expense", status: "Completed" },
    { id: 9, date: "2025-12-15", amount: 55000, category: "Year-End Bonus", type: "income", status: "Completed" },
    { id: 10, date: "2025-12-05", amount: 20000, category: "Hardware Buy", type: "expense", status: "Completed" },
    { id: 11, date: "2025-11-20", amount: 28000, category: "Ad Revenue", type: "income", status: "Completed" },
    { id: 12, date: "2025-11-05", amount: 7000, category: "Travel", type: "expense", status: "Completed" }
  ]);

  const addTransaction = (newTx) => {
    if (role !== "admin") return;
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#121315] flex flex-col overflow-x-hidden">
      
    
      <Navbar
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        role={role}
        setRole={setRole}
      />

      <div className="flex flex-1 pt-20 relative"> 
        <Sidebar 
          currentPage={currentPage} 
          setPage={setPage} 
          setIsHovered={setIsHovered}
          sidebarIsActive={sidebarIsActive}
        />
        <main 
          className={`flex-1 transition-all duration-500 ease-in-out ${
            isExpanded ? "ml-[260px]" : "ml-[80px]"
          }`}
        >
          <div className="max-w-[1400px] mx-auto p-4 md:p-10">
            {currentPage === "dashboard" && (
              <Dashboard role={role} transactions={transactions} />
            )}
            
            {currentPage === "transactions" && (
              <TransactionsPage 
                role={role} 
                transactions={transactions} 
                onAdd={addTransaction} 
              />
            )}
            
            {currentPage === "insights" && (
              <Insight role={role} transactions={transactions} />
            )}
          </div>
        </main>
      </div>

      {/* GLOBAL VIEW-ONLY INDICATOR */}
      {role === "viewer" && (
        <div className="fixed bottom-8 right-8 z-[200] pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl shadow-amber-900/20">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] leading-none">
                View Only
              </span>
              <span className="text-zinc-500 text-[9px] font-medium mt-0.5">
                Editing Restricted
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;