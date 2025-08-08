import React from 'react';
import AdminHeader from './AdminHeader';
import AdminMenu from './AdminMenu';
import { AdminMenuProvider, useAdminMenu } from '../contexts/AdminMenuContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayoutContent: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isMenuOpen } = useAdminMenu();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <AdminHeader />
      
      {/* Admin Menu */}
      <AdminMenu />
      
      {/* Main Content */}
      <div className="pt-16 pl-4">
        <main className={`p-6 transition-all duration-300 ${
          isMenuOpen ? 'lg:ml-80' : 'lg:ml-4'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <AdminMenuProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminMenuProvider>
  );
};

export default AdminLayout;
