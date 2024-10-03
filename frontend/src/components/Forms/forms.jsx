import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchForms } from '../../redux/formSlice';
import { GradeListItem, GradeCard } from '../Grades/grades';
import {Grid, List} from 'lucide-react';
import LoadingPage from '../Loading/loading';
import ErrorPage from '../Error/error';

const FormsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { branchId } = useParams();
  const { forms, loading, success, error } = useSelector((state) => state.form);

console.log("forms", forms)
    
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    if (!success && !loading) {
      dispatch(fetchForms({ branchId }));
    }
  }, [success, loading, dispatch, branchId]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  const handleRegister = (gradeId) => {
    navigate(`/branches/${branchId}/grades/${gradeId}/register`);
  };

  const handleDetails = (gradeId) => {
    navigate(`/branches/${branchId}/grades/${gradeId}/detail`);
  };

  const sortedAndFilteredGrades = forms
    .filter(form => form.name.toLowerCase().includes(filterBy.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'students') return b.students - a.students;
      return 0;
    });

  return (
    <div className="min-h-screen  ">
      <header className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Select a Grade</h1>
          <p className="text-xl text-light-blue-300">Branch Name</p>
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
              <option className="text-gray-700 rounded-md" value="name">Sort by Name</option>
              <option  className="text-gray-700 rounded-md" value="students">Sort by Students</option>
            </select>
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="flex items-center bg-light-blue-500 text-white px-4 py-2 rounded-md "
          >
            {viewMode === 'grid' ? <List className="mr-2 text-blue-400" /> : <Grid className="mr-2 text-blue-400" />}
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
        </div>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAndFilteredGrades.map((form) => (
              <GradeCard key={form.id} grade={form} onSelect={handleDetails} onSelectRegister={handleRegister} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAndFilteredGrades.map((form) => (
              <GradeListItem key={form.id} grade={form} onSelect={handleDetails} onSelectRegister={handleRegister} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FormsPage;