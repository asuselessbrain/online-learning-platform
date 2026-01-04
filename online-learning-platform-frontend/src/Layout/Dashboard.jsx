import { Link, Outlet } from "react-router";
import { use, useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../pages/Dashboard/Sidebar";
import logo from "../assets/images/logo.png"
import { AuthContext } from "../Providers/AuthContext";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = use(AuthContext);
    console.log(user)

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden
                />
            )}

            <main className="ml-0 lg:ml-[252px] flex-1 bg-[#F9FAFB]">
                <div className="lg:hidden mb-4 flex items-center justify-between p-4 border-b border-gray-200">
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
                    <button
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 bg-white shadow-sm"
                        onClick={() => setIsSidebarOpen((s) => !s)}
                        aria-label="Toggle sidebar"
                    >
                        <FiMenu />
                    </button>
                </div>

                <div>
                    <div className="py-6 px-6 flex items-center justify-between border-b border-gray-200 mb-4 shadow-sm">
                        <div>
                            <h2 className="text-2xl">Welcome back {user?.displayName}</h2>
                            <p>{user?.email}</p>
                        </div>
                        <img src={user?.photoURL} alt={user?.displayName} className="rounded-full w-12 h-12" />
                    </div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;