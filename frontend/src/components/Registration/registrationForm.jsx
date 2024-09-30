import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Calendar, CheckCircle } from 'lucide-react';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Student Registration</h2>
      <ProgressBar currentStep={step} />
      {step === 1 && <PersonalInfo onNext={nextStep} />}
      {step === 2 && <AcademicInfo onNext={nextStep} onPrev={prevStep} />}
      {step === 3 && <DocumentUpload onNext={nextStep} onPrev={prevStep} />}
      {step === 4 && <Confirmation onPrev={prevStep} />}
    </div>
  );
};

const ProgressBar = ({ currentStep }) => (
  <div className="flex justify-between mb-8">
    {[1, 2, 3, 4].map((step) => (
      <div key={step} className={`w-1/4 text-center ${currentStep >= step ? 'text-light-blue-500' : 'text-gray-400'}`}>
        <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-2 ${currentStep >= step ? 'border-light-blue-500 bg-light-blue-100' : 'border-gray-300'}`}>
          {step}
        </div>
        <div className="mt-2">Step {step}</div>
      </div>
    ))}
  </div>
);

const PersonalInfo = ({ onNext }) => (
  <motion.form
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-4"
  >
    <InputField label="Full Name" type="text" name="fullName" required />
    <InputField label="Date of Birth" type="date" name="dob" required />
    <InputField label="Parent/Guardian Name" type="text" name="parentName" required />
    <InputField label="Contact Number" type="tel" name="contactNumber" required />
    <InputField label="Email Address" type="email" name="email" required />
    <button
      onClick={onNext}
      className="w-full bg-light-blue-500 hover:bg-light-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      Next
    </button>
  </motion.form>
);

const AcademicInfo = ({ onNext, onPrev }) => (
  <motion.form
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-4"
  >
    <SelectField
      label="Grade Applying For"
      name="grade"
      options={['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6']}
      required
    />
    <InputField label="Previous School (if applicable)" type="text" name="previousSchool" />
    <InputField label="Last Grade Completed" type="text" name="lastGrade" />
    <div className="flex justify-between">
      <button
        onClick={onPrev}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        className="bg-light-blue-500 hover:bg-light-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  </motion.form>
);

const DocumentUpload = ({ onNext, onPrev }) => (
  <motion.form
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-4"
  >
    <FileUpload label="Transfer Letter" name="transferLetter" />
    <FileUpload label="Report Card" name="reportCard" />
    <FileUpload label="Birth Certificate" name="birthCertificate" />
    <div className="flex justify-between">
      <button
        onClick={onPrev}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        className="bg-light-blue-500 hover:bg-light-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit Application
      </button>
    </div>
  </motion.form>
);

const Confirmation = ({ onPrev }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-center"
  >
    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
    <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">Application Submitted!</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-6">
      Thank you for applying to Mt Zion College. We will review your application and contact you soon.
    </p>
    <button
      onClick={onPrev}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
    >
      Back to Form
    </button>
  </motion.div>
);

const InputField = ({ label, type, name, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-light-blue-500"
    />
  </div>
);

const SelectField = ({ label, name, options, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <select
      name={name}
      id={name}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-light-blue-500"
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const FileUpload = ({ label, name }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <div className="space-y-1 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor={name}
            className="relative cursor-pointer bg-white rounded-md font-medium text-light-blue-600 hover:text-light-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500"
          >
            <span>Upload a file</span>
            <input id={name} name={name} type="file" className="sr-only" />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
      </div>
    </div>
  </div>
);

export default RegistrationForm;