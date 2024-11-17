import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import PageHeader from './page-header';
import SectionHeading from './section-heading';

const MustBeLoggedIn = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-16">
      <PageHeader>You must be logged in</PageHeader>
      <section>
        <SectionHeading>Start planning your next adventure</SectionHeading>
        <Link href="/login" className="btn btn-primary">
          Login
          <ArrowRightIcon className="w-6" />
        </Link>
      </section>
    </div>
  );
};

export default MustBeLoggedIn;
