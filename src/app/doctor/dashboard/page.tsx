"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
// NOTE: Ensure the path is correct
import PatientDetailsModal, { Patient } from '@/components/doctor/PatientDetailsModal';

export default function DoctorDashboard() {
  const [filter, setFilter] = useState('All');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // --- MODAL STATE (Correctly Typed) ---
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  // `selectedPatient` can be a Patient object OR null
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Dummy Data (Typed Array)
  const patients: Patient[] = [
    { id: 1, name: 'Robert Williams', age: 68, gender: 'Male', status: 'Critical', risk: '92%', riskColor: 'bg-rose-500 shadow-rose-200' },
    { id: 2, name: 'Sarah Johnson', age: 54, gender: 'Female', status: 'Critical', risk: '88%', riskColor: 'bg-rose-500 shadow-rose-200' },
    { id: 3, name: 'James Davis', age: 61, gender: 'Male', status: 'Moderate', risk: '65%', riskColor: 'bg-amber-500 shadow-amber-200' },
    { id: 4, name: 'Linda Martinez', age: 72, gender: 'Female', status: 'Moderate', risk: '62%', riskColor: 'bg-amber-500 shadow-amber-200' },
    { id: 5, name: 'Michael Brown', age: 45, gender: 'Male', status: 'Normal', risk: '12%', riskColor: 'bg-emerald-500 shadow-emerald-200' },
  ];

  const filteredPatients = filter === 'All' ? patients : patients.filter(p => p.status === filter);

  // Handler (Typed Argument)
  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsOpen(true);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar 
        role="doctor" 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <main className="w-full lg:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <Header 
            title="Assigned Patients" 
            onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-slate-500 font-medium">Review patients sorted by severity level</p>
                
                <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm">
                    {['All', 'Critical', 'Moderate', 'Normal'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                filter === item 
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Patient Cards List */}
        <div className="space-y-4">
            {filteredPatients.map((patient) => (
                <div key={patient.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            {patient.name.charAt(0)}
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">{patient.name}</h3>
                            <p className="text-sm text-slate-500">{patient.age} years • {patient.gender}</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                        <span className={`${patient.riskColor} text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm min-w-[140px] text-center`}>
                            {patient.status} • {patient.risk}
                        </span>

                        <button 
                            onClick={() => handleViewDetails(patient)} 
                            className="w-full sm:w-auto bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 px-6 py-2 rounded-xl text-sm font-semibold transition-all"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            ))}
            
            {filteredPatients.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 border-dashed">
                    <p className="text-slate-400 font-medium">No patients found for this category.</p>
                </div>
            )}
        </div>

        {/* --- PATIENT DETAILS MODAL --- */}
        <PatientDetailsModal 
            isOpen={isDetailsOpen} 
            onClose={() => setIsDetailsOpen(false)} 
            patient={selectedPatient} 
        />

      </main>
    </div>
  );
}