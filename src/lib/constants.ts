import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, CloudCog, CalendarCheck, Newspaper } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Optimization',
    href: '/optimization',
    icon: CloudCog,
  },
  {
    title: 'Book Session',
    href: '/booking',
    icon: CalendarCheck,
  },
  {
    title: 'News Insights',
    href: '/news',
    icon: Newspaper,
  },
];
