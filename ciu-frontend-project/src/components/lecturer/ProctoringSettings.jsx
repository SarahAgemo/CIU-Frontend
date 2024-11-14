import React from 'react'
import { Box, Paper, Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';

const ProctoringSettings = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Settings & Configuration
            </Typography>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <FormGroup>
                    <FormControlLabel control={<Switch />} label="Enable Audio Monitoring" />
                    <FormControlLabel control={<Switch />} label="Adjust Alert Sensitivity" />
                </FormGroup>
            </Paper>
        </Box>
    );
}

export default ProctoringSettings
