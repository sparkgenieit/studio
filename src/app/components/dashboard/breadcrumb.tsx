
"use client"
import { ChevronRight } from 'lucide-react';

export function Breadcrumb() {
    return (
        <nav className="flex items-center text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Home</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-medium text-foreground">Dashboard</span>
        </nav>
    );
}
