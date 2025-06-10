import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import PageHeader from './page-header';
import SectionHeader from './section-header';
import TitleHeading from './title-heading';
import SubtitleHeading from './subtitle-heading';

const MustBeLoggedIn = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-16">
      <PageHeader>
        <TitleHeading>You must be logged in</TitleHeading>
      </PageHeader>
      <section>
        <SectionHeader>
          <SubtitleHeading>Start planning your next adventure</SubtitleHeading>
        </SectionHeader>
        <Link href="/login" className="btn btn-primary">
          Login
          <ArrowRightIcon className="w-6" />
        </Link>
      </section>
    </div>
  );
};

export default MustBeLoggedIn;
