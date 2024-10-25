import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Users, ChevronDown, ChevronUp, Grid,
  List, GraduationCap, BookA, Clock, Calendar, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const BRANCH_TYPES = {
  SECONDARY: 'secondary',
  TECHNICAL: 'technical',
  VOCATIONAL: 'vocational'
};

export const SAMPLE_FORMS = {
  [BRANCH_TYPES.SECONDARY]: [
    {
      id: 1,
      name: "Form 1",
      students: 120,
      subjects: [
        "English", "Shona", "Mathematics", "Physics", "Chemistry", 
        "Biology", "History", "Geography", "CRE/IRE", "Computer Studies"
      ],
      classHours: 40,
      description: "Entry level secondary education focusing on core subjects.",
      teachingStaff: 12,
      academicYear: "2024",
      streamCount: 3
    },
    {
      id: 2,
      name: "Form 2",
      students: 115,
      subjects: [
        "English", "Shona", "Mathematics", "Physics", "Chemistry",
        "Biology", "History", "Geography", "CRE/IRE", "Business Studies"
      ],
      classHours: 40,
      description: "Second year of secondary education with optional subjects.",
      teachingStaff: 12,
      academicYear: "2024",
      streamCount: 3
    },
    {
      id: 2,
      name: "Form 3",
      students: 115,
      subjects: [
        "English", "Shona", "Mathematics", "Physics", "Chemistry",
        "Biology", "History", "Geography", "CRE/IRE", "Business Studies"
      ],
      classHours: 40,
      description: "Second year of secondary education with optional subjects.",
      teachingStaff: 12,
      academicYear: "2024",
      streamCount: 3
    },
    {
      id: 2,
      name: "Form 4",
      students: 115,
      subjects: [
        "English", "Shona", "Mathematics", "Physics", "Chemistry",
        "Biology", "History", "Geography", "CRE/IRE", "Business Studies"
      ],
      classHours: 40,
      description: "Second year of secondary education with optional subjects.",
      teachingStaff: 12,
      academicYear: "2024",
      streamCount: 3
    }
  ],
  [BRANCH_TYPES.TECHNICAL]: [
    {
      id: 1,
      name: "Form 1",
      students: 80,
      subjects: [
        "English", "Mathematics", "Physics", "Chemistry", "Technical Drawing",
        "Metalwork", "Woodwork", "Electrical Technology", "Computer Studies"
      ],
      classHours: 45,
      description: "First year technical education with hands-on training.",
      teachingStaff: 10,
      academicYear: "2024",
      workshopHours: 15
    }
  ]
};

// Subjects configuration based on branch type and form level
export const  SUBJECTS_CONFIG = {
  [BRANCH_TYPES.SECONDARY]: {
    core: [
      "English", "Shona", "Mathematics"
    ],
    sciences: [
      "Physics", "Chemistry", "Biology"
    ],
    humanities: [
      "History", "Geography", "CRE/IRE"
    ],
    optionals: [
      "Computer Studies", "Business Studies", "Agriculture"
    ]
  },
  [BRANCH_TYPES.TECHNICAL]: {
    core: [
      "English", "Mathematics", "Physics"
    ],
    technical: [
      "Technical Drawing", "Metalwork", "Woodwork"
    ],
    specialized: [
      "Arts", "Sciences", "Commercials"
    ]
  }
};

export const FormCard = ({ form, branchType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <GraduationCap size={48} className="text-khaki-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          {form.name}
        </h2>

        <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex items-center">
            <Users size={18} className="mr-2 text-khaki-700" />
            <span>{form.students} students</span>
          </div>
          <div className="flex items-center">
            <Clock size={18} className="mr-2 text-khaki-700" />
            <span>{form.classHours}hrs/week</span>
          </div>
        </div>

        {branchType === BRANCH_TYPES.TECHNICAL && (
          <div className="flex justify-center text-gray-600 dark:text-gray-300 mb-4">
            <Award size={18} className="mr-2 text-khaki-700" />
            <span>{form.workshopHours} workshop hours/week</span>
          </div>
        )}

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {form.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {form.subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-center text-sm"
              >
                {subject}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-between mt-4">
          <Link to={`/forms/${form.id}/subjects`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-khaki-700 text-navy-900 rounded-md hover:bg--700 transition duration-300 flex items-center"
            >
              <BookA size={18} className="mr-2" /> Subjects
            </motion.button>
          </Link>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 px-4 py-2"
          >
            {isExpanded ? (
              <>
                <span className="mr-2">Show Less</span>
                <ChevronUp size={18} />
              </>
            ) : (
              <>
                <span className="mr-2">Learn More</span>
                <ChevronDown size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const SubjectCard = ({ subject, branchType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      layout
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <BookOpen size={48} className="text-khaki-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-white mb-2 text-center">
          {subject.name}
        </h2>

        <div className="flex justify-between text-gray-700 text-gray-300 mb-4">
          <div className="flex items-center">
            <Clock size={18} className="mr-2 text-khaki-700" />
            <span>{subject.hoursPerWeek} hrs/week</span>
          </div>
          {branchType === BRANCH_TYPES.TECHNICAL && subject.practicalHours && (
            <div className="flex items-center">
              <Award size={18} className="mr-2 text-khaki-600" />
              <span>{subject.practicalHours} practical hrs</span>
            </div>
          )}
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Topics</h3>
            <div className="grid grid-cols-2 gap-2">
              {subject.topics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-center text-sm"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>

          {subject.practicalTopics && (
            <div className="mb-4">
              <h3 className="font-bold text-gray-900 text-white mb-2">Practical Work</h3>
              <div className="grid grid-cols-2 gap-2">
                {subject.practicalTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="bg-khaki-900 bg-khaki-900 p-2 rounded text-center text-sm"
                  >
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full bg-gray-200 bg-gray-700 text-gray-700 text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 mt-4 p-2"
        >
          {isExpanded ? (
            <>
              <span className="mr-2">Show Less</span>
              <ChevronUp size={18} />
            </>
          ) : (
            <>
              <span className="mr-2">Learn More</span>
              <ChevronDown size={18} />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
