import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="flex min-h-screen">
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-20 w-3/5 lg:translate-x-0 lg:w-1/6 bg-cyan-500 font-cinzel font-semibold min-h-screen 
        text-center transition-transform duration-300`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-5 left-5 text-left p-2 rounded text-black border-none hover:bg-white/40 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>
        <div className="w-full">
          <Sidebar />
        </div>
      </div>

      <div className="lg:ml-[255px] flex-1 mx-auto overflow-x-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-5 left-5 p-2 rounded text-black border-none hover:bg-gray-500/20 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
