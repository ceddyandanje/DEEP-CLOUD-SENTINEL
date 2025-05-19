import { CloudLightning } from 'lucide-react';
import type { FC } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 text-xl font-bold ${className}`}>
      <CloudLightning className="h-7 w-7 text-accent" />
      <span className="text-foreground">CloudWise</span>
    </div>
  );
};

export default Logo;
