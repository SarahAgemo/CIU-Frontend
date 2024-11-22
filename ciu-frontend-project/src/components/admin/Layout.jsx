import React from 'react';
import Sidebar1 from './SideBar1';
import Header from './Header1';
import './Layout.css'; // Assuming you have some CSS for layout
import { Outlet } from 'react-router-dom'; // This will render the current route component
import EditUser from './EditLecturer';

export default function Layout() {
    return (
        <div className="layout-container">
            <Header /> {/* Header on top */}
           
            <div className="main-content">
                <Sidebar1 /> {/* Sidebar on the left */} 
                <div className="content-area">
                    <Outlet /> {/* This renders the component for the current route */}

                </div>
            </div>
        </div>
    );
}
