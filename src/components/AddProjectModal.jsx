import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Avatar,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Autocomplete,
    Typography,
    Box,
    Divider,
    InputAdornment,
    Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ProjectIcon from '@mui/icons-material/Folder';
import axios from 'axios';
// Dummy user and currency data


const currencies = ['USD', 'INR', 'EUR', 'GBP', 'JPY'];

// Currency symbols mapping
const currencySymbols = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
};

const AddProjectModal = ({ open, onClose, onSubmit, formData, setFormData }) => {
    const [users, setUsers] = useState([])
    const fetchUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:8282/api/users`);
            console.log(res.data)
            setUsers(res.data)
        } catch (error) {
            console.log({ message: error });
        }
    };
    useEffect(() => {
        fetchUsers()
    }, [])

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, projectIcon: URL.createObjectURL(file) }));
        }
    };

    const handleChange = (field) => (event, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                }
            }}
        >
            <Box
                sx={{
                    bgcolor: '#f8f9fa',
                    borderBottom: '1px solid #e0e0e0',
                    py: 2.5,
                    px: 3
                }}
            >
                <Typography variant="h5" fontWeight="600" color="primary.dark">
                    Add New Project
                </Typography>
            </Box>

            <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={3} sx={{ mt: 0.5 }}>
                    {/* Row 1: Project Name and Project Icon */}
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            label="Project Name"
                            placeholder="Enter a descriptive project name"
                            value={formData.projectName}
                            onChange={handleChange('projectName')}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ProjectIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box sx={{
                            border: '1px dashed #aaa',
                            borderRadius: 2,
                            p: 2,
                            height: '56px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: '#fafafa'
                        }}>
                            {formData.projectIcon ? (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar
                                        src={formData.projectIcon}
                                        alt="Project Icon"
                                        sx={{ width: 40, height: 40, mr: 1 }}
                                    />
                                    <Button
                                        component="label"
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Change
                                        <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                                    </Button>
                                </Box>
                            ) : (
                                <Button
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    variant="outlined"
                                    color="primary"
                                >
                                    Project Icon
                                    <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                                </Button>
                            )}
                        </Box>
                    </Grid>

                    {/* Row 2: Start Date and End Date */}
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="Project Start Date"
                            value={formData.startDate}
                            onChange={(newDate) => setFormData((prev) => ({ ...prev, startDate: newDate }))}
                            slots={{
                                textField: (params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarTodayIcon color="primary" />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="Project End Date"
                            value={formData.endDate}
                            onChange={(newDate) => setFormData((prev) => ({ ...prev, endDate: newDate }))}
                            slots={{
                                textField: (params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        sx={{ width: "200px" }}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarTodayIcon color="primary" />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )
                            }}
                        />
                    </Grid>

                    {/* Row 3: Project Manager and Team Members */}
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            options={users}
                            getOptionLabel={(option) =>
                                option ? `${option.firstName} ${option.lastName}` : ''
                            }
                            isOptionEqualToValue={(option, value) =>
                                option.userId === value.userId
                            }
                            onChange={(e, value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    manager: value ? value.userId : null,
                                }))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Project Manager"
                                    placeholder="Search for a manager..."
                                    sx={{ width: '200px' }}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <InputAdornment position="start">
                                                    <PersonIcon color="primary" />
                                                </InputAdornment>
                                                {params.InputProps.startAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            multiple
                            options={users}
                            value={users.filter((user) => formData.teamMembers.includes(user.userId))}
                            getOptionLabel={(option) =>
                                option ? `${option.firstName} ${option.lastName}` : ''
                            }
                            isOptionEqualToValue={(option, value) => option.userId === value.userId}
                            onChange={(e, selectedUsers) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    teamMembers: selectedUsers.map((user) => user.userId), // ✅ Only store IDs
                                }))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Team Members"
                                    placeholder="Search for team members..."
                                    sx={{ width: "200px" }}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <InputAdornment position="start">
                                                    <PeopleAltIcon color="primary" />
                                                </InputAdornment>
                                                {params.InputProps.startAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            renderOption={(props, option) => (
                                <li {...props}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Avatar
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                mr: 1,
                                                fontSize: "12px",
                                                bgcolor: "primary.light",
                                            }}
                                        >
                                            {option.firstName?.charAt(0)}
                                        </Avatar>
                                        {option.firstName} {option.lastName}
                                    </Box>
                                </li>
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Box
                                        component={Paper}
                                        elevation={0}
                                        sx={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            m: 0.5,
                                            p: 0.5,
                                            pl: 1,
                                            borderRadius: 1,
                                            bgcolor: "primary.light",
                                            color: "primary.contrastText",
                                        }}
                                        {...getTagProps({ index })}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                fontSize: "10px",
                                                mr: 0.5,
                                                bgcolor: "primary.main",
                                            }}
                                        >
                                            {option.firstName?.charAt(0)}
                                        </Avatar>
                                        {option.firstName} {option.lastName}
                                    </Box>
                                ))
                            }
                        />


                    </Grid>

                    {/* Row 4: Currency, Cost, and Submit Button (3 elements in one row) */}
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Currency</InputLabel>
                            <Select
                                value={formData.currency}
                                onChange={handleChange('currency')}
                                label="Currency"
                                sx={{ height: '56px' }}
                            >
                                {currencies.map((currency) => (
                                    <MenuItem key={currency} value={currency}>
                                        <Typography variant="body1">{currency}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Project Cost"
                            placeholder="Enter amount"
                            type="number"
                            value={formData.cost}
                            onChange={handleChange('cost')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AttachMoneyIcon color="primary" />
                                        {formData.currency ? currencySymbols[formData.currency] : '$'}
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Sponsor Name"
    placeholder="Enter sponsor or tenent"
    value={formData.tenent}
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, tenent: e.target.value }))
    }
    variant="outlined"
  />
</Grid>

                    <Grid item xs={12} sm={4}>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                py: 1.5,
                                fontWeight: 600,
                                boxShadow: 2,
                                height: '56px',
                                '&:hover': {
                                    boxShadow: 4
                                }
                            }}
                        >
                            Create Project
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, bgcolor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color="secondary"
                    sx={{ px: 3 }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProjectModal;