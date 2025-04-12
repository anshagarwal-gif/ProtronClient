import React, { useEffect, useState } from "react"
import axios from "axios"
import { AiFillProject } from "react-icons/ai"
import AddProjectModal from "./AddProjectModal" // Adjust path if needed
import GlobalSnackbar from './GlobalSnackbar';
import ProjectTeamManagement from "./ProjectTeamManagement";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showTeamManagement, setShowTeamManagement] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const [formData, setFormData] = useState({
        projectName: '',
        projectIcon: null,
        startDate: null,
        endDate: null,
        manager: null,
        teamMembers: [],
        currency: 'USD',
        cost: '',
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info', // 'success' | 'error' | 'warning' | 'info'
    });

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/projects`);
            setProjects(res.data);
        } catch (error) {
            console.log({ message: error });
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);
    const handleManageTeam = (projectId) => {
        setSelectedProjectId(projectId);
        setShowTeamManagement(true);
    };

    const handleCloseTeamManagement = () => {
        setSelectedProjectId(null);
        setShowTeamManagement(false);
    };

    const handleAddProjectSubmit = async (data) => {
        // Field validation
        if (
            !data.projectName ||
            !data.startDate ||
            !data.endDate ||
            !data.manager ||
            !data.currency ||
            !data.cost ||
            data.teamMembers.length === 0
        ) {
            setSnackbar({
                open: true,
                message: 'Please fill in all the required fields.',
                severity: 'warning',
            });
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/projects/add`, data);
            console.log('Project added successfully:', response.data);

            // Reset form
            setFormData({
                projectName: '',
                projectIcon: null,
                startDate: null,
                endDate: null,
                manager: null,
                teamMembers: [],
                currency: 'USD',
                cost: '',
            });

            setShowAddModal(false);

            setSnackbar({
                open: true,
                message: 'Project added successfully!',
                severity: 'success',
            });
        } catch (error) {
            console.error('Error adding project:', error);
            setSnackbar({
                open: true,
                message: 'Failed to add project. Please try again.',
                severity: 'error',
            });
        }
    };

    const handleCloseModal = () => {
        // Reset form data when closing the modal
        setFormData({
            projectName: '',
            projectIcon: null,
            startDate: null,
            endDate: null,
            manager: null,
            teamMembers: [],
            currency: 'USD',
            cost: '',
        });
        setShowAddModal(false);
    };
    return (
        <>
          {/* Conditional Rendering: Show either TeamManagement or ProjectManagement */}
          {showTeamManagement && selectedProjectId ? (
            <ProjectTeamManagement
              projectId={selectedProjectId}
              onClose={handleCloseTeamManagement}
            />
          ) : (
            <div>
              <h1 className="flex items-center gap-2">
                <AiFillProject /> Project Management
              </h1>
      
              <div className="flex w-full bg-[#AECCE4] py-2 mt-5">
                <p>JIRA</p>
                <h2>| Manage Projects</h2>
              </div>
      
              <div className="flex justify-between items-center mt-5">
                <h1>Project List</h1>
                <button
                  className="border px-4 py-2 rounded bg-blue-600 text-white"
                  onClick={() => setShowAddModal(true)}
                >
                  Add Project
                </button>
              </div>
      
              <div className="border rounded overflow-hidden mt-4">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr className="text-left">
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Project Name</th>
                      <th className="py-3 px-4">Start Date</th>
                      <th className="py-3 px-4">PM Name</th>
                      <th className="py-3 px-4">Team</th>
                      <th className="py-3 px-4">Project Cost</th>
                      <th className="py-3 px-4">Sponsor</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, index) => (
                      <tr key={project.projectId}>
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4">{project.projectName}</td>
                        <td className="py-3 px-4">
                          {project.startDate.split("T")[0]}
                        </td>
                        <td className="py-3 px-4">
                          {project.projectManager?.firstName}{" "}
                          {project.projectManager?.lastName}
                        </td>
                        <td className="py-3 px-4">{project.projectTeam.length} members</td>
                        <td className="py-3 px-4">₹{project.projectCost}</td>
                        <td className="py-3 px-4">{project.sponsor || "N/A"}</td>
                        <td className="py-3 px-4">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            onClick={() => handleManageTeam(project.projectId)}
                          >
                            Manage Team
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
      
              <AddProjectModal
                open={showAddModal}
                onClose={handleCloseModal}
                onSubmit={handleAddProjectSubmit}
                formData={formData}
                setFormData={setFormData}
              />
              <GlobalSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
              />
            </div>
          )}
        </>
      );
      
}

export default ProjectManagement;