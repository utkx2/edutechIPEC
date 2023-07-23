import { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
// import TenderStatistics from "./TenderStatistics"
// import UserStatistics from "./UserStatistics"

const DashboardHome = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden ">
      {/* Sidebar */}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          {/*  Site header 
      import Header from '../partials/Header';
      */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-gray-100">
            {/* Dashboard actions */}
            {/* Cards */}
            <div className="grid grid-cols-15 gap-6">
              {/*---------> Table (Top Channels) */}
              <div className="text-center">
                {/* <TenderStatistics/>
                <UserStatistics/> */}
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>

  );
};

export default DashboardHome;
