import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from './ui/page-header';
import TitleHeading from './ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';

const LandingPage = async () => {
  const needsLogin = await isNotLoggedIn();

  return (
    <main className="flex min-h-screen flex-col items-center justify-top p-6 gap-8">
      <PageHeader>
        <TitleHeading>Recreation Planner</TitleHeading>
      </PageHeader>
      <div className="flex flex-row justify-center">
        <Image
          src="/indy-car.jpg"
          className="hidden lg:block rounded-3xl -rotate-45 translate-x-1/4 translate-y-1/3"
          width={384}
          height={384}
          alt="A generic IndyCar on the track"
        />
        <Image
          src="/rv-sunset.jpg"
          className="rounded-3xl"
          width={384}
          height={384}
          alt="A generic IndyCar on the track"
        />
        <Image
          src="/fall-by-river.jpg"
          className="hidden lg:block rounded-3xl rotate-45 -translate-x-1/4 translate-y-1/3"
          width={384}
          height={384}
          alt="A generic IndyCar on the track"
        />
      </div>
      <Link href={needsLogin ? '/login' : '/adventure'} className="btn btn-primary mt-16 lg:mt-32">
        {needsLogin ? 'Login' : 'Start Your Adventures'}
        <ArrowRightIcon className="w-6" />
      </Link>
      <p>{needsLogin ? 'Log in to start planning your next adventure' : 'Your adventures await'}</p>
    </main>
  );
};

export default LandingPage;
