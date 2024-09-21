import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import PageHeader from './page-header';

const MustBeLoggedIn = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-16">
      <PageHeader>You must be logged in</PageHeader>
      <h2 className="text-xl">start planning your next adventure</h2>
      <Link href="/login" className="btn btn-primary">
        Login
        <ArrowRightIcon className="w-6" />
      </Link>
    </div>
  );
};

export default MustBeLoggedIn;
