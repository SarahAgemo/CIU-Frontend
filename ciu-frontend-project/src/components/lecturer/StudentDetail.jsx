import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const StudentDetail = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Detailed Student View
            </Typography>
            <Paper elevation={3} sx={{ padding: 2 }}>
                {/* Placeholder for webcam feed */}
                <Typography variant="h6">Webcam Feed</Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
                {/* Placeholder for screen activity */}
                <Typography variant="h6">Screen Activity</Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
                {/* Placeholder for activity log */}
                <Typography variant="h6">Activity Log</Typography>
            </Paper>
        </Box>
    );
};

export default StudentDetail;
