import React from 'react';
import Layout from '../../components/lecturer/LayoutRegCourse'; // Import the Layout component
import RegCourseContent from './RegCourseContent'; // Import the registration course content

const RegCourse = () => {
    return (
        <Layout>  {/* Use Layout component for consistency */}
            <RegCourseContent />  {/* Render the Registration Course Content within the layout */}
        </Layout>
    );
};

export default RegCourse;
