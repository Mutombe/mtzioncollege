import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, Clock } from 'lucide-react';
import LoadingPage from '../Loading/loading';
import { fetchForms } from '../../redux/formSlice';
import ErrorPage from '../Error/error';

const FormDetails = () => {
  const dispatch = useDispatch();
    const { branchId } = useParams() || localStorage.getItem("branchId");
    const { formId } = useParams();
  const { forms, loading, error } = useSelector((state) => state.form);
  const { branches, loading: branchLoading, error: branchError } = useSelector((state) => state.branch);
    
  useEffect(() => {
    if (!forms.length) {
      dispatch(fetchForms(branchId));
    }
  }, [dispatch, branchId, forms.length]);

  const currentForm = forms.find(form => form.id === Number(formId));
  const currentBranch = branches.find(branch => branch.id === Number(currentForm.branch));
  console.log("Subject Forms", currentForm.subjects)

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;
  if (!currentForm) return <ErrorPage error="Form not found." />;

  // Check if subjects exist and is an array
  const hasSubjects = Array.isArray(currentForm.subjects) && currentForm.subjects.length > 0;

  return (
    <div className="min-h-screen">
      <header className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{currentForm.name}</h1>
          <p className="text-xl text-blue-300">{currentBranch?.name}</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <InfoCard icon={<BookOpen />} title="Subjects" value={currentForm.subjects?.length || 8} />
            <InfoCard icon={<Users />} title="Students" value={currentForm?.students_count || 0} />
            <InfoCard icon={<Clock />} title="Class Hours" value={`${currentForm?.class_hours || 0} hrs/week`} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Subjects</h2>
          {hasSubjects ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentForm.subjects.map((subject) => (
                <li key={subject.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  {subject.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No subjects uploaded for this level yet.</p>
          )}
          <div className="mt-8 flex justify-between">
            <Link to={`/branches/${branchId}/grades`} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Back to Forms
            </Link>
            <Link to={`/register/form/${formId}/`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Register for this Form
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
    <div className="mr-4 text-blue-500">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default FormDetails;