import React from "react";
import { Link, useNavigate } from "react-router";
import { FiHome, FiPlusCircle, FiBookOpen, FiUsers, FiUser, FiLogOut, FiInfo, FiMail, FiX } from "react-icons/fi";

const Sidebar = ({ isOpen = false, setIsOpen = () => {} }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // basic behavior: navigate to home. Replace with real auth logout when available
    console.log("logout clicked");
    navigate("/");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-60 bg-linear-to-b from-[#e7f8ee] to-white border-r border-[#e6f3ea] p-5 flex flex-col gap-3 overflow-auto z-40 transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
    >
      <div className="flex items-center justify-between pb-2 border-b border-transparent">
        <Link to="/" className="flex items-center gap-3 no-underline" aria-label="Go to home" onClick={() => setIsOpen(false)}>
          <div className="w-11 h-11 rounded-lg bg-[#309255] text-white flex items-center justify-center font-extrabold">OLP</div>
          <div className="text-[#309255] font-bold">OnlineLearn</div>
        </Link>

        {/* close button on mobile */}
        <button className="sm:hidden p-1 rounded-md text-gray-600" onClick={() => setIsOpen(false)} aria-label="Close sidebar">
          <FiX />
        </button>
      </div>

      <nav className="flex flex-col gap-2 mt-2">
        <Link to="/dashboard" className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-800 font-semibold hover:bg-[#309255]/10 hover:text-[#309255]" onClick={() => setIsOpen(false)}>
          <FiHome className="text-[#309255] text-lg" />
          <span>Dashboard</span>
        </Link>

        <Link to="/dashboard/add-course" className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-800 font-semibold hover:bg-[#309255]/10 hover:text-[#309255]" onClick={() => setIsOpen(false)}>
          <FiPlusCircle className="text-[#309255] text-lg" />
          <span>Add Course</span>
        </Link>

        <Link to="/dashboard/my-courses" className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-800 font-semibold hover:bg-[#309255]/10 hover:text-[#309255]" onClick={() => setIsOpen(false)}>
          <FiBookOpen className="text-[#309255] text-lg" />
          <span>My Added Courses</span>
        </Link>

        <Link to="/dashboard/enrolled" className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-800 font-semibold hover:bg-[#309255]/10 hover:text-[#309255]" onClick={() => setIsOpen(false)}>
          <FiUsers className="text-[#309255] text-lg" />
          <span>My Enrolled Courses</span>
        </Link>

        <Link to="/dashboard/profile" className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-800 font-semibold hover:bg-[#309255]/10 hover:text-[#309255]" onClick={() => setIsOpen(false)}>
          <FiUser className="text-[#309255] text-lg" />
          <span>My Profile</span>
        </Link>
      </nav>

      <div className="w-full h-px bg-[#e6f3ea] my-3 rounded" aria-hidden></div>

      <nav className="flex flex-col gap-2">
        <Link to="/" className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-800 font-semibold hover:bg-[#309255]/10 hover:text-[#309255]" onClick={() => setIsOpen(false)}>
          <FiHome className="text-[#309255] text-lg" />
          <span>Home</span>
        </Link>

        <Link to="/courses" className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-800 font-semibold hover:bg-[#309255]/10 hover:text-[#309255]" onClick={() => setIsOpen(false)}>
          <FiBookOpen className="text-[#309255] text-lg" />
          <span>All Courses</span>
        </Link>

        <Link to="/about" className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-800 font-semibold hover:bg-[#309255]/10 hover:text-[#309255]" onClick={() => setIsOpen(false)}>
          <FiInfo className="text-[#309255] text-lg" />
          <span>About</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <button className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-red-600 font-bold hover:bg-red-50" onClick={() => { handleLogout(); setIsOpen(false); }}>
          <FiLogOut className="text-red-600 text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
