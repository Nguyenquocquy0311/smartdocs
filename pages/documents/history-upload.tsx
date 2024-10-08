import Layout from "@/components/Layout";
import DocumentsUploadedPage from "@/components/page/documents/DocumentsUploadedPage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'SmartDocs | Tài liệu đã tải lên',
      description: 'Description',
     }}>
      <DocumentsUploadedPage />
    </Layout>
  )
}

export default Page;
