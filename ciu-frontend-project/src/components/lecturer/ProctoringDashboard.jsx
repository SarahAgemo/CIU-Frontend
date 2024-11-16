import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Grid2 as Grid } from '@mui/material';

const ProctoringDashboard = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Active Exams Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Overview Panel</Typography>
                        {/* Placeholder for overview data */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Notifications</Typography>
                        {/* Placeholder for notifications */}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Exam List</Typography>
                        {/* Placeholder for a list of ongoing exams */}
                    </Paper>
                </Grid>
            </Grid>
            <Box sx={{ marginTop: 3 }}>
                <Button variant="contained" component={Link} to="/exam-monitoring">Go to Exam Monitoring</Button>
            </Box>
        </Box>
    )
}

export default ProctoringDashboard
