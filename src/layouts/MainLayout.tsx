import React from 'react';
import Header from '../components/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background text-text h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
