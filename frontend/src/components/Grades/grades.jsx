import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  ChevronDown,
  ChevronUp,
  Grid,
  List,
  GraduationCap,
  BookA,
  ArrowLeft,
  Clock,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";


const SAMPLE_GRADES = [
  {
    id: 1,
    name: "Grade 1",
    students: 45,
    subjects: ["English", "Mathematics", "Science", "Social Studies", "Art", "Physical Education", "Music"],
    classHours: 30,
    description: "Foundation level focusing on basic literacy and numeracy skills.",
    teachingStaff: 4,
    academicYear: "2024",
    image: "images/grade1.jpg"
  },
  {
    id: 2,
    name: "Grade 2",
    students: 42,
    subjects: ["English", "Mathematics", "Science", "Social Studies", "Art", "Physical Education", "Computer"],
    classHours: 32,
    description: "Building on foundational skills with introduction to more complex concepts.",
    teachingStaff: 4,
    academicYear: "2024",
    image: "images/grade2.jpg"
  },
  {
    id: 3,
    name: "Grade 3",
    students: 38,
    subjects: ["English", "Mathematics", "Science", "Social Studies", "Art", "Physical Education", "French"],
    classHours: 34,
    description: "Advancing core subjects while introducing foreign language studies.",
    teachingStaff: 5,
    academicYear: "2024",
    image: "images/grade3.jpg"
  },
  {
    id: 3,
    name: "Grade 4",
    students: 38,
    subjects: ["English", "Mathematics", "Science", "Social Studies", "Art", "Physical Education", "French"],
    classHours: 34,
    description: "Advancing core subjects while introducing foreign language studies.",
    teachingStaff: 5,
    academicYear: "2024",
    image: "images/grade3.jpg"
  },
  {
    id: 3,
    name: "Grade 5",
    students: 38,
    subjects: ["English", "Mathematics", "Science", "Social Studies", "Art", "Physical Education", "French"],
    classHours: 34,
    description: "Advancing core subjects while introducing foreign language studies.",
    teachingStaff: 5,
    academicYear: "2024",
    image: "images/grade3.jpg"
  },
  {
    id: 3,
    name: "Grade 6",
    students: 38,
    subjects: ["English", "Mathematics", "Science", "Social Studies", "Art", "Physical Education", "French"],
    classHours: 34,
    description: "Advancing core subjects while introducing foreign language studies.",
    teachingStaff: 5,
    academicYear: "2024",
    image: "images/grade3.jpg"
  },
  {
    id: 3,
    name: "Grade 7",
    students: 38,
    subjects: ["English", "Mathematics", "Science", "Social Studies", "Art", "Physical Education", "French"],
    classHours: 34,
    description: "Advancing core subjects while introducing foreign language studies.",
    teachingStaff: 5,
    academicYear: "2024",
    image: "images/grade3.jpg"
  }
];



const GradesPage = () => {
  const [viewMode, setViewMode] = useState("list");
  const [grades] = useState(SAMPLE_GRADES);

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <header className="bg-gradient-to-r from-navy-900 to-navy-800 shadow-lg">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-3 sm:mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-khaki-700">
                  Grades
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Primary School
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <motion.div 
          className="flex justify-end mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            className="flex items-center bg-[#F0E68C] text-[#0A1D3B] px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-[#DFD98B] transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            {viewMode === "list" ? (
              <Grid className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <List className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            )}
            {viewMode === "list" ? "Grid View" : "List View"}
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`grid ${
              viewMode === "list" 
                ? "grid-cols-1 gap-4" 
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            }`}
          >
            {grades.map((grade) => (
              viewMode === "list" ? (
                <GradeListItem key={grade.id} grade={grade} />
              ) : (
                <GradeCard key={grade.id} grade={grade} />
              )
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const GradeCard = ({ grade }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-xl overflow-hidden border border-[#F0E68C]/20"
    >
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div 
          className="flex justify-center mb-4 sm:mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <GraduationCap size={40} className="sm:w-14 sm:h-14 text-[#F0E68C]" />
        </motion.div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-4 text-center">
          {grade.name}
        </h2>
        
        <hr className="border-[#F0E68C]/30 mb-4 sm:mb-6" />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex items-center">
            <Users size={18} className="mr-2 sm:mr-3 text-[#F0E68C]" />
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{grade.students} students</span>
          </div>
          <div className="flex items-center">
            <BookOpen size={18} className="mr-2 sm:mr-3 text-[#F0E68C]" />
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{grade.subjects.length} subjects</span>
          </div>
          <div className="flex items-center">
            <Clock size={18} className="mr-2 sm:mr-3 text-[#F0E68C]" />
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{grade.classHours}hrs/week</span>
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="mr-2 sm:mr-3 text-[#F0E68C]" />
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{grade.academicYear}</span>
          </div>
        </div>

        <hr className="border-[#F0E68C]/30 mb-4 sm:mb-6" />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link to={`/grades/${grade.id}/subjects`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2.5 sm:py-3 bg-[#F0E68C] text-[#0A1D3B] rounded-lg hover:bg-[#DFD98B] transition duration-300 flex items-center justify-center font-medium text-sm sm:text-base"
            >
              <BookA size={16} className="sm:w-[18px] sm:h-[18px] mr-2" /> Subjects
            </motion.button>
          </Link>

          <Link to={`/grades/${grade.id}/register`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2.5 sm:py-3 bg-[#F0E68C] text-[#0A1D3B] rounded-lg hover:bg-[#DFD98B] transition duration-300 flex items-center justify-center font-medium text-sm sm:text-base"
            >
              <Users size={16} className="sm:w-[18px] sm:h-[18px] mr-2" /> Register
            </motion.button>
          </Link>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 sm:mt-6"
            >
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                {grade.description}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {grade.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="bg-[#F0E68C]/10 dark:bg-[#F0E68C]/5 p-2 sm:p-3 rounded-lg text-center text-xs sm:text-sm text-gray-700 dark:text-[#F0E68C] font-medium"
                  >
                    {subject}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full bg-[#0A1D3B] text-white rounded-lg hover:bg-[#1A2F4F] transition-colors duration-300 mt-4 sm:mt-6 p-2.5 sm:p-3 text-sm sm:text-base"
        >
          {isExpanded ? (
            <>
              <span className="mr-2">Show Less</span>
              <ChevronUp size={16} className="sm:w-[18px] sm:h-[18px]" />
            </>
          ) : (
            <>
              <span className="mr-2">Learn More</span>
              <ChevronDown size={16} className="sm:w-[18px] sm:h-[18px]" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

const GradeListItem = ({ grade }) => (
  <motion.div
    className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-lg p-4 sm:p-6 border border-[#F0E68C]/20"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ y: -2 }}
  >
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div className="flex items-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="mr-4 sm:mr-6"
        >
          <GraduationCap size={28} className="sm:w-8 sm:h-8 text-[#F0E68C]" />
        </motion.div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1D3B] dark:text-[#F0E68C]">
            {grade.name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
            {grade.teachingStaff} teaching staff
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6">
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          <Users size={18} className="mr-2 text-[#F0E68C]" />
          <span>{grade.students}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          <BookOpen size={18} className="mr-2 text-[#F0E68C]" />
          <span>{grade.subjects.length}</span>
        </div>
        <Link to={`/grades/${grade.id}/subjects`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 sm:px-6 py-2 bg-[#F0E68C] text-[#0A1D3B] rounded-lg hover:bg-[#DFD98B] transition duration-300 font-medium text-sm sm:text-base"
          >
            View
          </motion.button>
        </Link>
      </div>
    </div>
  </motion.div>
);

export default GradesPage;