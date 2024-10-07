import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, CreditCard, CheckCircle, XCircle, AlertCircle, Menu, X, Moon, Sun, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('registrations');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };


  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 min-h-screen text-white transition-colors duration-300">
        <header className="bg-navy-900 text-white py-6 px-4">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">Admin Dashboard</h1>
              <p className="text-blue-300 mt-2">Welcome back, Admin!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-navy-800 transition-colors duration-200"
              >
                hhh
              </button>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-full hover:bg-navy-800 transition-colors duration-200 md:hidden"
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
                className="fixed inset-y-0 left-0 z-50 w-64 bg-navy-800 shadow-lg md:hidden"
              >
                <div className="p-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-blue-300">Menu</h2>
                  <button onClick={() => setIsSidebarOpen(false)}>
                    <X size={24} className="text-gray-400" />
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
                              ? 'bg-blue-500 text-white'
                              : 'text-gray-300 hover:bg-navy-700'
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
          <nav className="hidden md:block w-64 bg-navy-800 shadow-lg">
            <ul className="space-y-2 p-4">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 w-full p-4 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-navy-700'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <main className="flex-1 p-4 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
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
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white dark:bg-navy-700 rounded-lg shadow-md p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
      <Icon size={32} className={color} />
    </div>
  </motion.div>
);

const DocumentItem = ({ name, status, icon: Icon, color }) => (
  <motion.li
    whileHover={{ scale: 1.02 }}
    className="flex items-center justify-between p-4 bg-navy-700 rounded-lg"
  >
    <span className="font-medium text-gray-200">{name}</span>
    <div className="flex items-center space-x-2">
      <span className={`${color} font-medium`}>{status}</span>
      <Icon size={20} className={color} />
    </div>
  </motion.li>
);

const RegistrationRow = ({ name, grade, branch, status }) => (
  <motion.tr
    whileHover={{ scale: 1.02 }}
    className="border-b border-navy-600"
  >
    <td className="py-3 px-2">{name}</td>
    <td className="py-3 px-2">{grade}</td>
    <td className="py-3 px-2">{branch}</td>
    <td className="py-3 px-2">
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
    <td className="py-3 px-2">
      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.2 }}
          className="p-1 text-green-500 hover:text-green-600"
        >
          <CheckCircle size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          className="p-1 text-red-500 hover:text-red-600"
        >
          <XCircle size={20} />
        </motion.button>
      </div>
    </td>
  </motion.tr>
);

const PaymentRow = ({ name, amount, date, status }) => (
  <motion.tr
    whileHover={{ scale: 1.02 }}
    className="border-b border-navy-600"
  >
    <td className="py-3 px-2">{name}</td>
    <td className="py-3 px-2">{amount}</td>
    <td className="py-3 px-2">{date}</td>
    <td className="py-3 px-2">
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
  </motion.tr>
);

const RegistrationsTab = () => (
  <div className="bg-navy-800 rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-6 text-blue-300">Registration Requests</h2>
    <div className="mb-4 flex justify-between items-center">
      <div className="relative">
        <input
          type="text"
          placeholder="Search registrations..."
          className="pl-10 pr-4 py-2 rounded-full bg-navy-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2 text-gray-400" size={20} />
      </div>
      <Link to="/new-registration">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          New Registration <ChevronRight size={20} className="ml-2" />
        </motion.button>
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-navy-600">
            <th className="py-3 px-2 text-blue-300">Student Name</th>
            <th className="py-3 px-2 text-blue-300">Grade</th>
            <th className="py-3 px-2 text-blue-300">Branch</th>
            <th className="py-3 px-2 text-blue-300">Status</th>
            <th className="py-3 px-2 text-blue-300">Actions</th>
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
  </div>
);

const DocumentsTab = () => (
  <div className="bg-navy-800 rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-6 text-blue-300">Document Verification</h2>
    <div className="mb-4 flex justify-between items-center">
      <div className="relative">
        <input
          type="text"
          placeholder="Search documents..."
          className="pl-10 pr-4 py-2 rounded-full bg-navy-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2 text-gray-400" size={20} />
      </div>
      <Link to="/upload-document">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          Upload Document <ChevronRight size={20} className="ml-2" />
        </motion.button>
      </Link>
    </div>
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
  <div className="bg-navy-800 rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-6 text-blue-300">Payment Overview</h2>
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
    <div className="mb-4 flex justify-between items-center">
      <div className="relative">
        <input
          type="text"
          placeholder="Search payments..."
          className="pl-10 pr-4 py-2 rounded-full bg-navy-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2 text-gray-400" size={20} />
      </div>
      <Link to="/new-payment">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          New Payment <ChevronRight size={20} className="ml-2" />
        </motion.button>
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-navy-600">
            <th className="py-3 px-2 text-blue-300">Student Name</th>
            <th className="py-3 px-2 text-blue-300">Amount</th>
            <th className="py-3 px-2 text-blue-300">Date</th>
            <th className="py-3 px-2 text-blue-300">Status</th>
          </tr>
        </thead>
        <tbody>
          <PaymentRow
            name="Alice Johnson"
            amount="$500"
            date="2023-05-01"
            status="Paid"
          />
          <PaymentRow
            name="Bob Smith"
            amount="$750"
            date="2023-05-15"
            status="Pending"
          />
          <PaymentRow
            name="Charlie Brown"
            amount="$600"
            date="2023-04-30"
            status="Overdue"
          />
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminDashboard;