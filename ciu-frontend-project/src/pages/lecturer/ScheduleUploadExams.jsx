import React from 'react';
import Layout from '../../components/lecturer/Layout2';
import UploadExamContent from './UploadExamContent';
import BackButton from '../../components/lecturer/BackButton';



export default function CreateExam() {
  return (
    <Layout>
      <BackButton targetPath="/lecturerdashboard" size={30} color="#106053" />
      <UploadExamContent />
    </Layout>
  );
}

