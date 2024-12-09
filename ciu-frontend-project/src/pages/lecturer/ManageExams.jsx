import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import Header from '../../components/lecturer/HeaderPop';
import Sidebar from '../../components/lecturer/SideBarPop';
import MobileMenu from "../../components/lecturer/MobileMenu"
import ManagementCard from '../../components/lecturer/ManagementCard.jsx';
import ManualCreateExamContent from './ManualCreateExamContent';
import UploadExampaperModal from './UploadExampaper';
import ManageExam from './ManageExams.module.css';

export default function ManageExams() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);
  const [isUploadExamModalOpen, setIsUploadExamModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOpenCreateExamModal = () => {
    setIsCreateExamModalOpen(true);
  };

  const handleCloseCreateExamModal = () => {
    setIsCreateExamModalOpen(false);
  };

  const handleOpenUploadExamModal = () => {
    setIsUploadExamModalOpen(true);
  };

  const handleCloseUploadExamModal = () => {
    setIsUploadExamModalOpen(false);
  };

  return (
    <div className={ManageExam["overall"]}>	
      <div className={ManageExam["dashboard"]}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={ManageExam["dashboard-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <>
              <div 
                className={`${ManageExam["overlay"]} ${isMobileMenuOpen ? ManageExam["active"] : ""}`} 
                onClick={toggleMobileMenu}
              ></div>
              <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
            </>
          )}
          <div className={`${ManageExam.mainContentWrapper} ${isMobileMenuOpen ? ManageExam.dimmed : ''}`}>
            <ManagementCard 
              onOpenCreateExamModal={handleOpenCreateExamModal}
              onOpenUploadExamModal={handleOpenUploadExamModal}
            />
          </div>
        </div>
      </div>
      <Dialog
        open={isCreateExamModalOpen}
        onClose={handleCloseCreateExamModal}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <ManualCreateExamContent onClose={handleCloseCreateExamModal} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isUploadExamModalOpen}
        onClose={handleCloseUploadExamModal}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <UploadExampaperModal onClose={handleCloseUploadExamModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}