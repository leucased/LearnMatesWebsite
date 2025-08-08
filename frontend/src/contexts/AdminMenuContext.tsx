import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminMenuContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const AdminMenuContext = createContext<AdminMenuContextType | undefined>(undefined);

export const useAdminMenu = () => {
  const context = useContext(AdminMenuContext);
  if (context === undefined) {
    throw new Error('useAdminMenu must be used within an AdminMenuProvider');
  }
  return context;
};

interface AdminMenuProviderProps {
  children: ReactNode;
}

export const AdminMenuProvider: React.FC<AdminMenuProviderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const value: AdminMenuContextType = {
    isMenuOpen,
    setIsMenuOpen
  };

  return (
    <AdminMenuContext.Provider value={value}>
      {children}
    </AdminMenuContext.Provider>
  );
};
