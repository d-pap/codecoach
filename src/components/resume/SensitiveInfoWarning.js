// src/components/SensitiveInfoWarning.js
import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
    Typography,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useTheme } from '@mui/material/styles';

const SensitiveInfoWarning = ({ open, onClose, onConfirm }) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="sensitive-info-warning-title"
            aria-describedby="sensitive-info-warning-description"
            maxWidth="sm"
            fullWidth
        >
            <Box
                display="flex"
                alignItems="center"
                bgcolor={theme.palette.primary.light100}
                p={theme.spacing(2)}
            >
                <WarningAmberIcon
                    color="warning"
                    sx={{ fontSize: 40, mr: theme.spacing(2) }}
                />
                <Typography variant="h6" component="div" color="primary.main">
                    Personal Information Alert
                </Typography>
            </Box>
            <DialogContent dividers>
                <DialogContentText
                    id="sensitive-info-warning-description"
                    variant="body1"
                    sx={{ mb: theme.spacing(2) }}
                >
                    Please ensure that you have not included any sensitive personal information such as
                    names, addresses, emails, phone numbers, etc., before generating your resume.
                </DialogContentText>
                <Typography variant="body2" color="text.secondary">
                    Including personal information can compromise your privacy. If you're certain that your inputs
                    are free from such data, you can proceed to generate your resume.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ px: theme.spacing(3), py: theme.spacing(2) }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color="primary"
                    sx={{
                        mr: theme.spacing(2),
                        borderColor: theme.palette.primary.light400,
                        color: theme.palette.primary.main,
                        '&:hover': {
                            borderColor: theme.palette.primary.light500,
                        },
                    }}
                >
                    Back to Editing
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.text.white,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.darker,
                        },
                    }}
                >
                    My Inputs Do Not Have Personal Information
                </Button>
            </DialogActions>
        </Dialog>
    );
};

SensitiveInfoWarning.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default SensitiveInfoWarning;
