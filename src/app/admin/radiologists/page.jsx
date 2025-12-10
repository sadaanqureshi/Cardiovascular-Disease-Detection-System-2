"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ReusableTable from '@/components/ui/ReusableTable';
import GenericFormModal from '@/components/ui/GenericFormModal';

export default function ManageRadiologists() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentRadiologist, setCurrentRadiologist] = useState(null);

  // --- MOCK DATA ---
  const [radiologistsData, setRadiologistsData] = useState([
    { id: 1, name: 'Dr. Jennifer Wong', email: 'j.wong@hospital.com', contact: '(555) 111-2222', reports: '248' },
    { id: 2, name: 'Dr. David Thompson', email: 'd.thompson@hospital.com', contact: '(555) 222-3333', reports: '192' },
    { id: 3, name: 'Dr. Rachel Kim', email: 'r.kim@hospital.com', contact: '(555) 333-4444', reports: '315' },
  ]);

  const columns = [
    { header: 'Radiologist Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Contact Number', accessor: 'contact' },
    { header: 'Reports Uploaded', accessor: 'reports' },
  ];

  // --- HANDLERS ---
  const handleDelete = (row) => {
    if(confirm(`Delete Radiologist ${row.name}?`)) {
        setRadiologistsData(radiologistsData.filter(r => r.id !== row.id));
    }
  };

  const handleEdit = (row) => {
    setCurrentRadiologist(row);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
      setCurrentRadiologist(null);
      setIsModalOpen(true);
  }

  const handleSaveRadiologist = (formData) => {
    if (currentRadiologist) {
        // Update
        setRadiologistsData(radiologistsData.map(r => 
            r.id === currentRadiologist.id 
            ? { ...r, name: formData.fullName, ...formData } 
            : r
        ));
    } else {
        // Add
        const newRad = {
            id: radiologistsData.length + 1,
            name: formData.fullName,
            ...formData,
            reports: '0' // Default
        };
        setRadiologistsData([...radiologistsData, newRad]);
    }
    setIsModalOpen(false);
    setCurrentRadiologist(null);
  };

  const radiologistFields = [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Dr. John Smith', required: true },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'radiologist@hospital.com', required: true },
    { name: 'contact', label: 'Contact Number', type: 'text', placeholder: '03001234567', required: true },
    { name: 'password', label: 'Password', type: 'password', placeholder: '........', required: !currentRadiologist },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="w-full lg:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <Header title="Manage Radiologists" onMenuClick={() => setSidebarOpen(true)} />
        
        <ReusableTable 
          title="All Radiologists" 
          columns={columns} 
          data={radiologistsData} 
          actionLabel="Add New Radiologist"
          onAdd={openAddModal}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <GenericFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentRadiologist ? "Edit Radiologist" : "Add New Radiologist"}
          fields={radiologistFields}
          onSubmit={handleSaveRadiologist}
          submitLabel={currentRadiologist ? "Update Radiologist" : "Save Radiologist"}
          initialData={currentRadiologist ? {
              fullName: currentRadiologist.name,
              email: currentRadiologist.email,
              contact: currentRadiologist.contact
          } : null}
        />
      </main>
    </div>
  );
}