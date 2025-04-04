import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function DashboardPage() {
  // This component sets up the main layout for authenticated users
  // We assume the user is authenticated here for now.
  // Authentication logic will be added later.

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-body">
        <Sidebar />
        <div className="dashboard-content">
          {/* Outlet will render the nested route's component (NewsFeed or Settings) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
