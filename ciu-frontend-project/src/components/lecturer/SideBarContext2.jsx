import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export function SidebarProvider2 ({ children }) {
    const [activeItem, setActiveItem] = useState('LecturerDashboard');

    return (
        <SidebarContext.Provider value={{ activeItem, setActiveItem }}>
            {children}
        </SidebarContext.Provider>
    );
}

export const useSidebar = () => useContext(SidebarContext);