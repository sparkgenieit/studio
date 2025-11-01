
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
    SidebarGroup
} from "@/components/ui/sidebar";
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
    ChevronDown
} from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

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

const NavMenuItem = ({ item }: { item: (typeof menuItems)[0] | typeof settingsMenuItem }) => {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive}>
                <Link href={item.href || '#'}>
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

export default function AppSidebar() {
    const { open, isMobile } = useSidebar();
    const logo = PlaceHolderImages.find(p => p.id === 'logo');

    return (
        <Sidebar>
            <SidebarHeader>
                <div className={cn(
                    "flex items-center gap-3 p-2 transition-all duration-300",
                    !open && !isMobile && "gap-0"
                )}>
                    {logo && <Image src={logo.imageUrl} alt={logo.description} width={40} height={36} data-ai-hint={logo.imageHint} />}
                    <span className={cn(
                        "font-bold text-lg font-headline truncate transition-opacity duration-200",
                        !open && !isMobile ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}>
                        DoView Holidays
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-2">
                <SidebarMenu>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                           {item.label === "Accounts" ? (
                             <SidebarMenuItem>
                               <SidebarMenuButton>
                                   <item.icon className="w-5 h-5 shrink-0" />
                                   <span className="truncate flex-1">{item.label}</span>
                                   <ChevronDown className="w-4 h-4" />
                               </SidebarMenuButton>
                             </SidebarMenuItem>
                           ) : (
                             <NavMenuItem item={item} />
                           )}
                        </React.Fragment>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <div className="mt-auto p-2">
                <Separator className="my-2" />
                <SidebarMenu>
                    <NavMenuItem item={settingsMenuItem} />
                </SidebarMenu>
            </div>
        </Sidebar>
    );
}
