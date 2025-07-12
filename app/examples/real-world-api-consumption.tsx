// Example of how your dashboard page would consume the API in a real-world production setting

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { hodService, HodUser } from '@/lib/apiService';
import { useFetch, useMutation } from '@/lib/useApi';
import { FiUsers, FiCalendar, FiLogOut, FiRefreshCw } from 'react-icons/fi';

// Production-ready implementation of the dashboard component
export default function AdminDashboardExample() {
  const router = useRouter();
  
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState<HodUser | null>(null);
  const [editModalUser, setEditModalUser] = useState<HodUser | null>(null);
  const [userForm, setUserForm] = useState<Partial<HodUser>>({});
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [filterCriteria, setFilterCriteria] = useState({
    searchTerm: '',
    propertyInterest: '',
    callStatus: ''
  });

  // Data fetching with custom hook
  const { 
    data: usersData, 
    loading, 
    error, 
    refetch: refetchUsers
  } = useFetch(
    () => hodService.getAll(currentPage, pageSize), 
    {
      dependencies: [currentPage, pageSize],
      onError: (error) => {
        setNotification({
          type: 'error',
          message: `Failed to fetch users: ${error.message}`
        });
      }
    }
  );

  // Mutations with custom hooks
  const { mutate: updateUser, loading: updating } = useMutation(
    (data: { id: string, userData: Partial<HodUser> }) => 
      hodService.update(data.id, data.userData)
  );

  const { mutate: deleteUser, loading: deleting } = useMutation(
    (id: string) => hodService.delete(id)
  );

  const { mutate: createUser, loading: creating } = useMutation(
    (userData: Omit<HodUser, '_id' | 'createdAt'>) => hodService.create(userData)
  );

  // Derived state
  const users = usersData?.hods || [];
  const totalUsers = usersData?.totalHods || 0;
  const totalPages = Math.ceil(totalUsers / pageSize);
  const isLoading = loading || updating || deleting || creating;

  // Fetch detailed user data
  const fetchUserDetails = useCallback(async (userId: string) => {
    try {
      const response = await hodService.getById(userId);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch user details');
    } catch (error) {
      console.error('Error fetching user details:', error);
      setNotification({
        type: 'error',
        message: `Failed to fetch user details: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
      return null;
    }
  }, []);

  // Handlers for user actions
  const handleViewDetails = useCallback(async (user: HodUser) => {
    setSelectedUser(user);
    
    // Get fresh data
    const updatedUser = await fetchUserDetails(user._id);
    if (updatedUser) {
      setSelectedUser(updatedUser);
    }
  }, [fetchUserDetails]);

  const handleEditUser = useCallback((user: HodUser) => {
    setEditModalUser(user);
    setUserForm({
      propertyInterest: user.propertyInterest,
      budget: user.budget,
      callStatus: user.callStatus,
      callNotes: user.callNotes,
      preferredLocation: user.preferredLocation
    });
  }, []);

  const handleUpdateUser = useCallback(async (userId: string) => {
    try {
      await updateUser(
        { id: userId, userData: userForm },
        {
          onSuccess: () => {
            // Update local state
            refetchUsers();
            setEditModalUser(null);
            setUserForm({});
            
            setNotification({
              type: 'success',
              message: 'User information successfully updated'
            });
          },
          onError: (error) => {
            setNotification({
              type: 'error',
              message: `Failed to update user: ${error.message}`
            });
          }
        }
      );
    } catch (error) {
      // Error is handled by the mutation hook
    }
  }, [userForm, updateUser, refetchUsers]);

  const handleDeleteUser = useCallback(async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteUser(userId, {
        onSuccess: () => {
          refetchUsers();
          setNotification({
            type: 'success',
            message: 'User successfully deleted'
          });
        },
        onError: (error) => {
          setNotification({
            type: 'error',
            message: `Failed to delete user: ${error.message}`
          });
        }
      });
    } catch (error) {
      // Error is handled by the mutation hook
    }
  }, [deleteUser, refetchUsers]);

  // Filter functions
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterCriteria(prev => ({ ...prev, [name]: value }));
    
    // Reset to first page when filter changes
    setCurrentPage(1);
  };

  // Clear the notification after a delay
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Handle page changes for pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Logout handler
  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('auth_token');
    router.push('/admin/login');
  };

  // UI Components would go here...
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* This would be your UI implementation */}
      <p>Example of real-world API consumption - see full implementation in your actual components</p>
    </div>
  );
}
