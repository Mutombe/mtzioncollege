import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Grid,
  List,
  Filter
} from 'lucide-react';
import {
  BRANCH_TYPES,
  SAMPLE_FORMS,
  SUBJECTS_CONFIG,
  SubjectCard
} from './forms';

const FormSubjectsPage = () => {
  const { formId, branchType = BRANCH_TYPES.SECONDARY } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get the current form data
  const currentForm = useMemo(() => {
    return SAMPLE_FORMS[branchType]?.find(form => form.id === parseInt(formId));
  }, [formId, branchType]);

  // Get all subjects for the current branch type
  const allSubjects = useMemo(() => {
    const subjectsData = SUBJECTS_CONFIG[branchType];
    const subjects = [];

    Object.entries(subjectsData).forEach(([category, subjectList]) => {
      subjectList.forEach(subjectName => {
        subjects.push({
          name: subjectName,
          category,
          hoursPerWeek: 4, // Default hours, you can adjust this
          topics: [
            'Topic 1', 'Topic 2', 'Topic 3', 'Topic 4',
            'Topic 5', 'Topic 6', 'Topic 7', 'Topic 8'
          ],
          practicalHours: branchType === BRANCH_TYPES.TECHNICAL ? 2 : null,
          practicalTopics: branchType === BRANCH_TYPES.TECHNICAL ? 
            ['Practical 1', 'Practical 2', 'Practical 3', 'Practical 4'] : null
        });
      });
    });

    return subjects;
  }, [branchType]);

  // Filter subjects based on search and category
  const filteredSubjects = useMemo(() => {
    return allSubjects.filter(subject => {
      const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || subject.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allSubjects, searchTerm, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    return ['all', ...new Set(allSubjects.map(subject => subject.category))];
  }, [allSubjects]);

  if (!currentForm) {
    return <div className="p-8 text-center">Form not found</div>;
  }

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-navy-900 to-navy-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-khaki-700">
                  {currentForm.name} Subjects
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentForm.subjects.length} subjects
                </p>
              </div>
            </div>

            {/* View Toggle */}
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-2 rounded-md bg-khaki-700 text-navy-900 hover:bg-khaki-800 transition-colors flex items-center gap-2"
            >
              {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
              <span>{viewMode === 'grid' ? 'List View' : 'Grid View'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Controls Section */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subjects Grid/List */}
        <div className={`grid ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'grid-cols-1 gap-4'
        }`}>
          {filteredSubjects.map((subject, index) => (
            <SubjectCard
              key={`${subject.name}-${index}`}
              subject={subject}
              branchType={branchType}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No subjects found matching your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FormSubjectsPage;