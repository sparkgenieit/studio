
"use client";

import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/app/components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div 
                className="relative min-h-screen" 
                style={{
                    // @ts-ignore
                    "--sidebar-width": "250px",
                    "--sidebar-width-icon": "72px",
                }}
            >
                <AppSidebar />
                <main className="ml-[var(--sidebar-width-icon)] transition-[margin-left] duration-300 ease-in-out group-data-[state=expanded]/sidebar:ml-[var(--sidebar-width)]">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
