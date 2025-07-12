'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FiUsers, FiCalendar, FiLogOut, FiRefreshCw } from 'react-icons/fi';
import useAuth from '@/lib/useAuth';

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: string;
  propertyInterest?: string; // Changed to string to accept any value
  budget?: string;
  callStatus?: string; // Changed to string to accept any value
  callNotes?: string;
  preferredLocation?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [userForm, setUserForm] = useState<Partial<User>>({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editModalUser, setEditModalUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Mock data to ensure users are displayed
  const MOCK_USERS = [
    {
      _id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      message: 'Interested in a property tour for Prestige Somerville. I\'m looking for a 3BHK with lake view.',
      createdAt: '2025-06-28T10:30:00.000Z',
      propertyInterest: 'High',
      budget: 'Rs.800,000-Rs.1,000,000',
      callStatus: 'Called',
      callNotes: 'Scheduled property tour for July 5th. Very interested in premium floor plans.',
      preferredLocation: 'Lakefront facing'
    },
    {
      _id: '2',
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+0987654321',
      message: 'Looking for investment opportunities in Prestige Somerville.',
      createdAt: '2025-06-29T14:15:00.000Z',
      propertyInterest: 'Medium',
      budget: 'Rs.500,000-Rs.700,000',
      callStatus: 'Not Called',
      callNotes: '',
      preferredLocation: 'City view'
    },
    {
      _id: '3',
      fullName: 'Michael Johnson',
      email: 'michael@example.com',
      phone: '+1122334455',
      message: 'Interested in 3BHK apartments with modern amenities.',
      createdAt: '2025-06-25T09:45:00.000Z',
      propertyInterest: 'High',
      budget: 'Rs.1,000,000+',
      callStatus: 'Called',
      callNotes: 'Very interested, requested floor plans.',
      preferredLocation: 'Corner unit'
    },
    {
      _id: '4',
      fullName: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+5544332211',
      message: 'Looking for information about amenities and security features.',
      createdAt: '2025-06-27T16:20:00.000Z',
      propertyInterest: 'Low',
      budget: 'Not disclosed',
      callStatus: 'Called',
      callNotes: 'Just gathering information, not ready to buy yet.',
      preferredLocation: 'Not specific'
    },
    {
      _id: '5',
      fullName: 'Robert Brown',
      email: 'robert@example.com',
      phone: '+9988776655',
      message: 'Interested in payment plans and financing options.',
      createdAt: '2025-06-30T08:10:00.000Z',
      propertyInterest: 'High',
      budget: 'Rs.600,000-Rs.900,000',
      callStatus: 'Not Called',
      callNotes: '',
      preferredLocation: 'Pool view'
    }
  ];

  // Fetch users on component mount
  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        fetchUsers();
      }
      // Redirect handled by useAuth hook if not authenticated
    }
  }, [authLoading, isAuthenticated]);

  const fetchUsers = async () => {
    setLoading(true);
    setNotification(null);
    // setError('');
    try {
      // Using the correct GET /hods route as per your API specification
      const response = await axios.get('https://api.lutui.in/tp/hods');
      if (response.data.success) {
        setUsers(response.data.data.users);
        setTotalUsers(response.data.data.totalUsers);
        setNotification({
          type: 'success',
          message: 'User data successfully loaded'
        });
      } else {
        // setError('Failed to fetch users');
        setNotification({
          type: 'error',
          message: 'Failed to fetch users: ' + (response.data.message || 'Unknown error')
        });
        // Fallback to mock data if API fails
        setUsers(MOCK_USERS);
        setTotalUsers(MOCK_USERS.length);
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      // setError('An error occurred while fetching users: ' + errorMessage);
      setNotification({
        type: 'error',
        message: 'Failed to fetch users: ' + errorMessage
      });
      // Fallback to mock data if API fails
      setUsers(MOCK_USERS);
      setTotalUsers(MOCK_USERS.length);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Use the logout function from our useAuth hook
    logout();
  };

  const handleEditUser = (user: User) => {
    // For the modal edit
    setEditModalUser(user);
    setUserForm({
      propertyInterest: user.propertyInterest,
      budget: user.budget,
      callStatus: user.callStatus,
      callNotes: user.callNotes,
      preferredLocation: user.preferredLocation
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditModalUser(null);
    setUserForm({});
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = async (userId: string) => {
    setFormSubmitting(true);
    setNotification(null);
    try {
      // Using the correct PUT /hod/:id route as per your API specification
      const response = await axios.put(`https://api.lutui.in/tp/hod/${userId}`, userForm);
      
      if (response.data.success) {
        // If API call was successful, update the local state
        setUsers(users.map(user => 
          user._id === userId 
            ? { ...user, ...userForm } 
            : user
        ));
        
        setEditingUser(null);
        setEditModalUser(null);
        setUserForm({});
        
        // Show success notification
        setNotification({
          type: 'success',
          message: 'User information successfully updated'
        });
      } else {
        // Handle API error
        console.error('API Error:', response.data.message || 'Failed to update user');
        setNotification({
          type: 'error',
          message: 'Failed to update user: ' + (response.data.message || 'Unknown error')
        });
      }
    } catch (error: any) {
      console.error('Error updating user:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      setNotification({
        type: 'error',
        message: 'Failed to update user: ' + errorMessage
      });
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Register new user
  const registerNewUser = async (userData: Partial<User>) => {
    setFormSubmitting(true);
    setNotification(null);
    try {
      // Using the POST /hod/join route as per your API specification
      const response = await axios.post('https://api.lutui.in/tp/hod/join', userData);
      
      if (response.data.success) {
        // Add the new user to the local state
        const newUser = response.data.data.user;
        setUsers([newUser, ...users]);
        setTotalUsers(prevTotal => prevTotal + 1);
        
        // Reset form and show success notification
        setNotification({
          type: 'success',
          message: 'New user successfully registered'
        });
        return true;
      } else {
        console.error('API Error:', response.data.message || 'Failed to register user');
        setNotification({
          type: 'error',
          message: 'Failed to register user: ' + (response.data.message || 'Unknown error')
        });
        return false;
      }
    } catch (error: any) {
      console.error('Error registering user:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      setNotification({
        type: 'error',
        message: 'Failed to register user: ' + errorMessage
      });
      return false;
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Get counts for dashboard metrics
  const getHighInterestCount = () => {
    return users.filter(user => user.propertyInterest === 'High').length;
  };
  
  const getRecentlyContactedCount = () => {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);
    
    return users.filter(user => 
      user.callStatus === 'Called' && 
      new Date(user.createdAt) > weekAgo
    ).length;
  };

  // Format date to a readable string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewDetails = async (user: User) => {
    // Set the user initially from our local state
    setSelectedUser(user);
    
    // Try to fetch the latest data from the API
    try {
      const latestUserData = await getUserById(user._id);
      if (latestUserData) {
        // Update with the latest data from the API
        setSelectedUser(latestUserData);
      }
    } catch (error) {
      console.error('Error fetching latest user data:', error);
      // Keep using the data we already have if the API call fails
    }
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  // Get user by ID
  const getUserById = async (userId: string) => {
    try {
      const response = await axios.get(`https://api.lutui.in/tp/hod/${userId}`);
      if (response.data.success) {
        return response.data.data.user;
      } else {
        console.error('Failed to get user details');
        return null;
      }
    } catch (error) {
      console.error('Error getting user details:', error);
      return null;
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setNotification(null);
    try {
      const response = await axios.delete(`https://api.lutui.in/tp/hod/${userId}`);
      
      if (response.data.success) {
        // Remove the user from the local state
        setUsers(users.filter(user => user._id !== userId));
        setTotalUsers(prevTotal => prevTotal - 1);
        
        setNotification({
          type: 'success',
          message: 'User successfully deleted'
        });
      } else {
        console.error('API Error:', response.data.message || 'Failed to delete user');
        setNotification({
          type: 'error',
          message: 'Failed to delete user: ' + (response.data.message || 'Unknown error')
        });
      }
    } catch (error: any) {
      console.error('Error deleting user:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      setNotification({
        type: 'error',
        message: 'Failed to delete user: ' + errorMessage
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Show loading state when checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Verifying authentication...</h2>
          <p className="text-gray-500 mt-2">Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }

  // If not authenticated, useAuth will redirect to login page
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Prestige Somerville Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Manage property leads and customer interactions</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {notification.type === 'success' ? (
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button 
                    type="button" 
                    onClick={() => setNotification(null)}
                    className={`inline-flex rounded-md p-1.5 ${notification.type === 'success' ? 'text-green-500 hover:bg-green-100' : 'text-red-500 hover:bg-red-100'}`}
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <FiUsers className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Leads</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{totalUsers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <FiCalendar className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Latest Registration</dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {users.length > 0 ? formatDate(users[0].createdAt) : 'No leads yet'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">High Interest</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{getHighInterestCount()}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Recent Contacts</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{getRecentlyContactedCount()}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Registered Users</h2>
            <button
              onClick={fetchUsers}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiRefreshCw className="mr-2" />
              Refresh
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-10">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-2 text-gray-600">Loading users...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchUsers}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No users have registered yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property Interest
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Call Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className={editingUser === user._id ? "bg-gray-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                        {editingUser === user._id && (
                          <div className="mt-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Call Notes</label>
                            <textarea
                              name="callNotes"
                              value={userForm.callNotes || ''}
                              onChange={handleFormChange}
                              rows={3}
                              className="text-sm rounded border border-gray-300 w-full text-gray-900 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                              placeholder="Add notes about the call..."
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(user.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingUser === user._id ? (
                          <select
                            name="propertyInterest"
                            value={userForm.propertyInterest || ''}
                            onChange={handleFormChange}
                            className="text-sm rounded border border-gray-300 text-gray-900 py-2 px-3 bg-white"
                          >
                            <option value="">Select</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        ) : (
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.propertyInterest === 'High' ? 'bg-green-100 text-green-800' : 
                              user.propertyInterest === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                              user.propertyInterest === 'Low' ? 'bg-red-100 text-red-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {user.propertyInterest || 'Not set'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingUser === user._id ? (
                          <select
                            name="callStatus"
                            value={userForm.callStatus || ''}
                            onChange={handleFormChange}
                            className="text-sm rounded border border-gray-300 text-gray-900 py-2 px-3 bg-white"
                          >
                            <option value="">Select</option>
                            <option value="Called">Called</option>
                            <option value="Not Called">Not Called</option>
                            <option value="Follow Up Required">Follow Up Required</option>
                          </select>
                        ) : (
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.callStatus === 'Called' ? 'bg-green-100 text-green-800' : 
                              user.callStatus === 'Follow Up Required' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {user.callStatus || 'Not set'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingUser === user._id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              name="budget"
                              value={userForm.budget || ''}
                              onChange={handleFormChange}
                              className="text-sm rounded border border-gray-300 text-gray-900 py-2 px-3 w-full bg-white"
                              placeholder="Budget range"
                            />
                            <input
                              type="text"
                              name="preferredLocation"
                              value={userForm.preferredLocation || ''}
                              onChange={handleFormChange}
                              className="text-sm rounded border border-gray-300 text-gray-900 py-2 px-3 w-full bg-white"
                              placeholder="Preferred location"
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="text-sm text-gray-900">{user.budget || 'Not set'}</div>
                            {user.preferredLocation && (
                              <div className="text-xs text-gray-500 mt-1">Location: {user.preferredLocation}</div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleViewDetails(user)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* User details modal */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4">
                <div className="flex justify-between items-center p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Lead Details</h2>
                  <button 
                    onClick={handleCloseDetails}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Full Name</span>
                          <p className="mt-1">{selectedUser.fullName}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Email</span>
                          <p className="mt-1">{selectedUser.email}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Phone</span>
                          <p className="mt-1">{selectedUser.phone}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Registration Date</span>
                          <p className="mt-1">{formatDate(selectedUser.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Property Preferences</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Interest Level</span>
                          <p className="mt-1">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${selectedUser.propertyInterest === 'High' ? 'bg-green-100 text-green-800' : 
                                selectedUser.propertyInterest === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                selectedUser.propertyInterest === 'Low' ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'}`}>
                              {selectedUser.propertyInterest || 'Not set'}
                            </span>
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Budget Range</span>
                          <p className="mt-1">{selectedUser.budget || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Preferred Location</span>
                          <p className="mt-1">{selectedUser.preferredLocation || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Call Status</span>
                          <p className="mt-1">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${selectedUser.callStatus === 'Called' ? 'bg-green-100 text-green-800' : 
                                selectedUser.callStatus === 'Follow Up Required' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-gray-100 text-gray-800'}`}>
                              {selectedUser.callStatus || 'Not contacted'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Message from Lead</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedUser.message || 'No message provided'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Call Notes</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedUser.callNotes || 'No call notes yet'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => {
                        handleEditUser(selectedUser);
                        handleCloseDetails();
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Lead
                    </button>
                    
                    <button
                      onClick={handleCloseDetails}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {editModalUser && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4">
                <div className="flex justify-between items-center p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Edit Lead</h2>
                  <button 
                    onClick={handleCancelEdit}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Full Name</span>
                          <p className="mt-1">{editModalUser.fullName}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Email</span>
                          <p className="mt-1">{editModalUser.email}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Phone</span>
                          <p className="mt-1">{editModalUser.phone}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Registration Date</span>
                          <p className="mt-1">{formatDate(editModalUser.createdAt)}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Message</span>
                          <p className="mt-1 text-gray-700 whitespace-pre-wrap">{editModalUser.message || 'No message provided'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Lead Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Interest Level</label>
                          <select
                            name="propertyInterest"
                            value={userForm.propertyInterest || ''}
                            onChange={handleFormChange}
                            className="w-full rounded border border-gray-300 text-gray-900 py-2 px-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                          <input
                            type="text"
                            name="budget"
                            value={userForm.budget || ''}
                            onChange={handleFormChange}
                            className="w-full rounded border border-gray-300 text-gray-900 py-2 px-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Budget range"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
                          <input
                            type="text"
                            name="preferredLocation"
                            value={userForm.preferredLocation || ''}
                            onChange={handleFormChange}
                            className="w-full rounded border border-gray-300 text-gray-900 py-2 px-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Preferred location"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Call Status</label>
                          <select
                            name="callStatus"
                            value={userForm.callStatus || ''}
                            onChange={handleFormChange}
                            className="w-full rounded border border-gray-300 text-gray-900 py-2 px-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select</option>
                            <option value="Called">Called</option>
                            <option value="Not Called">Not Called</option>
                            <option value="Follow Up Required">Follow Up Required</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Call Notes</label>
                          <textarea
                            name="callNotes"
                            value={userForm.callNotes || ''}
                            onChange={handleFormChange}
                            rows={5}
                            className="w-full rounded border border-gray-300 text-gray-900 py-2 px-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Add notes about the call..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end space-x-4">
                    <button
                      onClick={handleCancelEdit}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={() => handleUpdateUser(editModalUser._id)}
                      disabled={formSubmitting}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {formSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>Save Changes</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
