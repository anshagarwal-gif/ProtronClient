import React, { useState } from 'react';
import "./App.css"
import Sidebar from './components/sidebar';
import ProjectTeamManagement from './components/ProjectTeamManagement';
import TeamManagement from './components/TeamManagement';
const Dashboard = () => <div>Dashboard Content</div>;
const ManageProjects = () => <div>Manage Projects Content</div>;
const ManageTimesheet = () => <div>Manage Timesheet Content</div>;
const UserManagement = () => <div>User Management Content</div>;

const AppLayout = () => {
    const [activeSection, setActiveSection] = useState('dashboard');

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'projects':
                return <ProjectTeamManagement />;
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

    return (
        <div className="flex">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
        </div>
    );
};

export default AppLayout;
