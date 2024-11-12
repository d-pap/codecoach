// DeleteButton.js
import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = ({ handleDelete, isLoading, tooltipsEnabled }) => (
    <Tooltip
        title={'Delete the chat history'}
        enterDelay={500}
        disableHoverListener={!tooltipsEnabled}
    >
        <div>
            <IconButton
                disabled={isLoading}
                sx={{ color: 'error.main' }}
                onClick={handleDelete}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    </Tooltip>
);

export default DeleteButton;
