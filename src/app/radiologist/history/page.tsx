"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import GenericFormModal from '@/components/ui/GenericFormModal';
import ReusableTable from '@/components/ui/ReusableTable';

// Data Interface
interface UploadRecord {
  id: number;
  patientName: string;
  reportType: string;
  uploadDate: string;
  status: string;
  notes?: string;
}

export default function UploadHistory() {
  const [activeTab, setActiveTab] = useState('All');
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile Sidebar State
  
  // Modal State
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<UploadRecord | null>(null);

  // Mock Data
  const uploads: UploadRecord[] = [
    { id: 1, patientName: 'Sarah Johnson', reportType: 'ECG', uploadDate: 'Oct 25, 2025', status: 'Processed', notes: 'Normal sinus rhythm detected.' },
    { id: 2, patientName: 'Robert Williams', reportType: 'Blood Test', uploadDate: 'Oct 24, 2025', status: 'Pending AI', notes: 'Awaiting lab confirmation.' },
    { id: 3, patientName: 'Maria Garcia', reportType: 'X-Ray', uploadDate: 'Oct 23, 2025', status: 'Processed', notes: 'Clear chest x-ray.' },
  ];

  const handleViewDetails = (record: any) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const columns = [
    { header: 'Patient Name', accessor: 'patientName' },
    { header: 'Report Type', accessor: 'reportType' },
    { header: 'Upload Date', accessor: 'uploadDate' },
    { header: 'Status', accessor: 'status' },
  ];

  const viewFields = selectedRecord ? [
    { name: 'patientName', label: 'Patient Name', type: 'text', defaultValue: selectedRecord.patientName, disabled: true, required: false },
    { name: 'reportType', label: 'Report Type', type: 'text', defaultValue: selectedRecord.reportType, disabled: true, required: false },
    { name: 'uploadDate', label: 'Date Uploaded', type: 'text', defaultValue: selectedRecord.uploadDate, disabled: true, required: false },
    { name: 'status', label: 'Current Status', type: 'text', defaultValue: selectedRecord.status, disabled: true, required: false },
    { name: 'notes', label: 'Notes / Observations', type: 'textarea', defaultValue: selectedRecord.notes || 'No notes added.', disabled: true, required: false }
  ] : [];

  const filteredData = uploads.filter(u => activeTab === 'All' || u.status === activeTab);

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar 
        role="radiologist" 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <main className="w-full lg:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <Header 
            title="Upload History" 
            onMenuClick={() => setSidebarOpen(true)} 
        />

        {/* Modern Filter Tabs */}
        <div className="mb-8">
            <div className="inline-flex p-1.5 bg-white border border-slate-100 rounded-xl shadow-sm">
                {['All', 'Pending AI', 'Processed'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            activeTab === tab 
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                            : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Reusable Table */}
        <ReusableTable 
            title={activeTab === 'All' ? 'All Uploads' : `${activeTab} Reports`}
            columns={columns}
            data={filteredData}
            onView={handleViewDetails}
        />

        {/* View Details Modal */}
        <GenericFormModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            title="Report Details"
            fields={viewFields}
            onSubmit={() => setIsViewModalOpen(false)}
            submitLabel="Close"
        />

      </main>
    </div>
  );
}