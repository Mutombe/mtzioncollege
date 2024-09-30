import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, CreditCard, CheckCircle, XCircle, AlertCircle, Menu, X, Moon, Sun } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('registrations');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const tabs = [
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <header className="bg-navy-900 dark:bg-navy-800 text-white py-6">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-light-blue-300 mt-2">Welcome back, Admin!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-navy-800 dark:hover:bg-navy-700">
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-full hover:bg-navy-800 dark:hover:bg-navy-700 md:hidden"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar for mobile */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween' }}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg md:hidden"
              >
                <div className="p-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-navy-900 dark:text-white">Menu</h2>
                  <button onClick={() => setIsSidebarOpen(false)}>
                    <X size={24} className="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                <nav>
                  <ul className="space-y-2">
                    {tabs.map((tab) => (
                      <li key={tab.id}>
                        <button
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsSidebarOpen(false);
                          }}
                          className={`flex items-center space-x-2 w-full p-4 transition-colors ${
                            activeTab === tab.id
                              ? 'bg-light-blue-500 text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <tab.icon size={20} />
                          <span>{tab.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar for desktop */}
          <nav className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow-lg">
            <ul className="space-y-2 p-4">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 w-full p-4 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-light-blue-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <main className="flex-1 p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Content for each tab */}
                {activeTab === 'registrations' && <RegistrationsTab />}
                {activeTab === 'documents' && <DocumentsTab />}
                {activeTab === 'payments' && <PaymentsTab />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon size={32} className={color} />
      </div>
    </div>
  );
  
  const DocumentItem = ({ name, status, icon: Icon, color }) => (
    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <span className="font-medium">{name}</span>
      <div className="flex items-center space-x-2">
        <span className={`${color} font-medium`}>{status}</span>
        <Icon size={20} className={color} />
      </div>
    </li>
);
  

const RegistrationRow = ({ name, grade, branch, status }) => (
    <tr className="border-b">
      <td className="py-2">{name}</td>
      <td className="py-2">{grade}</td>
      <td className="py-2">{branch}</td>
      <td className="py-2">
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            status === 'Approved'
              ? 'bg-green-100 text-green-800'
              : status === 'Rejected'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {status}
        </span>
      </td>
      <td className="py-2">
        <div className="flex space-x-2">
          <button className="p-1 text-green-500 hover:text-green-600">
            <CheckCircle size={20} />
          </button>
          <button className="p-1 text-red-500 hover:text-red-600">
          <XCircle size={20} />
        </button>
      </div>
    </td>
  </tr>
);

const PaymentRow = ({ name, amount, date, status }) => (
  <tr className="border-b">
    <td className="py-2">{name}</td>
    <td className="py-2">{amount}</td>
    <td className="py-2">{date}</td>
    <td className="py-2">
      <span
        className={`px-2 py-1 rounded-full text-sm font-medium ${
          status === 'Paid'
            ? 'bg-green-100 text-green-800'
            : status === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {status}
      </span>
    </td>
  </tr>
);  

const RegistrationsTab = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Registration Requests</h2>
    <table className="w-full">
      <thead>
        <tr className="text-left border-b dark:border-gray-700">
          <th className="py-2 text-gray-700 dark:text-gray-300">Student Name</th>
          <th className="py-2 text-gray-700 dark:text-gray-300">Grade</th>
          <th className="py-2 text-gray-700 dark:text-gray-300">Branch</th>
          <th className="py-2 text-gray-700 dark:text-gray-300">Status</th>
          <th className="py-2 text-gray-700 dark:text-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        <RegistrationRow
          name="Alice Johnson"
          grade="Grade 1"
          branch="Main Campus"
          status="Pending"
        />
        <RegistrationRow
          name="Bob Smith"
          grade="Grade 3"
          branch="North Campus"
          status="Approved"
        />
        <RegistrationRow
          name="Charlie Brown"
          grade="Grade 2"
          branch="West Campus"
          status="Rejected"
        />
      </tbody>
    </table>
  </div>
);

const DocumentsTab = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Document Verification</h2>
    <ul className="space-y-4">
      <DocumentItem
        name="Transfer Letter - Alice Johnson"
        status="Pending"
        icon={AlertCircle}
        color="text-yellow-500"
      />
      <DocumentItem
        name="Report Card - Bob Smith"
        status="Approved"
        icon={CheckCircle}
        color="text-green-500"
      />
      <DocumentItem
        name="Birth Certificate - Charlie Brown"
        status="Rejected"
        icon={XCircle}
        color="text-red-500"
      />
    </ul>
  </div>
);

const PaymentsTab = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Payment Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <DashboardCard
        title="Total Revenue"
        value="$25,000"
        icon={CreditCard}
        color="text-green-500"
      />
      <DashboardCard
        title="Pending Payments"
        value="$5,000"
        icon={AlertCircle}
        color="text-yellow-500"
      />
      <DashboardCard
        title="Overdue Payments"
        value="$2,000"
        icon={XCircle}
        color="text-red-500"
      />
    </div>
    <table className="w-full">
      <thead>
        <tr className="text-left border-b dark:border-gray-700">
          <th className="py-2 text-gray-700 dark:text-gray-300">Student Name</th>
          <th className="py-2 text-gray-700 dark:text-gray-300">Amount</th>
          <th className="py-2 text-gray-700 dark:text-gray-300">Date</th>
          <th className="py-2 text-gray-700 dark:text-gray-300">Status</th>
        </tr>
      </thead>
      <tbody>
        <PaymentRow
          name="Alice Johnson"
          amount="$500"
          date="2025-01-15"
          status="Paid"
        />
        <PaymentRow
          name="Bob Smith"
          amount="$500"
          date="2025-02-01"
          status="Pending"
        />
        <PaymentRow
          name="Charlie Brown"
          amount="$500"
          date="2025-01-31"
          status="Overdue"
        />
      </tbody>
    </table>
  </div>
);

export default AdminDashboard;