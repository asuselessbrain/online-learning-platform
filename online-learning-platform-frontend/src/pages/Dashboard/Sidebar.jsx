import logo from "../../assets/images/logo.png"
import { Link, NavLink, useNavigate } from "react-router";
import { FiHome, FiBookOpen, FiUsers, FiUser, FiLogOut, FiInfo, FiX, FiPlus, FiUserCheck, FiBarChart, FiFileText, FiStar, FiTrendingUp, FiTag } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { GiProgression } from "react-icons/gi";
import { LiaCertificateSolid } from "react-icons/lia";
import { use } from "react";
import { AuthContext } from "../../Providers/AuthContext";
import { toast } from "react-toastify";
import useRole from "../../hooks/useRole";

const Sidebar = ({ isOpen = false, setIsOpen = () => { } }) => {
    const navigate = useNavigate();
    const role = useRole();

    const { logout } = use(AuthContext);

    const handleLogout = async () => {
        await logout();
        toast.success("Logged out successfully");
        navigate("/");
    };

    

    const adminLinks = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <FiHome size={24} /> },
        { name: "Add Course", path: "/admin/add-course", icon: <FiPlus size={24} /> },
        { name: "Manage Courses", path: "/admin/manage-courses", icon: <FiBookOpen size={24} /> },
        { name: "Manage Category", path: "/admin/manage-category", icon: <FiTag size={24} /> },
        { name: "Add Instructor", path: "/admin/add-instructor", icon: <FiPlus size={24} /> },
        { name: "Manage Instructors", path: "/admin/manage-instructors", icon: <FiUsers size={24} /> },
        { name: "Manage Students", path: "/admin/manage-students", icon: <FiUsers size={24} /> },
        { name: "Enrollments", path: "/admin/enrollments", icon: <FiUserCheck size={24} /> },
        {name: "Manage FAQ", path: "/admin/manage-faq", icon: <FiInfo size={24} /> },
        { name: "Add Blog", path: "/admin/add-blog", icon: <FiFileText size={24} /> },
        { name: "Manage Blogs", path: "/admin/manage-blogs", icon: <FiFileText size={24} /> },
        { name: "Analytics", path: "/admin/analytics", icon: <FiBarChart size={24} /> },
        { name: "Settings", path: "/admin/settings", icon: <FiUser size={24} /> },
    ]

    const instructorLinks = [
        { name: "Dashboard", path: "/instructor/dashboard", icon: <FiHome size={24} /> },
        { name: "My Assigned Courses", path: "/instructor/my-assigned-courses", icon: <FiBookOpen size={24} /> },
        { name: "Manage Course Content", path: "/instructor/manage-course-content", icon: <FiFileText size={24} /> },
        { name: "Enrolled Students", path: "/instructor/enrolled-students", icon: <LuGraduationCap size={24} /> },
        { name: "Manage Students", path: "/instructor/manage-students", icon: <FiUsers size={24} /> },
        { name: "Review & Ratting", path: "/instructor/review-and-ratting", icon: <FiStar size={24} /> },
        { name: "Profile", path: "/instructor/profile", icon: <FiUser size={24} /> },
    ]

    const studentLinks = [
        { name: "Dashboard", path: "/student/dashboard", icon: <FiHome size={24} /> },
        { name: "My Enrolled Courses", path: "/student/my-enrolled-courses", icon: <FiBookOpen size={24} /> },
        { name: "Course Progress", path: "/student/course-progress", icon: <FiTrendingUp size={24} /> },
        { name: "Certificates", path: "/student/certificates", icon: <LiaCertificateSolid size={24} /> },
        { name: "Profile Settings", path: "/student/profile", icon: <FiUser size={24} /> },
    ]
    return (
        <aside
            className={`fixed top-0 left-0 h-screen w-72 bg-[#e7f8ee] border-r border-gray-200 p-5 flex flex-col gap-3 overflow-auto z-40 transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
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
                {
                    role.role === 'admin' && adminLinks.map((link, index) => (
                        <NavLink key={index} to={link.path} className={({ isActive }) =>
                            `flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${isActive
                                ? "bg-[#309255] text-white"
                                : "text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]"
                            }`
                        } onClick={() => setIsOpen(false)}>
                            {link.icon}
                            <span>{link.name}</span>
                        </NavLink>
                    ))
                }
                {
                    role.role === 'instructor' && instructorLinks.map((link, index) => (
                        <NavLink key={index} to={link.path} className={({ isActive }) =>
                            `flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${isActive
                                ? "bg-[#309255] text-white"
                                : "text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]"
                            }`
                        } onClick={() => setIsOpen(false)}>
                            {link.icon}
                            <span>{link.name}</span>
                        </NavLink>
                    ))
                }
                {
                    role.role === 'student' && studentLinks.map((link, index) => (
                        <NavLink key={index} to={link.path} className={({ isActive }) =>
                            `flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${isActive
                                ? "bg-[#309255] text-white"
                                : "text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]"
                            }`
                        } onClick={() => setIsOpen(false)}>
                            {link.icon}
                            <span>{link.name}</span>
                        </NavLink>
                    ))
                }
            </nav>

            <div className="w-full h-px bg-white my-3 rounded" aria-hidden></div>

            <nav className="flex flex-col gap-2">
                <NavLink to="/" className={`flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${({ isActive }) =>
                    isActive ? "bg-[#309255] text-white" : "text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]"
                    }`} onClick={() => setIsOpen(false)}>
                    <FiHome className="text-lg" />
                    <span>Home</span>
                </NavLink>

                <NavLink to="/courses" className={`flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${({ isActive }) =>
                    isActive ? "bg-[#309255] text-white" : "text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]"
                    }`} onClick={() => setIsOpen(false)}>
                    <FiBookOpen className="text-lg" />
                    <span>All Courses</span>
                </NavLink>

                <NavLink to="/about" className={`flex items-center gap-3 px-2 py-2 rounded-md font-semibold transition-colors ${({ isActive }) =>
                    isActive ? "bg-[#309255] text-white" : "text-gray-800 hover:bg-[#309255]/10 hover:text-[#309255]"
                    }`} onClick={() => setIsOpen(false)}>
                    <FiInfo className="text-lg" />
                    <span>About</span>
                </NavLink>
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
