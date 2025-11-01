
"use client";

import React from 'react';
import { Sidebar, SidebarInset, SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import AppSidebar from "@/app/components/app-sidebar";
import { Circle, CircleDot, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SidebarToggleButton = () => {
    const { toggleSidebar, open, isMobile, state } = useSidebar();
    const sidebarWidth = "250px";
    const collapsedSidebarWidth = "72px"; // approx 80px - icon size

    if (isMobile) {
        return null;
    }

    return (
        <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            className={cn(
                "rounded-full bg-card border-2 shadow-md absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-300 ease-in-out hover:bg-card",
                "h-8 w-8",
                {
                    'left-[234px]': open, // 250px - 16px
                    'left-[60px]': !open, // 72px - 12px
                }
            )}
        >
            {open ? <CircleDot className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);
    
    return (
        <SidebarProvider open={true}>
            <div 
                className="relative" 
                style={{
                    // @ts-ignore
                    "--sidebar-width": "250px",
                    "--sidebar-width-icon": "72px",
                }}
            >
                <AppSidebar />
                {isMounted && <SidebarToggleButton />}
                <SidebarInset className="max-w-7xl mx-auto">
                    {children}
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
