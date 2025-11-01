
"use client";

import React from 'react';
import AppSidebar from "@/app/components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div 
            className="relative min-h-screen group/layout" 
            style={{
                // @ts-ignore
                "--sidebar-width": "250px",
                "--sidebar-width-icon": "72px",
            }}
        >
            <AppSidebar />
            <main className="ml-[var(--sidebar-width-icon)] transition-[margin-left] duration-300 ease-in-out group-data-[sidebar-state=expanded]/layout:ml-[var(--sidebar-width)]">
                {children}
            </main>
        </div>
    );
}
