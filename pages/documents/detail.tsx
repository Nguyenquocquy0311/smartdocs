import Layout from "@/components/Layout";
import DocumentDetailPage from "@/components/page/documents/DocumentDetailPage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'SmartDocs | Chi tiết tài liệu',
      description: 'Description',
     }}>
      <DocumentDetailPage/>
    </Layout>
  )
}

export default Page;
