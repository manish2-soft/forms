import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {
    FaHome,
    FaFileAlt,
    FaSignOutAlt,
    FaUserCircle,
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
    FaBars
} from 'react-icons/fa';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const { setIsAuthenticated, userId } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
        { path: '/sample', label: 'Sample', icon: <FaFileAlt /> },
        { path: '/form', label: 'Form', icon: <FaFileAlt /> },
    ];

    return (
        <div className="flex h-screen bg-[#f3f4f6] font-sans text-gray-800 overflow-hidden">
            {/* Sidebar */}
            <aside className={`bg-white shadow-lg flex flex-col transition-all duration-300 z-20 ${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'} fixed h-full md:relative overflow-hidden`}>
                <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center flex-col'} p-6 h-20 border-b border-gray-100 relative transition-all duration-300`}>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {isSidebarOpen ? 'Home' : 'H'}
                    </h1>

                    {/* Desktop Toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`hidden md:block text-gray-500 hover:text-sky-500 transition-colors ${isSidebarOpen ? '' : 'mt-2'}`}
                    >
                        {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                    </button>

                    {/* Mobile Close Button */}
                    <button onClick={() => setIsSidebarOpen(false)} className={`md:hidden text-gray-500 hover:text-sky-500 absolute right-6 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                        <FaTimes />
                    </button>
                </div>



                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-sky-50 text-sky-500 font-semibold shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`
                            }
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>{item.label}</span>
                        </NavLink>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
                    >
                        <span className="text-xl"><FaSignOutAlt /></span>
                        <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Logout</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-gray-700">
                        <span className="text-xl"><FaUserCircle /></span>
                        <div className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                            <div className="text-xs text-gray-400 font-medium">User ID</div>
                            <div className="font-bold">{userId || 'Guest'}</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
                {/* Header Removed */}


                {/* Content Scroll Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8f9fa] p-8">
                    <div className="flex items-center justify-center h-full relative">
                        {/* Mobile Open Button */}
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden fixed top-4 left-4 z-10 p-2 bg-white rounded-lg shadow-md text-gray-500 hover:text-sky-500"
                            >
                                <FaBars />
                            </button>
                        )}
                        <h1 className="text-2xl font-bold text-gray-800">this is dashboard</h1>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
