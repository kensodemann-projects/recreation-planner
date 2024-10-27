'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface MenuItemProperties {
  href?: string | undefined;
  children: string;
  icon?: React.ElementType | undefined;
  full?: boolean | undefined;
  onClick: () => void;
}

const MenuItem = ({ href, children, icon, full, onClick }: MenuItemProperties) => {
  const pathName = usePathname();
  const matches = href && (full ? pathName === href : pathName.startsWith(href));
  const LinkIcon = icon;

  const content = (
    <div
      className={`flex flex-row gap-2 p-4 rounded items-center hover:bg-primary hover:text-primary-content ${matches ? 'bg-primary text-primary-content' : ''}`}
    >
      {LinkIcon && <LinkIcon className="w-6" />}
      {children}
    </div>
  );

  return href ? (
    <Link href={href} onClick={onClick}>
      {content}
    </Link>
  ) : (
    <div className="cursor-pointer" onClick={onClick}>
      {content}
    </div>
  );
};

export default MenuItem;
