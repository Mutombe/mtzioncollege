import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Upload, Calendar, CheckCircle } from "lucide-react";
import { createRegistration } from "../../redux/registrationSlice";
import { registerForm } from "../../redux/registrationSlice";
import { registerGrade } from "../../redux/registrationSlice";
const { type, id } = useParams();

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.registration
  );

  const details = useSelector((state) => state.registration.details);

  useEffect(() => {
    dispatch(fetchDetails({ id, type }));
  }, [id, type, dispatch]);

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    parent_name: "",
    contact_number: "",
    email: "",
    grade: details.grade || null,
    form: details.form || null,
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
        [name]: [...formData.report_card_images, ...files],
      });
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type == "grade") {
      dispatch(registerGrade(formData));
    } else if (type === "forms") {
      dispatch(registerForm(formData));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md my-12">
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">
        Student Registration
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

const PersonalInfo = ({ formData, handleInputChange, onNext }) => (
  <motion.form
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
    />
    <InputField
      label="Student Date of Birth"
      type="date"
      name="date_of_birth"
      value={formData.date_of_birth}
      onChange={handleInputChange}
      required
    />
    <InputField
      label="Parent/Guardian Name"
      type="text"
      name="parent_name"
      value={formData.parent_name}
      onChange={handleInputChange}
      required
    />
    <InputField
      label="Parent/Guardian Number"
      type="tel"
      name="contact_number"
      value={formData.contact_number}
      onChange={handleInputChange}
      required
    />
    <InputField
      label="Parent/Guardian Email"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      required
    />
    <button
      onClick={onNext}
      className="w-full bg-blue-500 hover:bg-light-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      Next
    </button>
  </motion.form>
);

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
    <FileUpload
      label="Birth Certificate"
      name="birth_certificate"
      onChange={handleFileChange}
    />
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
      <FileUpload
        label="Report Card Images"
        name="report_card_images"
        multiple
        onChange={handleFileChange}
      />
    ) : (
      <FileUpload
        label="Report Card PDF"
        name="report_card_pdf"
        accept=".pdf"
        onChange={handleFileChange}
      />
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
            <strong>Grade Applying For:</strong> {formData.grade}
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
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </>
    )}
  </motion.div>
);

const InputField = ({ label, type, name, value, onChange, required }) => (
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

const FileUpload = ({ label, name, onChange, multiple, accept }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
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
            <input
              id={name}
              name={name}
              type="file"
              onChange={onChange}
              multiple={multiple}
              accept={accept}
              className="sr-only"
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
      </div>
    </div>
  </div>
);

export default RegistrationForm;
