import React, { useState } from 'react';
import { FiX, FiChevronDown, FiCalendar } from 'react-icons/fi';

const AssignTeamMemberModal = ({ isOpen, onClose, projectName, onAddMember }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeCode: '',
    taskType: '',
    unit: '',
    cost: '',
    releaseDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      employeeCode: '',
      taskType: '',
      unit: '',
      cost: '',
      releaseDate: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMember(formData);
    handleReset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-full max-w-xl">
        {/* Modal Header */}
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-medium text-gray-800">
            Assign Team Member | {projectName}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Search Section */}
            <div className="mb-6">
              <h3 className="text-gray-700 font-medium mb-4">Search Team Member</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-2">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Select from list"
                      className="w-full border rounded p-2 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-2 text-gray-500"
                    >
                      <FiChevronDown />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Select from list"
                      className="w-full border rounded p-2 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-2 text-gray-500"
                    >
                      <FiChevronDown />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Code & Task Type Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-600 mb-2">Employee Code</label>
                <div className="relative">
                  <input
                    type="text"
                    name="employeeCode"
                    value={formData.employeeCode}
                    onChange={handleChange}
                    placeholder="Select from list"
                    className="w-full border rounded p-2 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-2 text-gray-500"
                  >
                    <FiChevronDown />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Task Type</label>
                <div className="relative">
                  <input
                    type="text"
                    name="taskType"
                    value={formData.taskType}
                    onChange={handleChange}
                    placeholder="Select from list"
                    className="w-full border rounded p-2 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-2 text-gray-500"
                  >
                    <FiChevronDown />
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-6">
              <h3 className="text-gray-700 font-medium mb-4">Pricing</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-2">Unit</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      placeholder="Select from list"
                      className="w-full border rounded p-2 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-2 text-gray-500"
                    >
                      <FiChevronDown />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Cost</label>
                  <input
                    type="text"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    placeholder="Enter text"
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>
            </div>

            {/* Release Details Section */}
            <div className="mb-8">
              <h3 className="text-gray-700 font-medium mb-4">Release Details</h3>
              <div>
                <label className="block text-gray-600 mb-2">Estimated Release Date</label>
                <div className="relative">
                  <input
                    type="text"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    placeholder="Select Date"
                    className="w-full border rounded p-2 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-2 text-gray-500"
                  >
                    <FiCalendar />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Example of how to use this component in a parent component
const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleAddMember = (memberData) => {
    console.log('New team member data:', memberData);
    // Process the data as needed
  };
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Add Team Member
      </button>
      
      <AssignTeamMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectName="Project Name"
        onAddMember={handleAddMember}
      />
    </div>
  );
};

export default AssignTeamMemberModal;