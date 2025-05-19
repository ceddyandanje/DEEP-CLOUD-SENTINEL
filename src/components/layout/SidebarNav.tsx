'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import { NAV_ITEMS, type NavItem } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarNavProps {
  isCollapsed: boolean;
}

const SidebarNav: FC<SidebarNavProps> = ({ isCollapsed }) => {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {NAV_ITEMS.map((item) => (
        <SidebarMenuItem key={item.href}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    asChild
                    variant="default"
                    size="default"
                    isActive={pathname === item.href}
                    aria-label={item.title}
                    disabled={item.disabled}
                  >
                    <a><item.icon /></a>
                  </SidebarMenuButton>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                {item.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link href={item.href} passHref legacyBehavior>
               <SidebarMenuButton
                asChild
                variant="default"
                size="default"
                isActive={pathname === item.href}
                disabled={item.disabled}
              >
                <a>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </Link>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SidebarNav;
