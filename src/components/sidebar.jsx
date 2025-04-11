import {FiHome, FiUser, FiUserCheck, FiFolder, FiClock} from "react-icons/fi"
const Sidebar = ({ activeSection, setActiveSection }) => {
    return (
        <div className="sidebar-main flex flex-col h-screen bg-blue-900 text-white w-72 py-4 overflow-auto">
            <div className="px-4 mb-6 text-center border-b border-blue-300 pb-6">
                <span className="text-2xl font-medium">ABC INC</span>
            </div>

            <nav className="flex-1">
                <div className="px-4 mb-4">
                    <h2 className="text-xs uppercase tracking-wider text-gray-300 mb-2">Menu</h2>
                    <ul>
                        {[
                            { key: 'dashboard', label: 'Dashboard', icon: <FiHome className="mr-3" /> },
                            { key: 'projects', label: 'Manage Projects', icon: <FiFolder className="mr-3" /> },
                            { key: 'team', label: 'Manage Team', icon: <FiUser className="mr-3" /> },
                            { key: 'timesheet', label: 'Manage Timesheet', icon: <FiClock className="mr-3" /> },
                            { key: 'users', label: 'User Management', icon: <FiUserCheck className="mr-3" /> },
                        ].map((item) => (
                            <li key={item.key} className="mb-2">
                                <button
                                    onClick={() => setActiveSection(item.key)}
                                    className={`w-full text-left flex items-center px-2 py-2 rounded hover:bg-orange-500 ${
                                        activeSection === item.key ? 'bg-orange-500' : ''
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Keep the Projects and Teams sections as-is or apply similar logic */}
            </nav>
        </div>
    );
};

export default Sidebar;