import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen">
      <header className="bg-navy-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-light-blue-300 mt-2">Welcome back, John Doe!</p>
        </div>
      </header>

      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-4">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-light-blue-500 text-light-blue-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="Registration Status"
                value="Approved"
                icon={CheckCircle}
                color="text-green-500"
              />
              <DashboardCard
                title="Current Grade"
                value="Grade 1"
                icon={BookOpen}
                color="text-blue-500"
              />
              <DashboardCard
                title="Tuition Status"
                value="Paid"
                icon={CreditCard}
                color="text-purple-500"
              />
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>
              <ul className="space-y-4">
                <DocumentItem
                  name="Transfer Letter"
                  status="Approved"
                  icon={CheckCircle}
                  color="text-green-500"
                />
                <DocumentItem
                  name="Report Card"
                  status="Pending"
                  icon={AlertCircle}
                  color="text-yellow-500"
                />
                <DocumentItem
                  name="Birth Certificate"
                  status="Approved"
                  icon={CheckCircle}
                  color="text-green-500"
                />
              </ul>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Payment History</h2>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Date</th>
                    <th className="py-2">Description</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <PaymentRow
                    date="2025-01-15"
                    description="Tuition Fee"
                    amount="$500"
                    status="Paid"
                  />
                  <PaymentRow
                    date="2025-02-01"
                    description="Books and Supplies"
                    amount="$150"
                    status="Pending"
                  />
                  <PaymentRow
                    date="2025-03-01"
                    description="School Trip"
                    amount="$50"
                    status="Paid"
                  />
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>
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

const PaymentRow = ({ date, description, amount, status }) => (
  <tr className="border-b">
    <td className="py-2">{date}</td>
    <td className="py-2">{description}</td>
    <td className="py-2">{amount}</td>
    <td className="py-2">
      <span
        className={`px-2 py-1 rounded-full text-sm font-medium ${
          status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {status}
      </span>
    </td>
  </tr>
);

export default StudentDashboard;