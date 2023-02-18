import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../../components';

function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen overflow-y-auto">
        <Header />
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
