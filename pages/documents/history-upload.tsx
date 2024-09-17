import Layout from "@/components/Layout";
import DocumentsUploadedPage from "@/components/page/documents/DocumentsUploadedPage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'SmartDocs | Danh sách tài liệu',
      description: 'Description',
     }}>
      <DocumentsUploadedPage />
    </Layout>
  )
}

export default Page;
