import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Grid,
  List,
  GraduationCap,
  Calendar,
  Award
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const SAMPLE_SUBJECTS = {
  1: [
    {
      id: 1,
      name: "English",
      hoursPerWeek: 6,
      teacher: "Mrs. Hondo",
      description: "Foundational English focusing on reading, writing, and basic grammar.",
      topics: ["Phonics", "Basic Grammar", "Reading Comprehension", "Writing Skills"],
      assessmentMethods: ["Continuous Assessment", "Term Tests", "Projects"],
      books: ["English for Grade 1", "Reading Adventure Book 1"],
      image: "images/english.jpg"
    },
    {
      id: 2,
      name: "Mathematics",
      hoursPerWeek: 5,
      teacher: "Mr. Johnson",
      description: "Basic mathematics covering numbers, basic operations, and shapes.",
      topics: ["Numbers 1-100", "Addition & Subtraction", "Basic Shapes", "Patterns"],
      assessmentMethods: ["Weekly Quizzes", "Term Tests", "Practical Work"],
      books: ["Primary Mathematics 1", "Math Practice Workbook"],
      image: "images/math.jpg"
    },
    {
      id: 3,
      name: "Science",
      hoursPerWeek: 4,
      teacher: "Ms. Chirape",
      description: "Introduction to basic scientific concepts through observation and experiments.",
      topics: ["Living Things", "Materials", "Weather", "Our Body"],
      assessmentMethods: ["Lab Work", "Projects", "Term Tests"],
      books: ["Discovery Science Grade 1", "Science Activity Book"],
      image: "images/science.jpg"
    }
  ],
    2: [ 
        {
            id: 1,
            name: "English",
            hoursPerWeek: 6,
            teacher: "Mrs. Smith",
            description: "Foundational English focusing on reading, writing, and basic grammar.",
            topics: ["Phonics", "Basic Grammar", "Reading Comprehension", "Writing Skills"],
            assessmentMethods: ["Continuous Assessment", "Term Tests", "Projects"],
            books: ["English for Grade 1", "Reading Adventure Book 1"],
            image: "images/english.jpg"
          },
          {
            id: 2,
            name: "Mathematics",
            hoursPerWeek: 5,
            teacher: "Mr. Tapfuma",
            description: "Basic mathematics covering numbers, basic operations, and shapes.",
            topics: ["Numbers 1-100", "Addition & Subtraction", "Basic Shapes", "Patterns"],
            assessmentMethods: ["Weekly Quizzes", "Term Tests", "Practical Work"],
            books: ["Primary Mathematics 1", "Math Practice Workbook"],
            image: "images/math.jpg"
          },
          {
            id: 3,
            name: "Science",
            hoursPerWeek: 4,
            teacher: "Ms. Leila",
            description: "Introduction to basic scientific concepts through observation and experiments.",
            topics: ["Living Things", "Materials", "Weather", "Our Body"],
            assessmentMethods: ["Lab Work", "Projects", "Term Tests"],
            books: ["Discovery Science Grade 1", "Science Activity Book"],
            image: "images/science.jpg"
          }
    ],
    3: [ 
        {
            id: 1,
            name: "English",
            hoursPerWeek: 6,
            teacher: "Mrs. Smith",
            description: "Foundational English focusing on reading, writing, and basic grammar.",
            topics: ["Phonics", "Basic Grammar", "Reading Comprehension", "Writing Skills"],
            assessmentMethods: ["Continuous Assessment", "Term Tests", "Projects"],
            books: ["English for Grade 1", "Reading Adventure Book 1"],
            image: "images/english.jpg"
          },
          {
            id: 2,
            name: "Mathematics",
            hoursPerWeek: 5,
            teacher: "Mr. Gomo",
            description: "Basic mathematics covering numbers, basic operations, and shapes.",
            topics: ["Numbers 1-100", "Addition & Subtraction", "Basic Shapes", "Patterns"],
            assessmentMethods: ["Weekly Quizzes", "Term Tests", "Practical Work"],
            books: ["Primary Mathematics 1", "Math Practice Workbook"],
            image: "images/math.jpg"
          },
          {
            id: 3,
            name: "Science",
            hoursPerWeek: 4,
            teacher: "Ms. Marasha",
            description: "Introduction to basic scientific concepts through observation and experiments.",
            topics: ["Living Things", "Materials", "Weather", "Our Body"],
            assessmentMethods: ["Lab Work", "Projects", "Term Tests"],
            books: ["Discovery Science Grade 1", "Science Activity Book"],
            image: "images/science.jpg"
          }
    ],
    4: [ 
        {
            id: 1,
            name: "English",
            hoursPerWeek: 6,
            teacher: "Mrs. Smith",
            description: "Foundational English focusing on reading, writing, and basic grammar.",
            topics: ["Phonics", "Basic Grammar", "Reading Comprehension", "Writing Skills"],
            assessmentMethods: ["Continuous Assessment", "Term Tests", "Projects"],
            books: ["English for Grade 1", "Reading Adventure Book 1"],
            image: "images/english.jpg"
          },
          {
            id: 2,
            name: "Mathematics",
            hoursPerWeek: 5,
            teacher: "Mr. Johnson",
            description: "Basic mathematics covering numbers, basic operations, and shapes.",
            topics: ["Numbers 1-100", "Addition & Subtraction", "Basic Shapes", "Patterns"],
            assessmentMethods: ["Weekly Quizzes", "Term Tests", "Practical Work"],
            books: ["Primary Mathematics 1", "Math Practice Workbook"],
            image: "images/math.jpg"
          },
          {
            id: 3,
            name: "Science",
            hoursPerWeek: 4,
            teacher: "Ms. Parker",
            description: "Introduction to basic scientific concepts through observation and experiments.",
            topics: ["Living Things", "Materials", "Weather", "Our Body"],
            assessmentMethods: ["Lab Work", "Projects", "Term Tests"],
            books: ["Discovery Science Grade 1", "Science Activity Book"],
            image: "images/science.jpg"
          }
    ],
    5: [ 
        {
            id: 1,
            name: "English",
            hoursPerWeek: 6,
            teacher: "Mrs. Msine",
            description: "Foundational English focusing on reading, writing, and basic grammar.",
            topics: ["Phonics", "Basic Grammar", "Reading Comprehension", "Writing Skills"],
            assessmentMethods: ["Continuous Assessment", "Term Tests", "Projects"],
            books: ["English for Grade 1", "Reading Adventure Book 1"],
            image: "images/english.jpg"
          },
          {
            id: 2,
            name: "Mathematics",
            hoursPerWeek: 5,
            teacher: "Mr. Kamoto",
            description: "Basic mathematics covering numbers, basic operations, and shapes.",
            topics: ["Numbers 1-100", "Addition & Subtraction", "Basic Shapes", "Patterns"],
            assessmentMethods: ["Weekly Quizzes", "Term Tests", "Practical Work"],
            books: ["Primary Mathematics 1", "Math Practice Workbook"],
            image: "images/math.jpg"
          },
          {
            id: 3,
            name: "Science",
            hoursPerWeek: 4,
            teacher: "Ms. Parker",
            description: "Introduction to basic scientific concepts through observation and experiments.",
            topics: ["Living Things", "Materials", "Weather", "Our Body"],
            assessmentMethods: ["Lab Work", "Projects", "Term Tests"],
            books: ["Discovery Science Grade 1", "Science Activity Book"],
            image: "images/science.jpg"
          }
    ],
    6: [ 
        {
            id: 1,
            name: "English",
            hoursPerWeek: 6,
            teacher: "Mrs. Makumbe",
            description: "Foundational English focusing on reading, writing, and basic grammar.",
            topics: ["Phonics", "Basic Grammar", "Reading Comprehension", "Writing Skills"],
            assessmentMethods: ["Continuous Assessment", "Term Tests", "Projects"],
            books: ["English for Grade 1", "Reading Adventure Book 1"],
            image: "images/english.jpg"
          },
          {
            id: 2,
            name: "Mathematics",
            hoursPerWeek: 5,
            teacher: "Mr. Jochomi",
            description: "Basic mathematics covering numbers, basic operations, and shapes.",
            topics: ["Numbers 1-100", "Addition & Subtraction", "Basic Shapes", "Patterns"],
            assessmentMethods: ["Weekly Quizzes", "Term Tests", "Practical Work"],
            books: ["Primary Mathematics 1", "Math Practice Workbook"],
            image: "images/math.jpg"
          },
          {
            id: 3,
            name: "Science",
            hoursPerWeek: 4,
            teacher: "Ms. Marasha",
            description: "Introduction to basic scientific concepts through observation and experiments.",
            topics: ["Living Things", "Materials", "Weather", "Our Body"],
            assessmentMethods: ["Lab Work", "Projects", "Term Tests"],
            books: ["Discovery Science Grade 1", "Science Activity Book"],
            image: "images/science.jpg"
          }
    ],
    7: [ 
        {
            id: 1,
            name: "English",
            hoursPerWeek: 6,
            teacher: "Mrs. Smith",
            description: "Foundational English focusing on reading, writing, and basic grammar.",
            topics: ["Phonics", "Basic Grammar", "Reading Comprehension", "Writing Skills"],
            assessmentMethods: ["Continuous Assessment", "Term Tests", "Projects"],
            books: ["English for Grade 1", "Reading Adventure Book 1"],
            image: "images/english.jpg"
          },
          {
            id: 2,
            name: "Mathematics",
            hoursPerWeek: 5,
            teacher: "Mr. Johnson",
            description: "Basic mathematics covering numbers, basic operations, and shapes.",
            topics: ["Numbers 1-100", "Addition & Subtraction", "Basic Shapes", "Patterns"],
            assessmentMethods: ["Weekly Quizzes", "Term Tests", "Practical Work"],
            books: ["Primary Mathematics 1", "Math Practice Workbook"],
            image: "images/math.jpg"
          },
          {
            id: 3,
            name: "Science",
            hoursPerWeek: 4,
            teacher: "Ms. Parker",
            description: "Introduction to basic scientific concepts through observation and experiments.",
            topics: ["Living Things", "Materials", "Weather", "Our Body"],
            assessmentMethods: ["Lab Work", "Projects", "Term Tests"],
            books: ["Discovery Science Grade 1", "Science Activity Book"],
            image: "images/science.jpg"
          }
    ],
    
};

