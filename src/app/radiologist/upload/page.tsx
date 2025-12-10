"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header'; // Header Import kiya
import GenericFormModal from '@/components/ui/GenericFormModal';
import { UploadCloud, Plus, FileText } from 'lucide-react';

export default function UploadReport() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile Sidebar State

  // --- FIELDS CONFIGURATION ---
  const uploadFields = [
    { 
      name: 'patientId', 
      label: 'Select Assigned Patient', 
      type: 'select', 
      options: ['Sarah Johnson (P-101)', 'Robert Williams (P-102)', 'Maria Garcia (P-103)'], 
      required: true 
    },
    { 
      name: 'reportType', 
      label: 'Report Type', 
      type: 'select', 
      options: ['ECG', 'Blood Test', 'X-Ray', 'MRI', 'CT Scan'], 
      required: true 
    },
    { 
      name: 'fileAttachment', 
      label: 'Upload Report File (PDF/Image)', 
      type: 'file', 
      required: true 
    },
    { 
      name: 'notes', 
      label: 'Optional Notes', 
      type: 'textarea', 
      placeholder: 'Add clinical observations...', 
      required: false 
    },
  ];

  const handleUploadSubmit = (data: any) => {
    console.log("Uploading Report:", data);
    // API logic here
    alert("Report Uploaded Successfully!");
    setIsUploadModalOpen(false);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar 
        role="radiologist" 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <main className="w-full lg:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <Header 
            title="Upload Center" 
            onMenuClick={() => setSidebarOpen(true)} 
        />
        
        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-100 text-center transition-all duration-300 hover:shadow-md">
                
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 text-indigo-600 mb-6 shadow-sm shadow-indigo-100">
                    <UploadCloud size={40} />
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-3">Upload New Patient Report</h2>
                <p className="text-slate-500 max-w-lg mx-auto mb-10 leading-relaxed">
                    Select an assigned patient and upload high-quality scans or reports. 
                    Supported formats: <span className="font-semibold text-slate-600">PDF, JPG, PNG</span>.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1 active:scale-95"
                    >
                        <Plus size={20} /> Start New Upload
                    </button>
                    
                    <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 px-8 py-3.5 rounded-xl font-semibold transition-all">
                        <FileText size={20} /> View Guidelines
                    </button>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-slate-800">1.2k</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reports Uploaded</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-slate-800">100%</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Secure Transfer</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-slate-800">24/7</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Uptime</p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- MODAL --- */}
        <GenericFormModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            title="Upload New Report"
            fields={uploadFields}
            onSubmit={handleUploadSubmit}
            submitLabel="Submit Report"
        />

      </main>
    </div>
  );
}