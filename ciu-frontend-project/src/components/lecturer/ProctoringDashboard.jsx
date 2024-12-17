import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Button, Grid, CircularProgress, Alert } from '@mui/material';
import LiveProctoring from '../../pages/lecturer/LiveProctoring';
import Header from '../../components/lecturer/HeaderPop';
import Sidebar from '../../components/lecturer/SideBarPop';
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from '../../components/lecturer/LecturerDashboard.module.css';

const ProctoringDashboard = () => {
    const [showLiveProctoring, setShowLiveProctoring] = useState(false);
    const [selectedExamId, setSelectedExamId] = useState(null);
    const [activeExams, setActiveExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

      useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 991);
            };
    
            window.addEventListener("resize", handleResize);
            handleResize();
    
            return () => window.removeEventListener("resize", handleResize);
        }, []);
    
       

    useEffect(() => {
        const fetchActiveExams = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://c-i-u-backend.onrender.com/exams/active');
                console.log('Active exams:', response.data); 
                setActiveExams(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching active exams:', error);
                setError('There are no active exams');
                setLoading(false);
            }
        };
        fetchActiveExams();
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      };

    const handleStartMonitoring = (examId) => {
        console.log('Starting monitoring for exam:', examId); // Debug log
        setSelectedExamId(examId);
        setShowLiveProctoring(true);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
         <div className={Dash["overall"]}>
              <div className={Dash["dashboard"]}>
                <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
                <div className={Dash["dashboard-content"]}>
                  {!isMobile && <Sidebar />}
                  {isMobile && (
                    <MobileMenu
                      isOpen={isMobileMenuOpen}
                      toggleMenu={toggleMobileMenu}
                    />
                  )}
        <Box sx={{ padding: 3 }}>
            {!showLiveProctoring ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        Live Exam Monitoring Dashboard
                    </Typography>
                    {activeExams.length === 0 ? (
                        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h6" color="text.secondary">
                                No Active Exams
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                There are currently no exams in progress.
                            </Typography>
                        </Paper>
                    ) : (
                        <Grid container spacing={3}>
                            {activeExams.map((exam) => (
                                <Grid item xs={12} md={6} key={exam._id || exam.id}>
                                    <Paper elevation={3} sx={{ p: 3 }}>
                                        <Typography variant="h6" gutterBottom>
                                            {exam.title || 'Untitled Exam'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Course Unit: {exam.courseUnit || 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Students Taking: {exam.activeStudents || 0}
                                        </Typography>
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            onClick={() => handleStartMonitoring(exam._id || exam.id)}
                                            fullWidth
                                        >
                                            Start Monitoring
                                        </Button>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </>
            ) : (
                <Box>
                    <Button 
                        variant="outlined" 
                        onClick={() => setShowLiveProctoring(false)}
                        sx={{ mb: 2 }}
                    >
                        Back to Dashboard
                    </Button>
                    <LiveProctoring examId={selectedExamId} />
                </Box>
            )}
        </Box>
        </div>
      </div>
    </div>
    );
};

export default ProctoringDashboard;
