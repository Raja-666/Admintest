// Example AdminPanel component
import React from 'react';
import { useGetAllUsersQuery } from '../../store/Endpoint';

const AdminPanel = () => {
  const { data: adminData } = useGetAllUsersQuery();

  // Check if the current user has the admin role
  const isAdmin = adminData && adminData.length > 0 && adminData[0].role === 'admin';

  if (!isAdmin) {
    // Redirect or show access denied message for non-admin users
    return <p>You do not have permission to access this page.</p>;
  }

  // Render your admin panel content
  return (
    <div>
      <h1>Admin Panel</h1>
      {/* Add admin-specific content here */}
    </div>
  );
};

export default AdminPanel;
