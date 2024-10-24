import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled
} from '@mui/material';
import CenteredCircleLoader from '../utility/CenteredLoader';
// Class Form Dialog
const ClassFormDialog = ({ open, onClose, onCreate }) => {
    const [className, setClassName] = useState('');

    const handleClassSubmit = () => {
        if (className.trim() !== '') {
            onCreate(className);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Class name"
                    fullWidth
                    variant="outlined"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleClassSubmit} color="primary">Create</Button>
            </DialogActions>
        </Dialog>
    );
};

// Invite Student Dialog
const InviteStudentDialog = ({ open, onClose, courseName, courseId }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Invite Student</DialogTitle>
        <DialogContent>
            <Typography>Course Name: {courseName}</Typography>
            <Typography>Course ID: {courseId}</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Close</Button>
        </DialogActions>
    </Dialog>
);

// Styled Dialog for Viewing Problems
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.spacing(2),
        width: '800px',
        maxWidth: '90vw',
        height: '80vh',
    },
}));

const StyledDialogContent = styled(DialogContent)(() => ({
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(80vh - 64px - 52px)', // Subtract DialogTitle and DialogActions heights
}));

// View Problems Dialog
const ViewProblemsDialog = ({ open, onClose, problems, isLoading }) => {
    // const [selectedProblems, setSelectedProblems] = useState([]);

    // Functions related to ViewProblemsDialog's internal state management
    // Removed unused functions and fixed typo

    return (
        <StyledDialog open={open} onClose={onClose}>
            <StyledDialogContent>
                {isLoading ? (
                    <CenteredCircleLoader />
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Problem Title</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Year</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {problems.map((problem) => (
                                    <TableRow key={problem._id}>
                                        <TableCell>{problem.title}</TableCell>
                                        <TableCell>{problem.description}</TableCell>
                                        <TableCell>{problem.year}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </StyledDialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </StyledDialog>
    );
};

// Delete Confirmation Dialog
const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
            <Typography>Are you sure you want to delete this course?</Typography>
            <Typography color="error">This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm} color="error">Delete</Button>
        </DialogActions>
    </Dialog>
);

export { ClassFormDialog, InviteStudentDialog, ViewProblemsDialog, DeleteConfirmationDialog };
