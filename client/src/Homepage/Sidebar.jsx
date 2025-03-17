import React from 'react';
import { FaHome, FaFolder, FaCalendarAlt, FaChartBar, FaCog } from "react-icons/fa";
import { PiTrafficSignal } from "react-icons/pi";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex flex-col bg-slate-100 w-1/6 h-screen p-6">
      <div className="flex items-center mb-8">
        <h2 className="text-xl font-bold text-purple-600">ProjectPro</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-100 transition-colors duration-200 text-gray-700 hover:text-purple-700 font-medium">
          <FaHome className="text-lg" />
          <span>Home</span>
        </Link>
        
        <Link to="/projects" className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-100 transition-colors duration-200 text-gray-700 hover:text-purple-700 font-medium">
          <FaFolder className="text-lg" />
          <span>Projects</span>
        </Link>
        
        <Link to="/status" className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-100 transition-colors duration-200 text-gray-700 hover:text-purple-700 font-medium">
          <PiTrafficSignal className="text-lg" />
          <span>Status Updates</span>
        </Link>
        
        <Link to="/calendar" className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-100 transition-colors duration-200 text-gray-700 hover:text-purple-700 font-medium">
          <FaCalendarAlt className="text-lg" />
          <span>Calendar</span>
        </Link>
        
        <Link to="/reports" className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-100 transition-colors duration-200 text-gray-700 hover:text-purple-700 font-medium">
          <FaChartBar className="text-lg" />
          <span>Reports</span>
        </Link>
      </div>
      
      <div className="mt-auto">
        <Link to="/settings" className="flex items-center gap-3 p-3 rounded-md hover:bg-purple-100 transition-colors duration-200 text-gray-700 hover:text-purple-700 font-medium">
          <FaCog className="text-lg" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;