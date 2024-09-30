import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";
import Loading from "./components/Loading/loading";
import ErrorBoundary from "./components/Error/error";
import Navbar from "./components/Navbar/navbar";
import { ThemeProvider } from "./components/themeContext";
import Footer from "./components/Footer/footer";
import { useTheme } from "./components/themeContext";

const HomePage = lazy(() => import("./components/HomePage/homepage"));
const BranchesPage = lazy(() => import("./components/Branches/branches"));
const RegistrationForm = lazy(() =>
  import("./components/Registration/registrationForm")
);
const AdminDashboard = lazy(() => import("./components/Admin/admin"));
const StudentDashboard = lazy(() =>
  import("./components/Student/studentDashboard")
);

const ThemedComponent = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "default"
          ? "bg-[#318000] text-white"
          : "bg-gray-900 text-white"
      } flex-grow`}
    >
      {children}
    </div>
  );
};
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <ThemedComponent>
              <Navbar />

              <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-8 flex-grow"
              >
                <Suspense fallback={<Loading fullScreen />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/branches" element={<BranchesPage />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/student" element={<StudentDashboard />} />
                  </Routes>
                </Suspense>
              </motion.main>
              <Footer />
            </ThemedComponent>
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
