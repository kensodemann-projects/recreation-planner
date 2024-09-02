import Link from 'next/link';
import PageHeader from '../ui/page-header';

const LoginPage = () => {
  return (
    <main className="flex flex-col h-screen items-center p-6 gap-32">
      <PageHeader>Login</PageHeader>
      <Link href="/adventure">Do it to it!</Link>
    </main>
  );
};

export default LoginPage;
