import React, { useState, useMemo } from 'react';
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
import ProblemCardLayout from '../problems/ProblemCardLayout';
import InterviewCardLayout from '../problems/InterviewCardLayout';

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
    padding: '300px', // Add padding around the content
    display: 'flex',
    // flexDirection: 'row',
    flexDirection: 'column',
    gap: '16px', // Spacing between cards
    height: 'calc(80vh - 64px - 52px)', // Subtract DialogTitle and DialogActions heights
    overflowY: 'auto', // Allow scrolling for large content
}));

// View Problems Dialog
const ViewProblemsDialog = ({ open, onClose, problems, isLoading }) => {

    // Filter interview type problems
    const interviewProblems = useMemo(() => {
        return problems.filter(
            (problem) => problem.type && problem.type.toLowerCase() === 'interview'
        );
    }, [problems]);

    // Filter icpc type problems
    const icpcProblems = useMemo(() => {
        return problems.filter(
            (problem) => problem.type && problem.type.toLowerCase() === 'icpc'
        );
    }, [problems]);

    return (
        <StyledDialog open={open} onClose={onClose}>
            <StyledDialogContent>
                {isLoading ? (
                    <CenteredCircleLoader />
                ) : (
                    <>
                        {/* Render ICPC Problems */}
                        {icpcProblems.map((problem) => (
                            <ProblemCardLayout key={problem._id} problem={problem} style={{ marginBottom: '16px', padding: '16px' }} />
                        ))}

                        {/* Render Interview Problems */}
                        {interviewProblems.map((problem) => (
                            <InterviewCardLayout key={problem._id} interview={problem} style={{ marginBottom: '16px', padding: '16px' }} />
                        ))}
                    </>
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
