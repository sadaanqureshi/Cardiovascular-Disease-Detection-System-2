"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header'; // Header add kiya taake mobile toggle chale
import { AlertCircle, UserPlus, Bell, CheckCircle, Trash2 } from 'lucide-react';

export default function Notifications() {
  const [allRead, setAllRead] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const notifications = [
    {
        id: 1,
        title: 'Critical AI Result Ready',
        desc: 'Patient Sarah Johnson has a 92% risk of cardiovascular disease detected',
        time: '5 mins ago',
        type: 'critical',
        icon: AlertCircle,
        color: 'text-rose-600 bg-rose-50 border-rose-100'
    },
    {
        id: 2,
        title: 'New Patient Assigned',
        desc: 'Admin assigned you Robert Williams for consultation',
        time: '1 hour ago',
        type: 'info',
        icon: UserPlus,
        color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    },
    {
        id: 3,
        title: 'Report Updated',
        desc: 'Lab results for Maria Garcia have been updated',
        time: '3 hours ago',
        type: 'normal',
        icon: Bell,
        color: 'text-slate-600 bg-slate-50 border-slate-100'
    }
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar 
        role="doctor" 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <main className="w-full lg:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <Header 
            title="Notifications" 
            onMenuClick={() => setSidebarOpen(true)} 
        />
        
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <p className="text-slate-500 font-medium">
                    {allRead ? 'You are all caught up!' : 'You have 3 unread notifications'}
                </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
                <button 
                    onClick={() => setAllRead(true)}
                    disabled={allRead}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        allRead 
                        ? 'bg-slate-50 text-slate-400 border-slate-100 cursor-default' 
                        : 'bg-white text-indigo-600 border-indigo-100 hover:bg-indigo-50 shadow-sm'
                    }`}
                >
                    <CheckCircle size={18} /> Mark All as Read
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-colors shadow-sm">
                    <Trash2 size={18} /> Clear All
                </button>
            </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Today</h3>
            
            {notifications.map((notif) => (
                <div key={notif.id} className={`group bg-white p-5 rounded-2xl border flex gap-5 transition-all duration-300 hover:shadow-md ${!allRead ? 'border-indigo-100 shadow-sm' : 'border-slate-100 opacity-75 hover:opacity-100'}`}>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${notif.color} transition-transform group-hover:scale-105`}>
                        <notif.icon size={22} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className={`font-bold text-base ${!allRead ? 'text-slate-800' : 'text-slate-500'}`}>
                                {notif.title}
                                {!allRead && <span className="inline-block w-2.5 h-2.5 bg-indigo-500 rounded-full ml-3 mb-0.5 shadow-sm shadow-indigo-200 animate-pulse"></span>}
                            </h4>
                            <span className="text-xs font-medium text-slate-400 whitespace-nowrap ml-2">{notif.time}</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{notif.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}