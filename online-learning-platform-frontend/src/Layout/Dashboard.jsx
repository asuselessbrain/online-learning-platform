import { Outlet } from "react-router";
import React, { useState } from "react";
import Sidebar from "../Components/Shared/Sidebar";
import { FiMenu } from "react-icons/fi";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 sm:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden
                />
            )}

            <main className="ml-0 sm:ml-60 p-5 flex-1">
                <div className="sm:hidden mb-4">
                    <button
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 bg-white shadow-sm"
                        onClick={() => setIsSidebarOpen((s) => !s)}
                        aria-label="Toggle sidebar"
                    >
                        <FiMenu />
                    </button>
                </div>

                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;