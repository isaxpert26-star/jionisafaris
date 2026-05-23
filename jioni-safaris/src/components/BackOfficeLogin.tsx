import React, { useState } from "react";
import { ShieldCheck, User, Lock, Eye, EyeOff, Sparkles, AlertCircle, ArrowLeft, KeySquare } from "lucide-react";

interface BackOfficeLoginProps {
  onLoginSuccess: (role: "admin" | "manager" | "support") => void;
  onCancel: () => void;
  selectedRoleAtStart: "admin" | "manager" | "support";
}

export const BackOfficeLogin: React.FC<BackOfficeLoginProps> = ({
  onLoginSuccess,
  onCancel,
  selectedRoleAtStart
}) => {
  const [role, setRole] = useState<"admin" | "manager" | "support">(selectedRoleAtStart);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Pre-configured staff credentials
  const accounts = {
    admin: { 
      username: "admin", 
      password: "safari2026", 
      label: "Super Admin", 
      swahiliLabel: "Msimamizi Mkuu",
      details: "Check reservation information, view audit logs, upload safari pictures, and add new packages" 
    },
    manager: { 
      username: "manager", 
      password: "manager2026", 
      label: "Tour Manager", 
      swahiliLabel: "Mratibu wa Safari",
      details: "Customize package base rates, edit schedules, and publish promotional media assets" 
    },
    support: { 
      username: "support", 
      password: "support2026", 
      label: "Customer Support", 
      swahiliLabel: "Huduma kwa Wateja",
      details: "Review customer support tickets, approve client reviews, and manage live testimonials" 
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const targetAccount = accounts[role];
    if (username.trim().toLowerCase() === targetAccount.username && password === targetAccount.password) {
      onLoginSuccess(role);
    } else {
      setErrorMsg(
        role === "admin" 
          ? "Imefeli! Jina au neno la siri si sahihi kwa Msimamizi Mkuu. (Username: admin, Password: safari2026)"
          : role === "manager"
          ? "Imefeli! Jina au neno la siri si sahihi kwa Mratibu wa Safari. (Username: manager, Password: manager2026)"
          : "Imefeli! Jina au neno la siri si sahihi kwa Huduma kwa Wateja. (Username: support, Password: support2026)"
      );
    }
  };

  const fillCredentials = () => {
    const target = accounts[role];
    setUsername(target.username);
    setPassword(target.password);
    setErrorMsg(null);
  };

  return (
    <div className="max-w-md mx-auto my-8 md:my-16 p-1" id="backoffice-login-panel">
      <div className="bg-[#0b2914] border border-[#e5a91a]/25 rounded-2xl shadow-2xl relative overflow-hidden">
        
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#ab4e24] via-[#e5a91a] to-[#f7d070]" />
        
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-[#e5a91a]/10 border border-[#e5a91a]/25 rounded-xl flex items-center justify-center text-[#e5a91a]">
              <KeySquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black font-display text-white tracking-wider uppercase">
                JIONI <span className="text-[#e5a91a]">SAFARIS</span>
              </h2>
              <p className="text-[10px] text-gray-300 font-mono tracking-widest uppercase">MTAWALA PORTAL / STAFF LOGIN</p>
            </div>
          </div>

          {/* Role selector buttons */}
          <div className="bg-[#071f0f] p-1 rounded-xl border border-white/5 grid grid-cols-3 gap-1">
            {(["admin", "manager", "support"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  setUsername("");
                  setPassword("");
                  setErrorMsg(null);
                }}
                className={`py-2 px-1 rounded-lg text-[9px] font-mono leading-tight font-bold uppercase transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  role === r
                    ? "bg-[#e5a91a] text-black"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{r === "admin" ? "👑 Admin" : r === "manager" ? "🐆 Manager" : "☎️ Support"}</span>
                <span className={`text-[7px] leading-none block font-sans font-normal opacity-80 ${role === r ? "text-black" : "text-gray-400"}`}>
                  {r === "admin" ? "Msimamizi" : r === "manager" ? "Mratibu" : "Huduma"}
                </span>
              </button>
            ))}
          </div>

          {/* Dynamic Role Description Card */}
          <div className="bg-[#071f0f]/50 border border-[#e5a91a]/10 p-3 rounded-lg text-[10px] text-gray-300 leading-normal">
            <span className="text-white font-bold block mb-1">
              Jukumu la {accounts[role].swahiliLabel} ({accounts[role].label}):
            </span>
            {accounts[role].details}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="leading-normal">{errorMsg}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-wider text-gray-300 flex justify-between">
                <span>Jina la Mtumiaji / Username</span>
                <span className="text-[#e5a91a] text-[9px] underline cursor-pointer" onClick={fillCredentials}>
                  Tumia akaunti ya majaribio
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder={accounts[role].username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#071f0f] border border-white/10 rounded-xl px-3 py-2 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#e5a91a] focus:ring-1 focus:ring-[#e5a91a]/30 font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-wider text-gray-300 block">
                Neno la Siri / Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#071f0f] border border-white/10 rounded-xl px-3 py-2 pl-10 pr-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#e5a91a] focus:ring-1 focus:ring-[#e5a91a]/30 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#e5a91a] hover:bg-[#b0934d] text-black font-bold uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer font-mono flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                Ingia Sasa / Sign In
              </button>
              
              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2 bg-transparent hover:bg-white/[0.02] border border-white/10 text-gray-400 hover:text-white uppercase text-[10px] tracking-wider rounded-xl transition-all cursor-pointer font-mono flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Rudi kwa Wasafiri (Back to Traveller)
              </button>
            </div>

          </form>

          {/* Guide Helper Footer */}
          <div className="pt-4 border-t border-white/5 text-center text-[9px] text-gray-400 font-mono">
            <span className="text-[#e5a91a]/85 flex justify-center items-center gap-1">
              <Sparkles className="w-3 h-3 animate-pulse" />
              Sifa za kuingilia (Demo Credentials):
            </span>
            <div className="mt-2 grid grid-cols-3 gap-2 bg-[#071f0f] p-2 rounded-lg text-left text-[8px] border border-white/5">
              <div>
                <strong className="text-gray-300 block">Super Admin:</strong>
                User: <span className="text-white">admin</span><br/>
                Pass: <span className="text-white">safari2026</span>
              </div>
              <div>
                <strong className="text-gray-300 block">Manager:</strong>
                User: <span className="text-white font-mono">manager</span><br/>
                Pass: <span className="text-white font-mono">manager2026</span>
              </div>
              <div>
                <strong className="text-gray-300 block">Support:</strong>
                User: <span className="text-white">support</span><br/>
                Pass: <span className="text-white">support2026</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
