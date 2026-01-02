import logo from "../../assets/images/logo.png"
import { Link, useNavigate, useLocation } from "react-router";
import { FiHome, FiPlusCircle, FiBookOpen, FiUsers, FiUser, FiLogOut, FiInfo, FiMail, FiX } from "react-icons/fi";
import { use } from "react";
import { AuthContext } from "../../Providers/AuthContext";
import { toast } from "react-toastify";

const Sidebar = ({ isOpen = false, setIsOpen = () => { } }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = use(AuthContext);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-60 bg-[#e7f8ee] border-r border-gray-200 p-5 flex flex-col gap-3 overflow-auto z-40 transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
    >
      <div className="flex items-center justify-between pb-2 border-b border-transparent">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={logo}
            className="h-12 w-16"
            alt="EduLe Logo"
          />
          <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">
            Edu<span className="text-[#2d8d54]">Le</span>
          </span>
        </Link>

        {/* close button on mobile */}
        <button className="sm:hidden p-1 rounded-md text-gray-600" onClick={() => setIsOpen(false)} aria-label="Close sidebar">
          <FiX />
        </button>
      </div>

      <nav className="flex flex-col gap-2 mt-2">
        <Link to="/dashboard" className={`flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${isActive('/dashboard') ? 'bg-[#309255] text-white' : 'text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]'}`} onClick={() => setIsOpen(false)}>
          <FiHome className="text-lg" />
          <span>Dashboard</span>
        </Link>

        <Link to="/dashboard/add-course" className={`flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${isActive('/dashboard/add-course') ? 'bg-[#309255] text-white' : 'text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]'}`} onClick={() => setIsOpen(false)}>
          <FiPlusCircle className="text-lg" />
          <span>Add Course</span>
        </Link>

        <Link to="/dashboard/my-courses" className={`flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${isActive('/dashboard/my-courses') ? 'bg-[#309255] text-white' : 'text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]'}`} onClick={() => setIsOpen(false)}>
          <FiBookOpen className="text-lg" />
          <span>My Added Courses</span>
        </Link>

        <Link to="/dashboard/my-enrollments" className={`flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${isActive('/dashboard/my-enrollments') ? 'bg-[#309255] text-white' : 'text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]'}`} onClick={() => setIsOpen(false)}>
          <FiUsers className="text-lg" />
          <span>My Enrolled Courses</span>
        </Link>

        <Link to="/dashboard/my-profile" className={`flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${isActive('/dashboard/my-profile') ? 'bg-[#309255] text-white' : 'text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]'}`} onClick={() => setIsOpen(false)}>
          <FiUser className="text-lg" />
          <span>My Profile</span>
        </Link>
      </nav>

      <div className="w-full h-px bg-white my-3 rounded" aria-hidden></div>

      <nav className="flex flex-col gap-2">
        <Link to="/" className={`flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${isActive('/') ? 'bg-[#309255] text-white' : 'text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]'}`} onClick={() => setIsOpen(false)}>
          <FiHome className="text-lg" />
          <span>Home</span>
        </Link>

        <Link to="/courses" className={`flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${isActive('/courses') ? 'bg-[#309255] text-white' : 'text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]'}`} onClick={() => setIsOpen(false)}>
          <FiBookOpen className="text-lg" />
          <span>All Courses</span>
        </Link>

        <Link to="/about" className={`flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${isActive('/about') ? 'bg-[#309255] text-white' : 'text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]'}`} onClick={() => setIsOpen(false)}>
          <FiInfo className="text-lg" />
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
