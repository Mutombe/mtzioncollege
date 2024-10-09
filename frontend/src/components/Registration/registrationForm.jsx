import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Upload, CheckCircle, FileText } from "lucide-react";
import { registerForm } from "../../redux/registrationSlice";
import { registerGrade } from "../../redux/registrationSlice"; 
import { useDropzone } from 'react-dropzone';
import { useCallback } from "react";

const RegistrationForm = () => {

  const [step, setStep] = useState(1);
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.registration
  );

  const { grades } = useSelector((state) => state.grade);
  const { forms, loading: form_loading, error: form_error } = useSelector((state) => state.form);
  

  const currentGrade = grades.find(grade => grade.id === Number(id));
  const currentForm = forms.find(form => form.id === Number(id));

  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    parent_name: "",
    contact_number: "",
    email: "",
    grade: currentGrade || null,
    form: currentForm || null,
    previous_school: "",
    last_grade_completed: "",
    transfer_letter: null,
    birth_certificate: null,
    report_card_type: "IMAGES",
    report_card_images: [],
    report_card_pdf: null,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "report_card_images") {
      setFormData({
        ...formData,
        [name]: [...(formData.report_card_images || []), ...files],
      });
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  
    // Append text fields
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'string') {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    // Append file fields
    if (formData.transfer_letter) formDataToSend.append('transfer_letter', formData.transfer_letter);
    if (formData.birth_certificate) formDataToSend.append('birth_certificate', formData.birth_certificate);
    
    if (formData.report_card_type === 'IMAGES') {
      formData.report_card_images.forEach((file, index) => {
        formDataToSend.append(`report_card_images[${index}]`, file);
      });
    } else if (formData.report_card_pdf) {
      formDataToSend.append('report_card_pdf', formData.report_card_pdf);
    }
  
    if (currentGrade) {
      dispatch(registerGrade({grade_id: currentGrade.id, registrationData: formDataToSend}));
    } else if (currentForm) {
      dispatch(registerForm({form_id: currentForm.id, registrationData: formDataToSend}));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md my-12">
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">
       
        <span className="text-blue-400">{currentGrade ? currentGrade?.name : currentForm?.name}</span> Registration
      </h2>
      <ProgressBar currentStep={step} />
      {step === 1 && (
        <PersonalInfo
          formData={formData}
          handleInputChange={handleInputChange}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <AcademicInfo
          formData={formData}
          handleInputChange={handleInputChange}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}
      {step === 3 && (
        <DocumentUpload
          formData={formData}
          handleFileChange={handleFileChange}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}
      {step === 4 && (
        <Confirmation
          formData={formData}
          onSubmit={handleSubmit}
          onPrev={prevStep}
          loading={loading}
          success={success}
          error={error}
        />
      )}
    </div>
  );
};

const ProgressBar = ({ currentStep }) => (
  <div className="flex justify-between mb-8">
    {[1, 2, 3, 4].map((step) => (
      <div
        key={step}
        className={`w-1/4 text-center ${
          currentStep >= step ? "text-blue-500" : "text-gray-400"
        }`}
      >
        <div
          className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-2 ${
            currentStep >= step
              ? "border-light-blue-500 bg-blue-100"
              : "border-gray-300"
          }`}
        >
          {step}
        </div>
        <div className="mt-2 text-gray-400">Step {step}</div>
      </div>
    ))}
  </div>
);

const PersonalInfo = ({ formData, handleInputChange, onNext }) => {
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    if (!formData.full_name) newErrors.full_name = "Full name is required";
    if (!formData.date_of_birth) newErrors.date_of_birth = "Date of birth is required";
    if (!formData.parent_name) newErrors.parent_name = "Parent/Guardian name is required";
    if (!formData.contact_number) newErrors.contact_number = "Contact number is required";
    if (!formData.email) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      onNext();
    }
  };

  return (
    <motion.form
      onSubmit={handleNext}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <p className="text-lg font-bold text-navy-900 dark:text-white mb-2">
        Personal Information
      </p>
      <InputField
        label="Student Full Name"
        type="text"
        name="full_name"
        value={formData.full_name}
        onChange={handleInputChange}
        required
        error={errors.full_name}
      />
      <InputField
        label="Student Date of Birth"
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleInputChange}
        required
        error={errors.date_of_birth}
      />
      <InputField
        label="Parent/Guardian Name"
        type="text"
        name="parent_name"
        value={formData.parent_name}
        onChange={handleInputChange}
        required
        error={errors.parent_name}
      />
      <InputField
        label="Parent/Guardian Number"
        type="tel"
        name="contact_number"
        value={formData.contact_number}
        onChange={handleInputChange}
        required
        error={errors.contact_number}
      />
      <InputField
        label="Parent/Guardian Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        error={errors.email}
      />
      <button
        onClick={onNext}
        className="w-full bg-blue-500 hover:bg-light-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </motion.form>
  )
};

const AcademicInfo = ({ formData, handleInputChange, onNext, onPrev }) => (
  <motion.form
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-4"
  >
    <p className="text-lg font-bold text-navy-900 dark:text-white mb-2">
      Academic Information
    </p>
    <InputField
      label="Previous School (if applicable)"
      type="text"
      name="previous_school"
      value={formData.previous_school}
      onChange={handleInputChange}
    />
    <InputField
      label="Last Grade/Form Completed"
      type="text"
      name="last_grade_completed"
      value={formData.last_grade_completed}
      onChange={handleInputChange}
    />
    <div className="flex justify-between">
      <button
        onClick={onPrev}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  </motion.form>
);

const DocumentUpload = ({ formData, handleFileChange, onNext, onPrev }) => (
  <motion.form
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-4"
  >
    <p className="text-lg font-bold text-navy-900 dark:text-white mb-2">
      Document Upload
    </p>
    <FileUpload
      label="Transfer Letter"
      name="transfer_letter"
      onChange={handleFileChange}
    />
    {formData.transfer_letter && <FileList files={formData.transfer_letter} />}

    <FileUpload
      label="Birth Certificate"
      name="birth_certificate"
      onChange={handleFileChange}
    />
    {formData.birth_certificate && <FileList files={formData.birth_certificate} />}
    
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Report Card Type
      </label>
      <select
        name="report_card_type"
        value={formData.report_card_type}
        onChange={handleFileChange}
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500 text-black"
      >
        <option value="IMAGES" className="text-blue-500 rounded-lg">
          Images
        </option>
        <option value="PDF" className="text-blue-500 rounded-lg">
          PDF
        </option>
      </select>
    </div>
    {formData.report_card_type === "IMAGES" ? (
        <>
          <FileUpload
            label="Report Card Images"
            name="report_card_images"
            multiple
            onChange={handleFileChange}
          />
          {formData.report_card_images.length > 0 && <FileList files={formData.report_card_images} />}
        </>
      ) : (
        <>
          <FileUpload
            label="Report Card PDF"
            name="report_card_pdf"
            accept=".pdf"
            onChange={handleFileChange}
          />
          {formData.report_card_pdf && <FileList files={formData.report_card_pdf} />}
        </>
      )}
    <div className="flex justify-between">
      <button
        onClick={onPrev}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Review & Submit
      </button>
    </div>
  </motion.form>
);

const Confirmation = ({
  formData,
  onSubmit,
  onPrev,
  loading,
  success,
  error,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-center"
  >
    {success ? (
      <>
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">
          Application Submitted!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for applying to Mt Zion College. We will review your
          application and contact you soon.
        </p>
      </>
    ) : (
      <>
        <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">
          Review Your Information
        </h3>
        <div className="text-left mb-6">
          <p>
            <strong>Full Name:</strong> {formData.full_name}
          </p>
          <p>
            <strong>Date of Birth:</strong> {formData.date_of_birth}
          </p>
          <p>
            <strong>Parent/Guardian Name:</strong> {formData.parent_name}
          </p>
          <p>
            <strong>Contact Number:</strong> {formData.contact_number}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Previous School:</strong>{" "}
            {formData.previous_school || "N/A"}
          </p>
          <p>
            <strong>Last Grade Completed:</strong>{" "}
            {formData.last_grade_completed || "N/A"}
          </p>
          <p>
            <strong>Documents Uploaded:</strong> Transfer Letter, Birth
            Certificate, Report Card
          </p>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between">
          <button
            onClick={onPrev}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={onSubmit}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </>
    )}
  </motion.div>
);

const InputField = ({ label, type, name, value, onChange, required, error }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {label}
    </label>
    <input
      placeholder={label}
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, required }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-black dark:text-gray-300 mb-1 "
    >
      {label}
    </label>
    <select
      placeholder={label}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      <option value="" className="text-black rounded-lg">
        Select an option
      </option>
      {options.map((option) => (
        <option
          className="text-blue-500 rounded-lg"
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  </div>
);



const FileUpload = ({ label, name, onChange, multiple, accept }) => {
  const onDrop = useCallback((acceptedFiles) => {
    onChange({ target: { name, files: acceptedFiles } });
  }, [onChange, name]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple, accept });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div {...getRootProps()} className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${isDragActive ? 'bg-blue-50' : ''}`}>
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <input {...getInputProps()} />
            <p>{isDragActive ? "Drop the files here" : "Drag 'n' drop some files here, or click to select files"}</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
        </div>
      </div>
    </div>
  );
};

const FileList = ({ files }) => (
  <ul className="mt-2 divide-y divide-gray-200">
    {files.map((file, index) => (
      <li key={index} className="py-2 flex items-center">
        <FileText className="h-5 w-5 text-gray-400 mr-2" />
        <span className="text-sm text-gray-500">{file.name}</span>
      </li>
    ))}
  </ul>
);

export default RegistrationForm;
