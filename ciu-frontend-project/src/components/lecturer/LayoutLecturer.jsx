import React from 'react';
import Header from '../../components/lecturer/Header';
import LecturerSidebar from '../../components/lecturer/LecturerSideBar';
import layoutStyles from '../../components/lecturer/Layout.module.css';

export default function Layout({ children }) {
    return (
        <div className={layoutStyles["layout-container"]}>
            <Header />
            <div className={layoutStyles["main-content"]}>
                <LecturerSidebar />
                <div className={layoutStyles["content-wrapper"]}>
                    {children}
                </div>
            </div>
        </div>
    );
}
