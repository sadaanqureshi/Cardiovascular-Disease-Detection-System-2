"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ReusableTable from '@/components/ui/ReusableTable';
import GenericFormModal from '@/components/ui/GenericFormModal';

export default function ManagePatients() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  // --- 1. MOCK DOCTORS LIST (Dropdown ke liye) ---
  const doctorsList = [
    'Dr. Michael Chen', 
    'Dr. Sarah Wilson', 
    'Dr. James Lee', 
    'Dr. Emily Parker',
    'Dr. John Doe'
  ];

  // --- MOCK DATA (Patients with Assigned Doctors) ---
  const [patientsData, setPatientsData] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', age: 54, gender: 'Female', contact: '(555) 123-4567', address: '123 Main St, New York', assignedDoctor: 'Dr. Michael Chen' },
    { id: 2, name: 'Robert Williams', email: 'rob@example.com', age: 68, gender: 'Male', contact: '(555) 234-5678', address: '456 Oak Ave, California', assignedDoctor: 'Dr. Sarah Wilson' },
    { id: 3, name: 'Maria Garcia', email: 'maria@example.com', age: 45, gender: 'Female', contact: '(555) 345-6789', address: '789 Pine Ln, Texas', assignedDoctor: 'Dr. Michael Chen' },
  ]);

  const columns = [
    { header: 'Patient Name', accessor: 'name' },
    { header: 'Assigned Doctor', accessor: 'assignedDoctor' }, // New Column
    { header: 'Email', accessor: 'email' },
    { header: 'Age', accessor: 'age' },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Contact', accessor: 'contact' },
  ];

  // --- HANDLERS ---
  const handleDelete = (row) => {
    if(confirm(`Delete patient ${row.name}?`)) {
        setPatientsData(patientsData.filter(p => p.id !== row.id));
    }
  };

  const handleEdit = (row) => {
    setCurrentPatient(row);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
      setCurrentPatient(null);
      setIsModalOpen(true);
  }

  const handleSavePatient = (formData) => {
    if (currentPatient) {
        // Update Logic
        setPatientsData(patientsData.map(p => 
            p.id === currentPatient.id 
            ? { ...p, name: formData.fullName, ...formData } 
            : p
        ));
    } else {
        // Add Logic
        const newPatient = {
            id: patientsData.length + 1,
            name: formData.fullName,
            ...formData
        };
        setPatientsData([...patientsData, newPatient]);
    }
    setIsModalOpen(false);
    setCurrentPatient(null);
  };

  const patientFields = [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Smith', required: true },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'patient@example.com', required: true },
    { name: 'age', label: 'Age', type: 'number', placeholder: '45', required: true },
    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
    { name: 'contact', label: 'Contact Number', type: 'text', placeholder: '03001234567', required: true },
    { name: 'address', label: 'Address', type: 'textarea', placeholder: "Enter patient's address", required: true },
    
    // --- 2. ASSIGN DOCTOR DROPDOWN ---
    { 
        name: 'assignedDoctor', 
        label: 'Assign Doctor', 
        type: 'select', 
        options: doctorsList, // Yahan wo list pass ki hai
        required: true 
    },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="w-full lg:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <Header title="Manage Patients" onMenuClick={() => setSidebarOpen(true)} />
        
        <ReusableTable 
          title="All Patients" 
          columns={columns} 
          data={patientsData} 
          actionLabel="Add New Patient"
          onAdd={openAddModal}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <GenericFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentPatient ? "Edit Patient" : "Add New Patient"}
          fields={patientFields}
          onSubmit={handleSavePatient}
          submitLabel={currentPatient ? "Update Patient" : "Save Patient"}
          
          // --- 3. Initial Data Mapping ---
          initialData={currentPatient ? {
              fullName: currentPatient.name,
              email: currentPatient.email,
              age: currentPatient.age,
              gender: currentPatient.gender,
              contact: currentPatient.contact,
              address: currentPatient.address,
              assignedDoctor: currentPatient.assignedDoctor // Edit ke waqt pre-select hoga
          } : null}
        />
      </main>
    </div>
  );
}