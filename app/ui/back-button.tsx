'use client';

import { getHref } from '@/utils/get-href';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface BackButtonParams {
  defaultHref: string;
}

const BackButton = ({ defaultHref }: BackButtonParams) => {
  const sp = useSearchParams();
  const callingPage = sp?.get('callingPage') || '';
  const href = getHref(callingPage, defaultHref);

  return (
    <Link className="fixed top-4 right-4 link-secondary" href={href}>
      <ArrowUturnLeftIcon className="w-6" />
    </Link>
  );
};

export default BackButton;
