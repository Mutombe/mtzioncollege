import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchForms } from "../../redux/formSlice";
import { Grid, List } from "lucide-react";
import LoadingPage from "../Loading/loading";
import ErrorPage from "../Error/error";
import { motion } from "framer-motion";
import { BookOpen, Users, SmilePlus } from "lucide-react";

const FormsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { branchId } = useParams();
  const { forms, loading, success, error } = useSelector((state) => state.form);
  const { branches, loading: branchLoading, error: branchError } = useSelector((state) => state.branch);

  const currentBranch = branches.find(branch => branch.id === Number(branchId));
  console.log("branches", branches);

  const [viewMode, setViewMode] = useState("grid");

  console.log("forms", forms);
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    if (!success && !loading) {
      dispatch(fetchForms({ branchId }));
    }
  }, [success, loading, dispatch, branchId]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error && branchError} />;
  }

  const handleRegister = (formId) => {
    navigate(`/branches/${branchId}/forms/${formId}/register`);
  };

  const handleDetails = (formId) => {
    navigate(`/branches/${branchId}/forms/${formId}/`);
  };

  const sortedAndFilteredGrades = forms
    .filter((form) => form.name.toLowerCase().includes(filterBy.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "students") return b.students - a.students;
      return 0;
    });

  return (
    <div className="min-h-screen  ">
      <header className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Select a Form</h1>
          <p className="text-xl text-blue-300">{currentBranch?.name}</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search grades..."
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-2 border border-bg-navy-800 rounded-md mr-4 text-gray-700"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
            >
              <option className="text-gray-700 rounded-md" value="name">
                Sort by Name
              </option>
              <option className="text-gray-700 rounded-md" value="students">
                Sort by Students
              </option>
            </select>
          </div>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="flex items-center bg-light-blue-500 text-white px-4 py-2 rounded-md "
          >
            {viewMode === "grid" ? (
              <List className="mr-2 text-blue-400" />
            ) : (
              <Grid className="mr-2 text-blue-400" />
            )}
            {viewMode === "grid" ? "List View" : "Grid View"}
          </button>
        </div>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAndFilteredGrades.map((form) => (
              <GradeCard
                key={form.id}
                form={form}
                onSelect={handleDetails}
                onSelectRegister={handleRegister}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAndFilteredGrades.map((form) => (
              <GradeListItem
                key={form.id}
                form={form}
                onSelect={handleDetails}
                onSelectRegister={handleRegister}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export const GradeCard = ({ form, onSelect, onSelectRegister }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
    onClick={() => onSelect(form.id)}
  >
    <div className="p-6">
      <div className="flex items-center justify-center mb-4">
        <BookOpen size={48} className="text-blue-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        {form.name}
      </h2>
      <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
        <div className="flex items-center">
          <Users size={18} className="mr-2 text-blue-300" />
          <span>{form.students_count} Enrolled Students</span>
        </div>
        <div className="flex items-center">
          <BookOpen size={18} className="mr-2 text-blue-300" />
          <span>{form.subjects && form.subjects.length ? form.subjects.length : 7} Subjects</span>
        </div>
      </div>
      <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
      <p className="text-gray-600 dark:text-gray-300 text-center">
        Click to view details
      </p>
      <motion.button whileHover={{ backgroundColor: '#1F2937' }} onClick={() => onSelectRegister(form.id)} className='bg-blue-500 bg-navy-blue-500 flex items-center text-white px-1 py-1 rounded-lg ml-4'>
          <motion.div whileHover={{ scale: 1.2, backgroundColor: '#1F2937', color: 'white', marginRight: '4px' }}>
            <SmilePlus size={18} className="mr-2 text-blue-100" />
            </motion.div>
            <span>Register</span>
        </motion.button>
      </div>
    </div>
  </motion.div>
);


export const GradeListItem = ({ form, onSelect, onSelectRegister}) => (
  <motion.div
    whileHover={{ backgroundColor: '#1D3557' }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer p-4"
    onClick={() => onSelect(form.id)}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <BookOpen size={24} className="text-blue-400 mr-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {form.name}
        </h2>
      </div>
      <div className="flex items-center text-gray-600 dark:text-gray-300">
        <Users size={18} className="mr-2 text-blue-400" />
        <span>{form.students_count} Students</span>
        <BookOpen size={18} className="ml-4 mr-2 text-blue-400" />
        <span>{form.subjects && form.subjects.length ? form.subjects.length : 7} Subjects</span>
        <motion.button whileHover={{ backgroundColor: '#1F2937' }} onClick={() => onSelectRegister(form.id)} className='bg-blue-500 bg-navy-blue-500 flex items-center text-white px-1 py-1 rounded-lg ml-4'>
          <motion.div whileHover={{ scale: 1.2, backgroundColor: '#1F2937', color: 'white', marginRight: '4px' }}>
            <SmilePlus size={18} className="mr-2 text-blue-100" />
            </motion.div>
            <span>Register</span>
        </motion.button>
      </div>
    </div>
  </motion.div>
);


export default FormsPage;
