import React, {useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Button ,Box,Dialog, DialogActions, DialogContent, DialogTitle, TextField,InputLabel} from '@mui/material';

const ManageUser = () => {

    const [users, setUsers] = useState([
        { id: 1, name: 'Kamal Jayathissa', email: 'kamal@example.com', role: 'Admin' },
        { id: 2, name: 'Deshan Pathirana', email: 'deshan@example.com', role: 'User' },
        { id: 3, name: 'Sandun Chinthka', email: 'sandun@example.com', role: 'User' },
    ]);

    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userIdToDelete, setUserIdToDelete] = useState(null); // State for the user to delete
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: '' });
    const [openAddUser, setOpenAddUser] = useState(false);


    /*const [users, setUsers] = useState([]); // List of users fetched from backend

    // Fetch the list of users initially
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users'); // Replace with your backend API endpoint
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleEdit = async (userId) => {
        try {
            const response = await axios.get(`/api/users/${userId}`); // Fetch user details by ID
            setSelectedUser(response.data); // Set the fetched user as selected user
            setOpen(true); // Open dialog
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`/api/users/${selectedUser.id}`, selectedUser); // Update user in backend
            fetchUsers(); // Refresh the user list after saving changes
            setOpen(false); // Close the dialog
        } catch (error) {
            console.error("Error saving user changes:", error);
        }
    }; */

    const handleEdit = (user) => {
        setSelectedUser(user);
        setOpen(true); // Open dialog
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null); // Reset selected user when closing
    };

    const handleSaveChanges = () => {
        // Implement save changes functionality here
        console.log("Saved changes for user:", selectedUser);
        setOpen(false); // Close dialog after saving
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleDelete = (userId) => {
        setUserIdToDelete(userId); // Set the user ID to delete
        setOpenDeleteConfirm(true); // Open delete confirmation dialog
    };

    const handleCloseDeleteConfirm = () => {
        setOpenDeleteConfirm(false);
        setUserIdToDelete(null); // Reset user ID when closing
    };

    const confirmDelete = () => {
        console.log(`Delete user with ID: ${userIdToDelete}`);
        setUsers(users.filter(user => user.id !== userIdToDelete)); 
        handleCloseDeleteConfirm(); // Close confirmation dialog after deletion
    };

    const handleAddUser = () => {
        setNewUser({ name: '', email: '', password: '', role: '' }); // Reset new user details
        setOpenAddUser(true); // Open add user dialog
    };

    const handleNewUserInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveNewUser = () => {
        // Add the new user to the hard-coded users array
        const newUserData = { id: users.length + 1, ...newUser }; // Assign a new ID
        setUsers((prevUsers) => [...prevUsers, newUserData]); // Update the user list

        // Commenting out the actual API call to save the user
        // try {
        //     await axios.post('/api/users', newUser); // Adjust endpoint accordingly
        //     fetchUsers(); // Refresh user list
        //     setOpenAddUser(false);
        // } catch (error) {
        //     console.error("Error adding user:", error);
        // }

        setOpenAddUser(false); // Close the dialog after saving
    };
    
    

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleAddUser} sx={{ margin: '10px',fontSize:'18px',backgroundColor:'#72d6c9',padding:'10px 20px','&:hover': {backgroundColor:'#3DC0B9'} }}>
                + Add User
            </Button>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell>#</TableCell>
                        <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>
                            <TableSortLabel> 
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>
                            <TableSortLabel>
                                Email
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>
                            <TableSortLabel>
                                Role
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={user.id}>
                            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{index + 1}</TableCell> {/* Auto number */}
                            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{user.name}</TableCell>
                            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{user.email}</TableCell>
                            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{user.role}</TableCell>
                            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>
                                <Button variant="contained" onClick={() => handleEdit(user.id)} sx={{margin:'5px',backgroundColor:'#72d6c9','&:hover': {backgroundColor:'#3DC0B9'}}}>
                                    Edit
                                </Button>
                                <Button variant="contained" onClick={() => handleDelete(user.id)} sx={{margin:'5px',backgroundColor:'red','&:hover': {backgroundColor:'#AB3448'}}}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        {/* Edit User Dialog */}
        <Dialog 
        open={open} 
        onClose={handleClose}
        fullWidth 
        maxWidth="md"
        >
                <DialogTitle sx={{fontSize:"32px",fontWeight:'600',color:'#3DC0B9',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
                    Edit User
                </DialogTitle>
                <DialogContent>
                <InputLabel shrink sx={{fontSize:"24px",fontWeight:'600',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
                    Name
                </InputLabel>
                    <TextField
                        margin="dense"
                        placeholder="Name"
                        name="name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={selectedUser?.name || ''}
                        onChange={handleInputChange}
                    />
                    <InputLabel shrink sx={{fontSize:"24px",fontWeight:'600',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
                        Email
                    </InputLabel>
                    <TextField
                        margin="dense"
                        placeholder="Email"
                        name="email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={selectedUser?.email || ''}
                        onChange={handleInputChange}
                    />
                    <InputLabel shrink sx={{fontSize:"24px",fontWeight:'600',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
                        Password
                    </InputLabel>
                    <TextField
                        margin="dense"
                        placeholder="Password"
                        name="password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={selectedUser?.password || ''}
                        onChange={handleInputChange}
                    />
                    <InputLabel shrink sx={{fontSize:"24px",fontWeight:'600',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
                        Role
                    </InputLabel>
                    <TextField
                        margin="dense"
                        placeholder="Role"
                        name="role"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={selectedUser?.role || ''}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}  sx={{margin:'5px',fontSize:'16px',fontFamily:'"Josefin Sans", sans-serif',color:'black','&:hover': {backgroundColor:'#C8C8C8'}}}>
                        Cancel
                    </Button>
                    <Button onClick={handleSaveChanges}  sx={{margin:'5px',fontSize:'16px',fontFamily:'"Josefin Sans", sans-serif',color:'black','&:hover': {backgroundColor:'#C8C8C8'}}}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteConfirm}
                onClose={handleCloseDeleteConfirm}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{color:'red',fontSize:'24px'}}>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p style={{fontSize:'20px'}}>Are you sure you want to delete this user?</p>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={handleCloseDeleteConfirm} 
                    sx={{fontSize:'16px',fontFamily:'"Josefin Sans", sans-serif',color:'black','&:hover': {backgroundColor:'#C8C8C8'}}}
                    >
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} sx={{fontSize:'16px',fontFamily:'"Josefin Sans", sans-serif',color:'red','&:hover': {backgroundColor:'#C8C8C8'}}}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add User Dialog */}
            <Dialog 
                open={openAddUser} 
                onClose={() => setOpenAddUser(false)}
                fullWidth 
                maxWidth="sm"
            >
                <DialogTitle sx={{fontSize:"32px",fontWeight:'600',color:'#3DC0B9',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
                    Add New User
                </DialogTitle>
                <DialogContent>
                    <InputLabel shrink sx={{fontSize:"24px",fontWeight:'600',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
                        Name
                    </InputLabel>
                    <TextField
                        margin="dense"
                        name="name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newUser.name}
                        onChange={handleNewUserInputChange}
                    />
                    <InputLabel shrink sx={{fontSize:"24px",fontWeight:'600',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
                        Email
                    </InputLabel>
                    <TextField
                        margin="dense"
                        name="email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={newUser.email}
                        onChange={handleNewUserInputChange}
                    />
                    <InputLabel shrink sx={{fontSize:"24px",fontWeight:'600',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
                        Password
                    </InputLabel>
                    <TextField
                        margin="dense"
                        name="password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={newUser.password}
                        onChange={handleNewUserInputChange}
                    />
                    <InputLabel shrink sx={{fontSize:"24px",fontWeight:'600',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
                        Role
                    </InputLabel>
                    <TextField
                        margin="dense"
                        name="role"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newUser.role}
                        onChange={handleNewUserInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddUser(false)} sx={{margin:'5px',fontSize:'16px',fontFamily:'"Josefin Sans", sans-serif',color:'black','&:hover': {backgroundColor:'#C8C8C8'}}}>
                        Cancel
                    </Button>
                    <Button onClick={handleSaveNewUser} sx={{margin:'5px',fontSize:'16px',fontFamily:'"Josefin Sans", sans-serif',color:'black','&:hover': {backgroundColor:'#C8C8C8'}}}>
                        Add User
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
};
export default ManageUser;
