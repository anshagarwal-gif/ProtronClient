import React, { useState, useEffect } from 'react';
import "./App.css";
import Sidebar from './components/sidebar';
import ProjectTeamManagement from './components/ProjectTeamManagement';
import TeamManagement from './components/TeamManagement';
import ProjectManagement from './components/ProjectManagement';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import axios from 'axios';
import GlobalSnackbar from './components/GlobalSnackbar';

const Dashboard = () => <div>Dashboard Content</div>;
const ManageProjects = () => <div>Manage Projects Content</div>;
const ManageTimesheet = () => <div>Manage Timesheet Content</div>;
const UserManagement = () => <div>User Management Content</div>;

const App = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info', // 'success' | 'error' | 'warning' | 'info'
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentPage, setCurrentPage] = useState('login'); // 'login', 'signup', or 'dashboard'
    const [activeSection, setActiveSection] = useState('dashboard');

    // Check for existing authentication on component mount
    useEffect(() => {
        const authStatus = sessionStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
            setCurrentPage('dashboard');
        }
    }, []);

    const handleLogin = async (isLoggedIn) => {
        if (isLoggedIn) {
            setIsAuthenticated(true);
            sessionStorage.setItem('isAuthenticated', 'true');
            setCurrentPage('dashboard');
        }
    };

    const handleSignup = async (isSignUp) => {
        if (isSignUp) {
            // Mock successful registration and login
            setIsAuthenticated(true);
            sessionStorage.setItem('isAuthenticated', 'true');
            setCurrentPage('dashboard');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAuthenticated');
        setCurrentPage('login');
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'projects':
                return <ProjectManagement />;
            case 'team':
                return <TeamManagement />;
            case 'timesheet':
                return <ManageTimesheet />;
            case 'users':
                return <UserManagement />;
            default:
                return <div>Select an option</div>;
        }
    };

    // Render login/signup pages if not authenticated
    if (!isAuthenticated) {
        if (currentPage === 'login') {
            return (
                <Login
                    onLogin={handleLogin}
                    onSwitchToSignup={() => setCurrentPage('signup')}
                />
            );
        } else if (currentPage === 'signup') {
            return (
                <Signup
                    onSignup={handleSignup}
                    onSwitchToLogin={() => setCurrentPage('login')}
                />
            );
        }
    }

    // Render main app layout if authenticated
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col h-screen">
                <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Application Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800"
                    >
                        Logout
                    </button>
                </div>
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
                    <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
                </div>
                <GlobalSnackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    severity={snackbar.severity}
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                />
            </div>

        </LocalizationProvider>
    );
};

export default App;