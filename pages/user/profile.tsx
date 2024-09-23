import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Layout from "@/components/Layout";
import Auth from '@/context/AuthContext';
import { routes } from '@/constant/routes';
import ProfilePage from '@/components/page/ProfilePage';

const Page = () => {
  const { userInfo } = Auth.useContainer();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push({
        pathname: routes.login,
        query: { returnUrl: router.asPath }
      });
    }
  }, [userInfo, router]);

  return (
    <Layout
      meta={{
        title: 'SmartDocs | Update profile',
        description: 'Description',
      }}
    >
      <ProfilePage />
    </Layout>
  );
};

export default Page;
