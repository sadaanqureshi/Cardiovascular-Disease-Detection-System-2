"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StatsCard from '@/components/ui/StatsCard';
import ReusableTable from '@/components/ui/ReusableTable';
import { Users, Stethoscope, FileText, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Dummy Data for Recent Assignments
  const recentAssignments = [
    { name: 'Sarah Johnson', doctor: 'Dr. Michael Chen', status: 'Pending' },
    { name: 'Robert Williams', doctor: 'Dr. Emily Parker', status: 'Completed' },
    { name: 'Maria Garcia', doctor: 'Dr. Michael Chen', status: 'In Progress' },
    { name: 'James Davis', doctor: 'Dr. Sarah Wilson', status: 'Pending' },
  ];

  const columns = [
    { header: 'Patient Name', accessor: 'name' },
    { header: 'Assigned Doctor', accessor: 'doctor' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      {/* Mobile Responsive Sidebar */}
      <Sidebar 
        role="admin" 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content - lg:ml-64 handles desktop margin */}
      <main className="w-full lg:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        
        <Header 
          title="Admin Dashboard" 
          onMenuClick={() => setSidebarOpen(true)} 
        />

        {/* Stats Grid - Responsive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Total Doctors" value="24" icon={Stethoscope} colorClass="text-indigo-600" />
          <StatsCard title="Total Patients" value="156" icon={Users} colorClass="text-emerald-600" />
          <StatsCard title="Total Reports" value="342" icon={FileText} colorClass="text-amber-600" />
          <StatsCard title="Critical Cases" value="8" icon={AlertCircle} colorClass="text-red-600" />
        </div>

        {/* Recent Assignments Table */}
        <ReusableTable 
          title="Recent Patient Assignments" 
          columns={columns} 
          data={recentAssignments} 
          // actionLabel="Assign New"
          // onAdd={() => alert("Redirect to assignment page")} // Example action
        />
      </main>
    </div>
  );
}