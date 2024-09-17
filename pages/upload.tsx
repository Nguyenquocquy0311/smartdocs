import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Layout from "@/components/Layout";
import DocumentUploadPage from "@/components/page/documents/DocumentUploadPage";
import Auth from '@/context/AuthContext';
import { routes } from '@/constant/routes';

const Page = () => {
  const { userInfo } = Auth.useContainer();
  const router = useRouter();

  // useEffect(() => {
  //   if (!userInfo) {
  //     router.push({
  //       pathname: routes.login,
  //       query: { returnUrl: router.asPath }
  //     });
  //   }
  // }, [userInfo, router]);

  return (
    <Layout
      meta={{
        title: 'SmartDocs | Upload document',
        description: 'Description',
      }}
    >
      <DocumentUploadPage />
    </Layout>
  );
};

export default Page;
