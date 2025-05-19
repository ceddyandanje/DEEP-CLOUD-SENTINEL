'use client';

import type { FC, ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import Logo from './Logo';
import SidebarNav from './SidebarNav';
import Header from './Header';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";


interface AppLayoutProps {
  children: ReactNode;
}

const ToggleSidebarButton: FC = () => {
  const { open, toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
      {open ? <PanelLeftClose /> : <PanelLeftOpen />}
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
};


const AppLayoutClient: FC<AppLayoutProps> = ({ children }) => {
  const { open, isMobile } = useSidebar();
  const isCollapsed = !open && !isMobile;

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar variant="sidebar" collapsible="icon" side="left">
        <SidebarHeader className="p-4 flex items-center justify-between">
          {!isCollapsed && <Logo />}
          <ToggleSidebarButton />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav isCollapsed={isCollapsed} />
        </SidebarContent>
        <SidebarFooter className="p-4">
          {/* Optional: Footer content for sidebar */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </div>
  );
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppLayoutClient>{children}</AppLayoutClient>
    </SidebarProvider>
  );
};


export default AppLayout;
