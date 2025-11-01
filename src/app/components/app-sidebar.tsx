
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutGrid,
    PlusSquare,
    FileClock,
    CheckSquare,
    Users,
    Building,
    Timer,
    Store,
    MapPin,
    Activity as ActivityIcon,
    Map,
    UserCheck,
    UserCog,
    User,
    BookUp,
    Settings,
    ChevronDown,
    Circle,
    CircleDot
} from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutGrid },
    { href: '/create-itinerary', label: 'Create Itinerary', icon: PlusSquare },
    { href: '/latest-itinerary', label: 'Latest Itinerary', icon: FileClock },
    { href: '/confirmed-itinerary', label: 'Confirmed Itinerary', icon: CheckSquare },
    { 
      label: 'Accounts', 
      icon: Users,
      isCollapsible: true,
      subItems: [
        { href: '/accounts/sub1', label: 'Sub Item 1' },
        { href: '/accounts/sub2', label: 'Sub Item 2' },
      ]
    },
    { href: '/hotels', label: 'Hotels', icon: Building },
    { href: '/daily-moment-tracker', label: 'Daily Moment Tracker', icon: Timer },
    { href: '/vendor-management', label: 'Vendor Management', icon: Store },
    { href: '/hotspot', label: 'Hotspot', icon: MapPin },
    { href: '/activity', label: 'Activity', icon: ActivityIcon },
    { href: '/locations', label: 'Locations', icon: Map },
    { href: '/guide', label: 'Guide', icon: UserCheck },
    { href: '/staff', label: 'Staff', icon: UserCog },
    { href: '/agent', label: 'Agent', icon: User },
    { href: '/pricebook-export', label: 'Pricebook Export', icon: BookUp },
];

const settingsMenuItem = { href: '/settings', label: 'Settings', icon: Settings };

const NavMenuItem = ({ item, isPinned }: { item: (typeof menuItems)[0] | typeof settingsMenuItem; isPinned: boolean }) => {
    const pathname = usePathname();
    const isActive = item.href ? pathname === item.href : false;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive} tooltip={!isPinned ? item.label : undefined}>
                <Link href={item.href || '#'}>
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

export default function AppSidebar() {
    const [isPinned, setIsPinned] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const logo = PlaceHolderImages.find(p => p.id === 'logo');

    const isOpen = isPinned || isHovered;

    React.useEffect(() => {
        const layout = document.querySelector('.group\\/layout');
        if (layout) {
            layout.setAttribute('data-sidebar-state', isOpen ? 'expanded' : 'collapsed');
        }
    }, [isOpen]);

    return (
        <div
            className={cn("group/sidebar fixed top-0 left-0 h-screen z-20 transition-[width] duration-300 ease-in-out",
                isOpen ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-width-icon)]"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-state={isOpen ? 'expanded' : 'collapsed'}
        >
            <Sidebar>
                <SidebarHeader className="relative">
                    <div className={cn(
                        "flex items-center gap-3 p-2 transition-all duration-300",
                        !isOpen && "gap-0"
                    )}>
                        {logo && <Image src={logo.imageUrl} alt={logo.description} width={40} height={36} data-ai-hint={logo.imageHint} />}
                        <span className={cn(
                            "font-bold text-lg font-headline truncate transition-opacity duration-200",
                            !isOpen ? "w-0 opacity-0" : "w-auto opacity-100"
                        )}>
                            DoView Holidays
                        </span>
                    </div>
                     <Button
                        onClick={() => setIsPinned(!isPinned)}
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "rounded-full bg-card border-2 shadow-md absolute z-20 transition-all duration-300 ease-in-out hover:bg-card",
                            "h-8 w-8 top-4",
                             !isOpen && 'opacity-0 -right-4',
                             isOpen && 'opacity-100 right-2'
                        )}
                    >
                        {isPinned ? <CircleDot className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                        <span className="sr-only">Toggle Pinned Sidebar</span>
                    </Button>
                </SidebarHeader>

                <SidebarContent className="p-2">
                    <SidebarMenu>
                        {menuItems.map((item, index) => (
                            <React.Fragment key={index}>
                               {item.label === "Accounts" ? (
                                 <SidebarMenuItem>
                                   <SidebarMenuButton tooltip={!isOpen ? item.label : undefined}>
                                       <item.icon className="w-5 h-5 shrink-0" />
                                       <span className="truncate flex-1">{item.label}</span>
                                       <ChevronDown className="w-4 h-4" />
                                   </SidebarMenuButton>
                                 </SidebarMenuItem>
                               ) : (
                                 <NavMenuItem item={item} isPinned={isOpen} />
                               )}
                            </React.Fragment>
                        ))}
                    </SidebarMenu>
                </SidebarContent>

                <div className="mt-auto p-2">
                    
                    <Separator className="my-2" />
                    <SidebarMenu>
                        <NavMenuItem item={settingsMenuItem} isPinned={isOpen} />
                    </SidebarMenu>
                </div>
            </Sidebar>
        </div>
    );
}
