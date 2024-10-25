import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Grid,
  List,
  Search,
  Filter,
  ArrowLeft
} from 'lucide-react';
import {
    BRANCH_TYPES,
    SAMPLE_FORMS,
    FormCard
  } from './forms';

 const  FormsPage = () => {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranchType, setSelectedBranchType] = useState(BRANCH_TYPES.SECONDARY);

  // Get forms for the current branch type
  const forms = SAMPLE_FORMS[selectedBranchType] || [];

  // Filter forms based on search term
  const filteredForms = forms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-navy-900 to-navy-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 hover:bg-gray-700"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-khaki-700 ">
                 Forms
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedBranchType === BRANCH_TYPES.SECONDARY ? 'Secondary School' : 'Technical Institute'}
                </p>
              </div>
            </div>
            

            <select
              value={selectedBranchType}
              onChange={(e) => setSelectedBranchType(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value={BRANCH_TYPES.SECONDARY}>Secondary</option>
              <option value={BRANCH_TYPES.TECHNICAL}>Technical</option>
              <option value={BRANCH_TYPES.VOCATIONAL}>Vocational</option>
            </select>
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
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-khaki-700 text-navy-900 hover:bg-khaki-800 transition-colors"
            >
              {viewMode === 'grid' ? (
                <>
                  <List size={20} />
                  <span>List View</span>
                </>
              ) : (
                <>
                  <Grid size={20} />
                  <span>Grid View</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Forms Grid/List */}
        <div className={`grid ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'grid-cols-1 gap-4'
        }`}>
          {filteredForms.map((form) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FormCard
                form={form}
                branchType={selectedBranchType}
                viewMode={viewMode}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredForms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No forms found matching your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FormsPage;