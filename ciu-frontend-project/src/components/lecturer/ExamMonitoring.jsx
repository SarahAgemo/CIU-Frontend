import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const ExamMonitoring = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Exam Monitoring
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Progress</TableCell>
                            <TableCell>Current Question</TableCell>
                            <TableCell>Flags</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Placeholder for student progress data */}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ExamMonitoring;
