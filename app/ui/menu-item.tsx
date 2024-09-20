'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const MenuItem = ({
  href,
  children,
  icon,
  onClick,
}: {
  href?: string | undefined;
  children: string;
  icon?: React.ElementType | undefined;
  onClick: () => void;
}) => {
  const pathName = usePathname();
  const matches = pathName === href;
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
