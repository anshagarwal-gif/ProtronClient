import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, MailIcon, UserIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import axios from 'axios';
import GlobalSnackbar from '../components/GlobalSnackbar';

const Signup = ({ onSignup, onSwitchToLogin }) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info', // 'success' | 'error' | 'warning' | 'info'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        displayName: '',
        mobileCountryCode: '+91',
        mobileNumber: '',
        landlineCountryCode: '+91',
        landlineNumber: '',
        // userRole: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        country: '',
        zipCode: '',
        city: '',
        state: '',
        password: '',
        confirmPassword: ''
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Auto-populate city and state based on zip code (simplified example)
        if (name === 'zipCode' && value.length === 5) {
            // In a real app, you would call an API to get city/state from zip
            if (value === '10001') {
                setFormData(prev => ({
                    ...prev,
                    city: 'New York',
                    state: 'NY'
                }));
            } else if (value === '90001') {
                setFormData(prev => ({
                    ...prev,
                    city: 'Los Angeles',
                    state: 'CA'
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.email || !formData.firstName || !formData.lastName) {
            setError('Please fill in all required fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Create a new object with combined phone numbers before submitting
        const submissionData = {
            ...formData,
            // Combine country code and phone number for submission
            mobilePhone: formData.mobileNumber ? `${formData.mobileCountryCode}${formData.mobileNumber}` : '',
            lanPhone: formData.landlineNumber ? `${formData.landlineCountryCode}${formData.landlineNumber}` : ''
        };

        // Call the signup handler from parent component with combined data

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/signup`, submissionData);
            setSnackbar({
                open: true,
                message: 'Signup successful!',
                severity: 'success',
            });
            onSignup(true);
        } catch (error) {
            console.error('Signup failed:', error.response?.data || error.message);
            setSnackbar({
                open: true,
                message: error.response?.data || 'Signup failed!',
                severity: 'error',
            });
        }

        
    };

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-8 my-8">
                <h1 className="text-2xl font-bold text-center text-gray-800">Create Account</h1>
                <p className="text-gray-600 text-center mb-8">Please fill in your information</p>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email Address - Mandatory */}
                        <div>
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <MailIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* First Name - Mandatory */}
                        <div>
                            <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Enter your first name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Middle Name */}
                        <div>
                            <label htmlFor="middleName" className="block text-gray-700 mb-2">Middle Name</label>
                            <input
                                id="middleName"
                                name="middleName"
                                type="text"
                                placeholder="Enter your middle name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={formData.middleName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Last Name - Mandatory */}
                        <div>
                            <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Enter your last name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Display Name */}
                        <div>
                            <label htmlFor="displayName" className="block text-gray-700 mb-2">Display Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="displayName"
                                    name="displayName"
                                    type="text"
                                    placeholder="Enter display name"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Mobile Phone */}
                        <div>
                            <label htmlFor="mobileNumber" className="block text-gray-700 mb-2">Mobile Phone</label>
                            <div className="flex">
                                <select
                                    id="mobileCountryCode"
                                    name="mobileCountryCode"
                                    className="w-24 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.mobileCountryCode}
                                    onChange={handleChange}
                                >
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+91">+91</option>
                                    <option value="+61">+61</option>
                                </select>
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        type="tel"
                                        placeholder="Enter mobile number"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {/* Preview of combined phone number */}
                            {formData.mobileNumber && (
                                <p className="text-xs text-gray-600 mt-1">Will be submitted as: {formData.mobileCountryCode}{formData.mobileNumber}</p>
                            )}
                        </div>

                        {/* Landline Phone */}
                        <div>
                            <label htmlFor="landlineNumber" className="block text-gray-700 mb-2">Landline</label>
                            <div className="flex">
                                <select
                                    id="landlineCountryCode"
                                    name="landlineCountryCode"
                                    className="w-24 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.landlineCountryCode}
                                    onChange={handleChange}
                                >
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+91">+91</option>
                                    <option value="+61">+61</option>
                                </select>
                                <input
                                    id="landlineNumber"
                                    name="landlineNumber"
                                    type="tel"
                                    placeholder="Enter landline number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.landlineNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Preview of combined phone number */}
                            {formData.landlineNumber && (
                                <p className="text-xs text-gray-600 mt-1">Will be submitted as: {formData.landlineCountryCode}{formData.landlineNumber}</p>
                            )}
                        </div>

                        {/* Profile Picture */}
                        <div>
                            <label className="block text-gray-700 mb-2">Profile Picture</label>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    <UserIcon className="h-6 w-6 text-gray-500" />
                                </div>
                                <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                                    Upload Photo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Address Fields */}
                    <div className="border-t border-b border-gray-200 py-6">
                        <h2 className="text-lg font-medium mb-4">Address Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Address Line 1 */}
                            <div>
                                <label htmlFor="addressLine1" className="block text-gray-700 mb-2">Address Line 1</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="addressLine1"
                                        name="addressLine1"
                                        type="text"
                                        placeholder="Enter address line 1"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.addressLine1}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Address Line 2 */}
                            <div>
                                <label htmlFor="addressLine2" className="block text-gray-700 mb-2">Address Line 2</label>
                                <input
                                    id="addressLine2"
                                    name="addressLine2"
                                    type="text"
                                    placeholder="Enter address line 2"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Address Line 3 */}
                            <div>
                                <label htmlFor="addressLine3" className="block text-gray-700 mb-2">Address Line 3</label>
                                <input
                                    id="addressLine3"
                                    name="addressLine3"
                                    type="text"
                                    placeholder="Enter address line 3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.addressLine3}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
                                <select
                                    id="country"
                                    name="country"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.country}
                                    onChange={handleChange}
                                >
                                    <option value="">Select country</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                </select>
                            </div>

                            {/* Zip Code */}
                            <div>
                                <label htmlFor="zipCode" className="block text-gray-700 mb-2">Zip Code</label>
                                <input
                                    id="zipCode"
                                    name="zipCode"
                                    type="text"
                                    placeholder="Enter zip code"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder="Enter city"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.city}
                                    onChange={handleChange}
                                    readOnly={formData.zipCode.length === 5}
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label htmlFor="state" className="block text-gray-700 mb-2">State</label>
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    placeholder="Enter state"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.state}
                                    onChange={handleChange}
                                    readOnly={formData.zipCode.length === 5}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
                        <button
                            type="submit"
                            className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Create Account
                        </button>

                        <div className="text-center md:text-right">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <button
                                    onClick={onSwitchToLogin}
                                    className="text-blue-600 hover:underline"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            <GlobalSnackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    severity={snackbar.severity}
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                />
        </div>
    );
};

export default Signup;