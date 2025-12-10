"use client";
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Stethoscope, ShieldCheck, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Routing ke liye

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('doctor'); // Default selected role
  const [loading, setLoading] = useState(false);

  // Form Submission Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Page refresh roko
    setLoading(true); // Spinner dikhao
    
    // Simulate Network Request (1.5 seconds delay)
    setTimeout(() => {
        // Role based redirection logic
        if (role === 'admin') {
            router.push('/admin/dashboard');
        } else if (role === 'doctor') {
            router.push('/doctor/dashboard');
        } else if (role === 'radiologist') {
            // Radiologist ka landing page 'Upload' rakha hai humne
            router.push('/radiologist/upload'); 
        }
        
        setLoading(false); 
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* --- LEFT SIDE: LOGIN FORM --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 transition-all duration-300">
        <div className="w-full max-w-md space-y-8">
            
            {/* Mobile Logo (Visible only on small screens) */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
                <div className="bg-indigo-600 p-2 rounded-lg text-white">
                    <Stethoscope size={24} />
                </div>
                <span className="text-2xl font-extrabold text-slate-800 tracking-tight">MediPortal</span>
            </div>

            {/* Header Text */}
            <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
                <p className="mt-2 text-slate-500">Please select your role and sign in.</p>
            </div>

            {/* Role Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-xl">
                {['admin', 'doctor', 'radiologist'].map((r) => (
                    <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
                            role === r 
                            ? 'bg-white text-indigo-600 shadow-sm border border-slate-100 ring-1 ring-black/5' 
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                        {r}
                    </button>
                ))}
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
                
                {/* Email Input */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail size={20} className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input 
                            type="email" 
                            placeholder="user@hospital.com" // Dummy placeholder
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400"
                            required
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-slate-700">Password</label>
                        <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">Forgot password?</a>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={20} className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input 
                            type="password" 
                            placeholder="••••••••" // Dummy placeholder
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400"
                            required
                        />
                    </div>
                </div>

                {/* Action Button */}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>Sign in as {role.charAt(0).toUpperCase() + role.slice(1)} <ArrowRight size={18} /></>
                    )}
                </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-slate-500">
                Don't have an account? <span className="font-semibold text-slate-400 cursor-not-allowed">Contact Admin</span>
            </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: BRANDING (Desktop Only) --- */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 relative overflow-hidden items-center justify-center p-12 text-white">
        
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-20 -translate-x-20"></div>

        <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                    <Stethoscope size={32} className="text-white" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">MediPortal</h1>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 leading-tight">
                Streamline your healthcare management with AI precision.
            </h2>
            
            <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all cursor-default">
                    <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-300">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold">AI-Powered Diagnostics</h3>
                        <p className="text-sm text-indigo-100">Real-time risk assessment for patients.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all cursor-default">
                    <div className="bg-amber-500/20 p-2 rounded-lg text-amber-300">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold">Secure & Confidential</h3>
                        <p className="text-sm text-indigo-100">Enterprise-grade security for medical data.</p>
                    </div>
                </div>
            </div>

            <p className="mt-12 text-indigo-200 text-sm">© 2025 MediPortal Inc. All rights reserved.</p>
        </div>
      </div>

    </div>
  );
}