import React from 'react';
import Header from './Header';
import SideBar from './SideBarAddQuestion';
import layoutStyles from './Layout.module.css';

export default function Layout({ children }) {
    return (
        <div className={layoutStyles["layout-container"]}>
            <Header />
            <div className={layoutStyles["main-content"]}>
                <SideBar />
                <div className={layoutStyles["content-wrapper"]}>
                    {children}
                </div>
            </div>
        </div>
    );
}
