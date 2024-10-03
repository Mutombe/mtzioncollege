import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchGradeDetails } from '../../redux/gradeSlice';
import { motion } from 'framer-motion';
import { BookOpen, Users, Clock } from 'lucide-react';
import LoadingPage from '../Loading/loading';
import ErrorPage from '../Error/error';

const GradeDetails = () => {
  const dispatch = useDispatch();
  const { branchId, gradeId } = useParams();
  const { gradeDetails, loading, error } = useSelector((state) => state.grade);

  useEffect(() => {
    dispatch(fetchGradeDetails({ branchId, gradeId }));
  }, [dispatch, branchId, gradeId]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{gradeDetails.name}</h1>
          <p className="text-xl text-light-blue-300">{gradeDetails.branch.name}</p>
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
            <InfoCard icon={<BookOpen />} title="Subjects" value={gradeDetails.subjects.length} />
            <InfoCard icon={<Users />} title="Students" value={gradeDetails.studentsCount} />
            <InfoCard icon={<Clock />} title="Class Hours" value={`${gradeDetails.classHours} hrs/week`} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Subjects</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gradeDetails.subjects.map((subject) => (
              <li key={subject.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                {subject.name}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-between">
            <Link to={`/branches/${branchId}/grades`} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Back to Grades
            </Link>
            <Link to={`/register/${branchId}/${gradeId}`} className="bg-light-blue-500 hover:bg-light-blue-600 text-white font-bold py-2 px-4 rounded">
              Register for this Grade
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
    <div className="mr-4 text-light-blue-500">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default GradeDetails;