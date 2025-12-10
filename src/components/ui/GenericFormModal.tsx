"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { X, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES DEFINITION (Ye zaroori hai TypeScript k liye) ---
interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface GenericFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: Field[];
  onSubmit: (data: any) => void;
  submitLabel?: string;
  initialData?: any; // <--- YEH LINE MISSING THI, ab error nahi ayega
}

// --- CUSTOM DROPDOWN ---
const CustomSelect = ({ label, options, value, onChange, placeholder, error }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-white border rounded-xl flex items-center justify-between outline-none text-left transition-all
          ${error ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-200 hover:border-indigo-300'}
          ${isOpen ? 'border-indigo-500 ring-4 ring-indigo-500/10' : ''}
        `}
      >
        <span className={`text-sm ${value ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
          {value || placeholder || "Select option"}
        </span>
        <ChevronDown 
            size={18} 
            className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
          <ul className="p-1.5 space-y-1">
            {options?.map((opt: string, i: number) => (
              <li
                key={i}
                onClick={() => handleSelect(opt)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors
                  ${value === opt 
                    ? 'bg-indigo-50 text-indigo-700 font-bold' 
                    : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'}
                `}
              >
                {opt}
                {value === opt && <Check size={16} className="text-indigo-600" />}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium flex items-center gap-1">
          * This field is required
        </p>
      )}
    </div>
  );
};

// --- MAIN MODAL COMPONENT ---
const GenericFormModal: React.FC<GenericFormModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  fields, 
  onSubmit, 
  submitLabel = "Save", 
  initialData = null 
}) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();

  useEffect(() => {
    if (isOpen) {
      reset(initialData || {});
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-50 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-500 mt-0.5">Please fill in the details below</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {fields.map((field, index) => (
            <div key={index}>
              {field.type === 'select' ? (
                <>
                  <input 
                    type="hidden" 
                    {...register(field.name, { required: field.required })} 
                  />
                  <CustomSelect 
                    label={field.label}
                    options={field.options}
                    value={watch(field.name)}
                    onChange={(val: any) => setValue(field.name, val, { shouldValidate: true })}
                    error={errors[field.name]}
                    placeholder="Select option"
                  />
                </>
              ) : (
                <>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                        {field.label}
                    </label>

                    {field.type === 'textarea' ? (
                        <textarea
                        {...register(field.name, { required: field.required })}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400 resize-none"
                        />
                    ) : (
                        <input
                        type={field.type || 'text'}
                        {...register(field.name, { required: field.required })}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400"
                        />
                    )}
                    
                    {errors[field.name] && (
                        <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium flex items-center gap-1">
                        * This field is required
                        </p>
                    )}
                </>
              )}
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericFormModal;