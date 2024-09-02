'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const MenuItem = ({
  href,
  children,
  icon,
  onClick,
}: {
  href: string;
  children: string;
  icon: React.ElementType;
  onClick: () => void;
}) => {
  const pathName = usePathname();
  const matches = pathName === href;
  const LinkIcon = icon;
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={`flex flex-row gap-2 p-4 rounded items-center hover:bg-primary hover:text-primary-content ${matches ? 'bg-primary text-primary-content' : ''}`}
      >
        {LinkIcon && <LinkIcon className="w-6" />}
        {children}
      </div>
    </Link>
  );
};

export default MenuItem;
