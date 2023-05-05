import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Header, Loader, Sidebar } from '../../components';

function Layout() {
  const { user, loading } = useSelector((state) => state.auth)
  if (loading || !user) return <Loader />
  return (
    <div className="flex h-screen">
      <Sidebar user={user} />
      <div className="flex flex-col flex-1 h-screen overflow-y-auto">
        <div className='fixed w-[82%]'>
          <Header />
        </div>
        <div className="flex-grow p-4 mt-[40px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
