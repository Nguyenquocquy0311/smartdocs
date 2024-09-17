import Layout from "@/components/Layout";
import DocumentsPage from "@/components/page/documents/DocumentsUploadedPage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'SmartDocs | Danh sách tài liệu',
      description: 'Description',
     }}>
      <DocumentsPage />
    </Layout>
  )
}

export default Page;
