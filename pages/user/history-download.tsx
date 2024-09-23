import Layout from "@/components/Layout";
import DocumentsDownloadedPage from "@/components/page/documents/DocumentsDownloadedPage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'SmartDocs | Tài liệu đã tải xuống',
      description: 'Description',
     }}>
      <DocumentsDownloadedPage />
    </Layout>
  )
}

export default Page;
