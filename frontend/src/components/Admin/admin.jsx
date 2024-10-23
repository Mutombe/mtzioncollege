import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  FileText,
  Menu,
  X,
  ChevronRight,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRegistrations } from '../../redux/registrationSlice';
import { fetchUser } from '../../redux/authSlice';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Menu as MuiMenu,
  MenuItem,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('registrations');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const { registrations, loading } = useSelector((state) => state.registration);
  const current_user = useSelector((state) => state.auth.current_user);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchRegistrations());
  }, [dispatch]);

  const tabs = [
    { id: 'registrations', label: 'Registration Requests', icon: Users },
    { id: 'documents', label: 'Document Verification', icon: FileText },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-">
      {/* Header */}
      <header className=" shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <IconButton
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="text-blue-200" />
              </IconButton>
              <h1 className="ml-4 text-2xl font-bold text-blue-200">
                School Admin Portal
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {current_user?.name || 'Admin'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || !window.matchMedia('(max-width: 1024px)').matches) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg overflow-y-auto"
            >
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon size={20} className="mr-3" />
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {activeTab === 'registrations' && (
                <RegistrationsPanel 
                  registrations={registrations}
                  loading={loading}
                  setSelectedRequest={setSelectedRequest}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  filterAnchorEl={filterAnchorEl}
                  setFilterAnchorEl={setFilterAnchorEl}
                  itemVariants={itemVariants}
                />
              )}
              {activeTab === 'documents' && (
                <DocumentsPanel 
                  registrations={registrations}
                  itemVariants={itemVariants}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Request Details Dialog */}
      <RequestDetailsDialog
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
      {status}
    </span>
  );
};

const RegistrationsPanel = ({ 
  registrations, 
  loading, 
  setSelectedRequest, 
  filterStatus, 
  setFilterStatus,
  filterAnchorEl,
  setFilterAnchorEl,
  itemVariants 
}) => {
  const filteredRegistrations = registrations.filter(reg => 
    filterStatus === 'all' || reg.status === filterStatus
  );

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Registration Requests</h2>
        <div className="flex space-x-4">
          <TextField
            size="small"
            placeholder="Search requests..."
            InputProps={{
              startAdornment: <Search className="text-gray-400 mr-2" size={20} />
            }}
          />
          <Button
            variant="outlined"
            startIcon={<Filter />}
            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
          >
            Filter
          </Button>
          <MuiMenu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={() => setFilterAnchorEl(null)}
          >
            <MenuItem onClick={() => setFilterStatus('all')}>All Requests</MenuItem>
            <MenuItem onClick={() => setFilterStatus('pending')}>Pending</MenuItem>
            <MenuItem onClick={() => setFilterStatus('approved')}>Approved</MenuItem>
            <MenuItem onClick={() => setFilterStatus('rejected')}>Rejected</MenuItem>
          </MuiMenu>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRegistrations.map((registration) => (
            <motion.div
              key={registration.id}
              variants={itemVariants}
              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {registration.full_name}
                  </h3>
                  <div className="mt-1 space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Grade {registration.grade}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {registration.branch}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => setSelectedRequest(registration)}>
                      <Eye className="text-blue-500" size={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Approve">
                    <IconButton color="success">
                      <CheckCircle size={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reject">
                    <IconButton color="error">
                      <XCircle size={20} />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const DocumentsPanel = ({ registrations, itemVariants }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Document Verification</h2>
        <TextField
          size="small"
          placeholder="Search documents..."
          InputProps={{
            startAdornment: <Search className="text-gray-400 mr-2" size={20} />
          }}
        />
      </div>

      <div className="space-y-4">
        {registrations.map((registration) => (
          <motion.div
            key={registration.id}
            variants={itemVariants}
            className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {registration.full_name}'s Documents
                </h3>
                <div className="mt-2 space-y-2">
                  {['Birth Certificate', 'Previous School Records', 'Medical Records'].map((doc) => (
                    <div key={doc} className="flex items-center space-x-2">
                      <FileText size={16} className="text-gray-400" />
                      <span className="text-gray-600">{doc}</span>
                      <IconButton size="small">
                        <Download className="text-blue-500" size={16} />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircle />}
              >
                Verify All
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const RequestDetailsDialog = ({ request, onClose }) => {
  if (!request) return null;

  return (
    <Dialog 
      open={!!request} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Registration Request Details
      </DialogTitle>
      <DialogContent>
        <div className="space-y-4 mt-4">
          <div>
            <h4 className="font-medium text-gray-900">Personal Information</h4>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600">Name: {request.full_name}</p>
              <p className="text-gray-600">Grade: {request.grade}</p>
              <p className="text-gray-600">Branch: {request.branch}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Documents</h4>
            <div className="mt-2 space-y-2">
              {['Birth Certificate', 'Previous School Records', 'Medical Records'].map((doc) => (
                <div key={doc} className="flex items-center justify-between">
                  <span className="text-gray-600">{doc}</span>
                  <IconButton size="small">
                    <Download className="text-blue-500" size={16} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckCircle />}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<XCircle />}
        >
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminDashboard;