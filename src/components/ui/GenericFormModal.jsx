"use client";

import React from 'react';

import { useForm } from 'react-hook-form';

import { X } from 'lucide-react';



const GenericFormModal = ({ isOpen, onClose, title, fields, onSubmit, submitLabel = "Save" }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();



  if (!isOpen) return null;



  const handleFormSubmit = (data) => {

    onSubmit(data);

    reset();

    onClose();

  };



  return (

    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">

      {/* Backdrop */}

      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />



      {/* Modal Content */}

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100">

       

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b border-slate-50 bg-slate-50/50">

          <div>

            <h3 className="text-lg font-bold text-slate-800">{title}</h3>

            <p className="text-sm text-slate-500 mt-0.5">Please fill in the details below</p>

          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">

            <X size={20} />

          </button>

        </div>



        {/* Form Body */}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">

          {fields.map((field, index) => (

            <div key={index}>

              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">

                {field.label}

              </label>

             

              {field.type === 'select' ? (

                <div className="relative">

                    <select

                      {...register(field.name, { required: field.required })}

                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm text-slate-900 appearance-none"

                    >

                      <option value="" className="text-slate-400">Select option</option>

                      {field.options?.map((opt, i) => (

                        <option key={i} value={opt} className="text-slate-900 py-2">{opt}</option>

                      ))}

                    </select>

                    {/* Custom Dropdown Arrow could go here */}

                </div>

              ) : field.type === 'textarea' ? (

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

            </div>

          ))}



          {/* Footer */}

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