const SubjectsPage = () => {
  const { gradeId } = useParams();
  const [viewMode, setViewMode] = useState("grid");
  const [subjects] = useState(SAMPLE_SUBJECTS[gradeId] || SAMPLE_SUBJECTS[1]); // Default to Grade 1 if no ID match

  return (
    <div className="min-h-screen pt-20">
      <header className="bg-gradient-to-r from-navy-900 to-navy-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-khaki-300">Grade Subjects</h1>
          <p className="text-xl text-khaki-200">
            Explore our comprehensive curriculum and subject offerings
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between mb-4">
          <Link
            to="/branches"
            className="flex items-center bg-khaki-700 text-navy-900 px-4 py-2 rounded-md hover:bg-khaki-600 transition-colors duration-300"
          >
            Back to Grades
          </Link>
          <button
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            className="flex items-center bg-khaki-700 text-navy-900 px-4 py-2 rounded-md hover:bg-khaki-600 transition-colors duration-300"
          >
            {viewMode === "list" ? (
              <Grid className="mr-2" />
            ) : (
              <List className="mr-2" />
            )}
            {viewMode === "list" ? "Grid View" : "List View"}
          </button>
        </div>

        <div className={`grid ${viewMode === "list" ? "grid-cols-1 gap-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}`}>
          {subjects.map((subject) => (
            viewMode === "list" ? (
              <SubjectListItem key={subject.id} subject={subject} />
            ) : (
              <SubjectCard key={subject.id} subject={subject} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

const SubjectCard = ({ subject }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-khaki-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <BookOpen size={48} className="text-khaki-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          {subject.name}
        </h2>
        <hr className="border-gray-300 dark:border-gray-700 mb-4" />

        <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex items-center">
            <Clock size={18} className="mr-2 text-khaki-700" />
            <span>{subject.hoursPerWeek} hrs/week</span>
          </div>
          <div className="flex items-center">
            <GraduationCap size={18} className="mr-2 text-khaki-700" />
            <span>{subject.teacher}</span>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {subject.description}
          </p>
          
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-white mb-2">Key Topics</h3>
            <div className="grid grid-cols-2 gap-2">
              {subject.topics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-gray-100 bg-khaki-700 p-2 rounded text-center text-sm"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-white mb-2">Assessment Methods</h3>
            <div className="grid grid-cols-2 gap-2">
              {subject.assessmentMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-gray-100 bg-khaki-700 p-2 rounded text-center text-sm"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full bg-navy-800 text-white rounded-md hover:bg-navy-700 transition-colors duration-300 mt-4 p-2"
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

const SubjectListItem = ({ subject }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <BookOpen size={24} className="text-khaki-700 mr-4" />
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {subject.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {subject.teacher}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Clock size={18} className="mr-2 text-khaki-700" />
          <span>{subject.hoursPerWeek} hrs/week</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 bg-khaki-700 text-navy-900 rounded-md hover:bg-khaki-600 transition duration-300"
          onClick={() => {}} // Add detailed view functionality if needed
        >
          Details
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default SubjectsPage;