import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiPlus, FiChevronDown, FiUser } from 'react-icons/fi';
import axios from 'axios';

// Import the AssignTeamMemberModal component
import AssignTeamMemberModal from './AssignTeamMemberModal';

const ProjectTeamManagement = () => {
    const [teamMembers, setTeamMembers] = useState([
        
    ]);
    
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [actionsOpen, setActionsOpen] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fetchTeammates = async()=>{
        try {
            const res = await axios.get("http://localhost:8282/api/project-team/list/4")
            setTeamMembers(res.data)
            console.log(res.data)
        } catch (error) {
            console.log({message:error})
        }
    }
    useEffect(()=>{
        fetchTeammates()
    },[])
    const toggleActions = (id) => {
        setActionsOpen(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleStatusChange = async (id, newStatus) => {
        console.log("handle Status Change function is called")
        try {
            // Call backend to update status
            await axios.patch(`http://localhost:8282/api/project-team/${id}/status`, null, {
                params: { status: newStatus }
            });
    
            // Refetch updated team members from backend
            const response = await axios.get(`http://localhost:8080/api/project-team/list/${projectId}`); // adjust endpoint as needed
            setTeamMembers(response.data);
    
            // Close actions dropdown
            setActionsOpen(prev => ({
                ...prev,
                [id]: false
            }));
        } catch (error) {
            console.error("Failed to update status:", error);
        }}

    const handleRemoveMember = async (id) => {
        console.log("remove function is called")
        try {
            const response = await axios.delete(`http://localhost:8282/api/project-team/delete/${id}`);
            console.log("Deleted successfully:", response.data);
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };
    

    const handleAddMember = async (memberData, projectId) => {
        console.log("handleAddMember is called")
        try {
            const requestBody = {
                name: memberData.name,
                employeeCode: memberData.employeeCode,
                email: memberData.email,
                cost: memberData.cost,
                unit: memberData.unit,
                projectId: 1, // Include this if needed by your DTO
            };
    
            // 1. Call backend to add new member
            await axios.post(`http://localhost:8282/api/project-team/add`, requestBody);
    
            // 2. Refetch the updated team list
            const response = await axios.get(`http://localhost:8282/api/project-team/list/${projectId}`);
            setTeamMembers(response.data);
        } catch (error) {
            console.error("Failed to add member:", error);
        }
    };
    

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'text-green-500';
            case 'On Hold':
                return 'text-yellow-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className='flex items-center'>
                    <div className="bg-blue-500 text-white p-2 rounded-full mr-2">
                        <FiChevronLeft />
                    </div>
                    <h1 className="text-blue-800 text-lg font-bold">Manage Projects</h1>
                </div>
                <button className="bg-orange-500 text-white px-4 py-1 rounded text-sm">
                    Edit
                </button>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-3 gap-6 mb-8 bg-[#AECCE4] p-4 rounded-lg">
                <div>
                    <p className="text-gray-500 text-sm">Start Date: <span className="font-medium text-gray-700">08 Jan 2015</span></p>
                    <p className="text-gray-500 text-sm mt-2">Estimated End Date: <span className="font-medium text-gray-700">10-Jan-2026</span></p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">PM Name: <span className="font-medium text-gray-700"></span></p>
                    <p className="text-gray-500 text-sm mt-2">Sponsor: <span className="font-medium text-gray-700">Alfie Wood</span></p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Project Cost: <span className="font-medium text-gray-700">$10,000</span></p>
                    <p className="text-gray-500 text-sm mt-2">System Impacted: <span className="font-medium text-gray-700">Sys1, Sys2, Sys3</span></p>
                </div>
            </div>

            {/* Team Members Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-gray-800">Manage Team Member</h2>
                    <div className="flex items-center">
                        <button 
                            className="bg-orange-500 text-white px-3 py-2 rounded flex items-center text-sm"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <FiPlus size={16} className="mr-1" />
                            Add Member
                        </button>
                    </div>
                </div>

                {/* Team Members Table */}
                <div className="border rounded overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr className="text-left">
                                <th className="py-3 px-4 text-sm font-medium text-gray-600">#</th>
                                <th className="py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                                <th className="py-3 px-4 text-sm font-medium text-gray-600">Emp-Code</th>
                                <th className="py-3 px-4 text-sm font-medium text-gray-600">Email</th>
                                <th className="py-3 px-4 text-sm font-medium text-gray-600">Cost</th>
                                <th className="py-3 px-4 text-sm font-medium text-gray-600">DOJ</th>
                                <th className="py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                <th className="py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembers.map((member, index) => (
                                <tr key={member.id} className="border-t">
                                    <td className="py-3 px-4">{member.id}</td>
                                    <td className="py-3 px-4 flex items-center">
                                        <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full mr-2" />
                                        <span>
                                            {member.name}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{member.empCode}</td>
                                    <td className="py-3 px-4">{member.email}</td>
                                    <td className="py-3 px-4">{member.cost}</td>
                                    <td className="py-3 px-4">{member.doj}</td>
                                    <td className="py-3 px-4">
                                        <span className={`${getStatusColor(member.status)}`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 relative">
                                        <button
                                            onClick={() => toggleActions(member.id)}
                                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm flex items-center"
                                        >
                                            Actions
                                            <FiChevronDown size={14} className="ml-1" />
                                        </button>

                                        {actionsOpen[member.id] && (
                                            <div className="absolute right-4 mt-1 bg-white shadow-lg border rounded z-10 w-32">
                                                <button
                                                    onClick={() => handleStatusChange(member.id, member.status === 'On Hold' ? 'Active' : 'On Hold')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                                >
                                                    {member.status === 'On Hold' ? 'Activate' : 'Hold'}
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveMember(member.id)}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="bg-gray-50 py-3 px-4 flex justify-between items-center border-t">
                        <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">Rows per page</span>
                            <div className="border rounded flex items-center">
                                <span className="px-2">{rowsPerPage}</span>
                                <button className="px-2 py-1 border-l">
                                    <FiChevronDown size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-4">1-10 of 80</span>
                            <div className="flex">
                                <button className="p-1 border rounded-l">
                                    <FiChevronsLeft size={16} />
                                </button>
                                <button className="p-1 border-t border-b">
                                    <FiChevronLeft size={16} />
                                </button>
                                <button className="p-1 border-t border-b">
                                    <FiChevronRight size={16} />
                                </button>
                                <button className="p-1 border rounded-r">
                                    <FiChevronsRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Member Modal */}
            <AssignTeamMemberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projectName="Project Name"
                onAddMember={handleAddMember}
            />
        </div>
    );
};

export default ProjectTeamManagement;