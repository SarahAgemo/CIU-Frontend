import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Grid2 as Grid } from '@mui/material';

const VideoSurveillance = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Video Surveillance
            </Typography>
            <Grid container spacing={2}>
                {[...Array(9)].map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper elevation={3} sx={{ padding: 2, height: 200 }}>
                            <Typography variant="subtitle1">Student {index + 1}</Typography>
                            {/* Placeholder for video feed */}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default VideoSurveillance;
