import type { FC } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logo from './Logo';

const Header: FC = () => {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="hidden md:block">
        <Logo className="text-lg" />
      </div>
      <div className="flex w-full items-center justify-end gap-4">
        {/* Placeholder for additional header items like search or notifications */}
        <Avatar>
          <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
          <AvatarFallback>CW</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
