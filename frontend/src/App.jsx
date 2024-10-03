import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";
import Loading from "./components/Loading/loading";
import ErrorBoundary from "./components/Error/errorBoundary";
import Navbar from "./components/Navbar/navbar";
import { ThemeProvider, useTheme } from "./components/themeContext";
import Footer from "./components/Footer/footer";
import NotFoundPage from "./components/404/404";
import { AnimatePresence } from "framer-motion";
import ContactPage from "./components/Contact/contactUs";
import GradesPage from "./components/Grades/grades";
import FormsPage from "./components/Forms/forms";

const HomePage = lazy(() => import("./components/HomePage/homepage"));
const BranchesPage = lazy(() => import("./components/Branches/branches"));
const RegistrationForm = lazy(() =>
  import("./components/Registration/registrationForm")
);
const AdminDashboard = lazy(() => import("./components/Admin/admin"));
const StudentDashboard = lazy(() =>
  import("./components/Student/studentDashboard")
);

const ThemedApp = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className =
      theme === "default" ? "bg-gray-700 text-white" : "bg-gray-900 text-white";
  }, [theme]);

  return (
    <div
      className={`flex flex-col min-h-screen w-full ${
        theme === "default"
          ? "bg-gray-700 text-white"
          : "bg-gray-900 text-white"
      }`}
    >
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow w-full max-w-full px-4 sm:px-6 lg:px-8 pt-16 pb-8"
        >
          <ErrorBoundary>
            <Suspense fallback={<Loading fullScreen />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/branches" element={<BranchesPage />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/contact-us" element={<ContactPage />} />
                <Route
                  path="/branches/:branchId/grades"
                  element={<GradesPage />}
                />
                <Route
                  path="/branches/:branchId/forms"
                  element={<FormsPage />}
                />
                <Route path="/branch/:branchId/forms" element={""} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemedApp />
      </Router>
    </ThemeProvider>
  );
}

export default App;
