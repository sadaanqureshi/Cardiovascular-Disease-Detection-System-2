"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ReusableTable from '@/components/ui/ReusableTable';
import GenericFormModal from '@/components/ui/GenericFormModal';

export default function ManageDoctors() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  // --- MOCK DATA (Dummy Data) ---
  const [doctorsData, setDoctorsData] = useState([
    { id: 1, name: 'Dr. Michael Chen', specialization: 'Cardiology', email: 'm.chen@hospital.com', status: 'Active', contact: '03001234567', experience: 10 },
    { id: 2, name: 'Dr. Sarah Wilson', specialization: 'Neurology', email: 's.wilson@hospital.com', status: 'Active', contact: '03009876543', experience: 8 },
    { id: 3, name: 'Dr. James Lee', specialization: 'Pediatrics', email: 'j.lee@hospital.com', status: 'Inactive', contact: '03335556667', experience: 5 },
  ]);

  const columns = [
    { header: 'Doctor Name', accessor: 'name' },
    { header: 'Specialization', accessor: 'specialization' },
    { header: 'Email', accessor: 'email' },
    { header: 'Status', accessor: 'status' },
  ];

  // --- HANDLERS (Local Logic) ---
  
  // 1. Delete
  const handleDelete = (row) => {
    if(confirm(`Are you sure you want to delete ${row.name}?`)) {
        setDoctorsData(doctorsData.filter(doc => doc.id !== row.id));
        // alert("Doctor deleted successfully (Demo)");
    }
  };

  // 2. Open Edit Modal
  const handleEdit = (row) => {
    setCurrentDoctor(row);
    setIsModalOpen(true);
  };

  // 3. Open Add Modal
  const openAddModal = () => {
      setCurrentDoctor(null);
      setIsModalOpen(true);
  }

  // 4. Save (Add or Update)
  const handleSaveDoctor = (formData) => {
    if (currentDoctor) {
        // --- UPDATE LOGIC ---
        const updatedList = doctorsData.map(doc => 
            doc.id === currentDoctor.id 
            ? { ...doc, name: formData.fullName, ...formData } // Merge new data
            : doc
        );
        setDoctorsData(updatedList);
        // alert("Doctor updated successfully (Demo)");
    } else {
        // --- ADD LOGIC ---
        const newDoctor = {
            id: doctorsData.length + 1, // Generate fake ID
            name: formData.fullName,
            ...formData,
            status: formData.status || 'Active'
        };
        setDoctorsData([...doctorsData, newDoctor]);
        // alert("New Doctor added successfully (Demo)");
    }
    setIsModalOpen(false);
    setCurrentDoctor(null);
  };

  // Fields (Backend wali same fields)
  const doctorFields = [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Dr. John Smith', required: true },
    { name: 'specialization', label: 'Specialization', type: 'select', options: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'], required: true },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'doctor@hospital.com', required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'], required: true }, // Status Added
    { name: 'password', label: 'Password', type: 'password', placeholder: currentDoctor ? 'Leave blank to keep same' : '........', required: !currentDoctor },
    { name: 'contact', label: 'Contact Number', type: 'text', placeholder: '03001234567', required: true },
    { name: 'experience', label: 'Experience (Years)', type: 'number', placeholder: '5', required: true },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="w-full lg:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <Header title="Manage Doctors" onMenuClick={() => setSidebarOpen(true)} />
        
        <ReusableTable 
          title="All Doctors" 
          columns={columns} 
          data={doctorsData} 
          actionLabel="Add New Doctor"
          onAdd={openAddModal}
          onEdit={handleEdit}   
          onDelete={handleDelete} 
        />

        <GenericFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentDoctor ? "Edit Doctor" : "Add New Doctor"}
          fields={doctorFields}
          onSubmit={handleSaveDoctor}
          submitLabel={currentDoctor ? "Update Doctor" : "Save Doctor"}
          // Map data for Edit Mode
          initialData={currentDoctor ? {
              fullName: currentDoctor.name,
              email: currentDoctor.email,
              specialization: currentDoctor.specialization,
              contact: currentDoctor.contact,
              experience: currentDoctor.experience,
              status: currentDoctor.status
          } : null}
        />
      </main>
    </div>
  );
}