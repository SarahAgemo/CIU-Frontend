
import React from 'react';
import Layout from '../../components/lecturer/Layout1'; 
import CreateExamContent from './CreateExamContent'; 
import BackButton from '../../components/lecturer/BackButton';



export default function CreateExam() {
    return (
        <Layout>
            <BackButton targetPath="/lecturerdashboard" size={30} color="#106053" />
            <CreateExamContent />
        </Layout>
    );
}
