import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface EntityDropdownMenuProps {
  href: string;
  callingPage?: string;
}

const EntityDropdownMenu = ({ callingPage, href }: EntityDropdownMenuProps) => {
  const buildHref = (base: string): string => base + (callingPage ? `?callingPage=${callingPage}` : '');

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost ">
        <EllipsisVerticalIcon className="w-6" />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-24 p-2 shadow-sm">
        <li>
          <Link href={buildHref(href)}>View</Link>
        </li>
        <li>
          <Link href={buildHref(`${href}/update`)}>Edit</Link>
        </li>
        <li>
          <Link className="text-error" href={buildHref(`${href}/delete`)}>
            Delete
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default EntityDropdownMenu;
