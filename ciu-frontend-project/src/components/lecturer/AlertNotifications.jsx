import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const AlertsNotifications = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Alerts & Notifications
            </Typography>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <List>
                    {/* Placeholder for alerts */}
                    <ListItem>
                        <ListItemText primary="Alert 1: Tab switching detected" />
                    </ListItem>
                </List>
            </Paper>
        </Box>
    );
};

export default AlertsNotifications;
